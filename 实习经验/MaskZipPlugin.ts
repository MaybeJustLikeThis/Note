/* eslint-disable @typescript-eslint/ban-types */
'use strict';
import * as path from 'path';
import { minimatch } from 'minimatch';
import { RawSource } from 'webpack-sources';
import { ZipFile } from 'yazl';
import * as _ from 'lodash';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { Compiler, Compilation } from 'webpack';
import webpack from 'webpack';
import MD5 from 'md5';
const { Compilation: Compilation1 } = webpack;
export class ZipPlugin {
  private readonly options;
  constructor(options: any) {
    this.options = options || {};
  }
  apply(compiler: Compiler) {
    const options = this.options;

    compiler.hooks.compilation.tap(
      ZipPlugin.name,
      (compilation: Compilation) => {
        compilation.hooks.processAssets.tapAsync(
          {
            name: ZipPlugin.name,
            stage: Compilation1.PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER, // see below for more stages
          },
          (assets, callback) => {
            this.zipFiles(
              assets,
              fs.readFileSync(options.imagePath),
              compilation,
              callback,
            );
          },
        );
      },
    );
  }

  zipFiles(assets: any, imgBuf: Buffer, compilation: any, callback: Function) {
    const zipFile = new ZipFile();
    const options = this.options;

    const pathPrefix = options.pathPrefix || '';
    const pathMapper =
      options.pathMapper ||
      function (x: any) {
        return x;
      };

    // populate the zip file with each asset
    for (const nameAndPath in compilation.assets) {
      // eslint-disable-next-line no-prototype-builtins
      if (!compilation.assets.hasOwnProperty(nameAndPath)) continue;

      if (!options.exclude.some((val: string) => minimatch(nameAndPath, val))) {
        const source = compilation.assets[nameAndPath].source();
        if (/.js$/.test(nameAndPath)) {
          zipFile.addBuffer(
            Buffer.from(
              `{"${nameAndPath}":"${MD5(
                Buffer.isBuffer(source) ? source : Buffer.from(source),
              )}"}`,
            ),
            path.join(pathPrefix, pathMapper('manifest.json')),
            options.fileOptions,
          );
        }
        if (this.options.cdnUplad && this.options.release) {
          if (
            nameAndPath.startsWith('resource/') ||
            nameAndPath.startsWith('images/')
          ) {
            console.log('');
          } else {
            zipFile.addBuffer(
              Buffer.isBuffer(source) ? source : Buffer.from(source),
              path.join(pathPrefix, pathMapper(nameAndPath)),
              options.fileOptions,
            );
          }
        } else {
          zipFile.addBuffer(
            Buffer.isBuffer(source) ? source : Buffer.from(source),
            path.join(pathPrefix, pathMapper(nameAndPath)),
            options.fileOptions,
          );
        }
      }
    }

    // nsr 文件添加到zip文件中
    const nsrDir = path.join(process.cwd(), 'nsr');
    if (fs.existsSync(nsrDir)) {
      const platform = this.options.bundleInfo.platform;
      const templateJs = path.resolve(nsrDir, 'template.js');
      const templateJsonDir = path.resolve(nsrDir, platform);

      if (fs.existsSync(templateJs)) {
        const source = fs.readFileSync(templateJs);
        zipFile.addBuffer(
          Buffer.isBuffer(source) ? source : Buffer.from(source),
          path.join(pathPrefix, pathMapper('template.js')),
          options.fileOptions,
        );
      }

      if (
        fs.existsSync(templateJsonDir) &&
        fs.readdirSync(templateJsonDir).length
      ) {
        const templateJsonFiles = fs.readdirSync(templateJsonDir);
        templateJsonFiles.forEach((file: string) => {
          const source = fs.readFileSync(path.resolve(templateJsonDir, file));
          zipFile.addBuffer(
            source,
            path.join(pathPrefix, pathMapper(file)),
            options.fileOptions,
          );
        });
      }
    }

    zipFile.end(options.zipOptions);

    // accumulate each buffer containing a part of the zip file
    const bufs: any = [];
    const bundleBuffer: any = [];
    if (_.isObject(imgBuf)) {
      bufs.push(imgBuf);
    }

    zipFile.outputStream.on('data', function (buf) {
      bufs.push(buf);
      bundleBuffer.push(buf);
    });

    zipFile.outputStream.on('end', function () {
      const rawZip = new RawSource(Buffer.concat(bufs) as any);
      const bundleZip = new RawSource(Buffer.concat(bundleBuffer) as any);
      // default to webpack's root output path if no path provided
      const outputPath = options.path || compilation.options.output.path;
      // default to webpack root filename if no filename provided, else the basename of the output path
      let outputFilename =
        options.filename ||
        compilation.options.output.filename ||
        path.basename(outputPath);
      if (outputFilename.includes('[hash]')) {
        const md5 = crypto.createHash('md5');
        rawZip.updateHash(md5);
        bundleZip.updateHash(md5);
        const result = md5.digest('hex');
        outputFilename = outputFilename.replace('[hash]', result);
      }
      const extension = '.' + (options.extension || 'zip');

      // combine the output path and filename
      const outputPathAndFilename = path.resolve(
        compilation.options.output.path, // ...supporting both absolute and relative paths
        outputPath,
        _.isObject(imgBuf)
          ? outputFilename
          : path.basename(outputFilename, '.zip') + extension, // ...and filenames with and without a .zip extension
      );

      // resolve a relative output path with respect to webpack's root output path
      // since only relative paths are permitted for keys in `compilation.assets`
      const relativeOutputPath = path.relative(
        compilation.options.output.path,
        outputPathAndFilename,
      );

      // add our zip file to the assets
      compilation.assets[relativeOutputPath] = rawZip;
      // 添加纯净的 zip 文件
      const {
        bundleInfo: { platform, entry, versionCode },
      } = options;
      compilation.assets[`${platform}_${entry}_${versionCode}.zip`] = bundleZip;
      callback();
    });
  }
}

