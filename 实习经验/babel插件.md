## 注释是怎么用babel实现的 ？ 
```js
const { declare } = require('@babel/helper-plugin-utils');

const autoTrackPlugin = declare((api, options, dirname) => {
    api.assertVersion(7);

    return {
        pre(file) {
        },
        visitor: {
        },
        post(file) {
        }
    }
});
module.exports = autoTrackPlugin;

```
```js
visitor: {
    Program: {
        enter(path, state) {
            path.traverse({
                'StringLiteral|TemplateLiteral'(path) {
                    if(path.node.leadingComments) {
                        path.node.leadingComments = path.node.leadingComments.filter((comment, index) => {
                            if (comment.value.includes('i18n-disable')) {
                                path.node.skipTransform = true;
                                return false;
                            }
                            return true;
                        })
                    }
                    if(path.findParent(p => p.isImportDeclaration())) {
                        path.node.skipTransform = true;
                    }
                }
            });
        }
    }
}

```
详细解释
Visitor 配置：

visitor 是 Babel 插件的核心配置对象，定义了如何遍历和处理 AST 节点。
Program 是一个顶级节点类型，表示整个程序的根节点。
enter 方法：

enter 方法在进入 Program 节点时被调用。
path 是当前节点的路径对象，包含有关当前节点及其父节点的信息。
state 是传递给插件的状态对象，可以用于存储和传递数据。
path.traverse 方法：

path.traverse 方法用于遍历当前节点的所有子节点。
参数是一个新的 visitor 配置对象，定义了如何处理特定类型的节点。
处理 StringLiteral 和 TemplateLiteral 节点：

'StringLiteral|TemplateLiteral' 是一个联合类型，表示匹配 StringLiteral 或 TemplateLiteral 类型的节点。
path 是当前匹配的节点路径对象。
处理前置注释：

if(path.node.leadingComments)：检查当前节点是否有前置注释。
path.node.leadingComments.filter((comment, index) => { ... })：过滤掉包含 i18n-disable 的注释。
if (comment.value.includes('i18n-disable'))：检查注释内容是否包含 i18n-disable。
path.node.skipTransform = true：如果包含 i18n-disable，设置 skipTransform 标志为 true，表示该节点不需要进行国际化转换。
return false：从注释列表中移除该注释。
return true：保留其他注释。
处理导入声明：

if(path.findParent(p => p.isImportDeclaration()))：检查当前节点是否位于 ImportDeclaration 节点内。
path.node.skipTransform = true：如果在 ImportDeclaration 内，设置 skipTransform 标志为 true，表示该节点不需要进行国际化转换。

### 总结

这段代码的主要功能是在遍历 AST 时，处理 StringLiteral 和 TemplateLiteral 节点，检查它们是否有前置注释 i18n-disable，如果有则跳过国际化转换，并且如果这些节点位于 ImportDeclaration 内也跳过国际化转换。这样可以灵活地控制哪些字符串需要进行国际化处理，哪些不需要。

## excel导出怎么做的？

一个生成excel的js和一个解析excel的js，然后用一个命令执行 下载在线编辑文档的内容，然后解析文档内容，转成json。

### 生成excel
```js
const { Workbook } = require('exceljs');
const fs = require('node:fs');

const languages = ['zh-CN', 'en-US'];

async function main(){
    const workbook = new Workbook();

    const worksheet = workbook.addWorksheet('test');

    const bundleData = languages.map(item => {
        return JSON.parse(fs.readFileSync(`./${item}.json`));
    })

    const data = [];

    bundleData.forEach((item, index) => {
        for(let key in item) {
            const foundItem = data.find(item => item.id === key);
            if(foundItem) {
                foundItem[languages[index]] = item[key]
            } else {
                data.push({
                    id: key,
                    [languages[index]]: item[key]
                })
            }
        }
    })

    console.log(data);

    worksheet.columns = [
        { header: 'ID', key: 'id', width: 30 },
        ...languages.map(item => {
            return {
                header: item,
                key: item,
                width: 30
            }
        })
    ];

    worksheet.addRows(data);

    workbook.xlsx.writeFile('./bundle.xlsx');    
}

main();

```

### 从网络拿到在线表格下载分析成json
```js
const { execSync } = require('node:child_process');
const { parse } = require("csv-parse/sync");
const fs = require('node:fs');

const sheetUrl = "https://docs.google.com/spreadsheets/d/15tYKwXyhKVfe2dm2G28ESjEhd_kuo2-9VMO9HPb6Zfo";

execSync(`curl -L ${sheetUrl}/export?format=csv -o ./message2.csv`, {
    stdio: 'ignore'
});

const input = fs.readFileSync("./message2.csv");

const data = parse(input, { columns: true });

const zhCNBundle = {};
const enUSBundle = {};

data.forEach(item => {
    const keys = Object.keys(item);
    const key = item[keys[0]];
    const valueZhCN = item[keys[1]];
    const valueEnUS = item[keys[2]];

    zhCNBundle[key] = valueZhCN;
    enUSBundle[key] = valueEnUS;
})

console.log(zhCNBundle);
console.log(enUSBundle);

fs.writeFileSync('zh-CN.json', JSON.stringify(zhCNBundle, null, 2));
fs.writeFileSync('en-US.json', JSON.stringify(enUSBundle, null, 2));

```

