import nodemailer from 'nodemailer';
import yaml from 'js-yaml';
import http from 'http';
import fs from 'fs';
import url from 'url';
const mailInfo = yaml.load(fs.readFileSync('./mail.yaml', 'utf8'));


//初始化邮件服务
const transporter = nodemailer.createTransport({
    service: 'qq',//邮箱服务
    host: 'smtp.qq.com',//邮箱服务地址
    port: 465,//邮箱服务端口
    secure: true,//是否使用安全连接
    auth:{
        user: mailInfo.user,//邮箱账号
        pass: mailInfo.pass//邮箱密码
    }
})

http.createServer((req, res) => { 
    const { pathname } = url.parse(req.url);
    const { method } = req;
    if (method === "POST" && pathname === "/send/mail") {
        //发送邮件
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        })
        req.on('end', () => {
           transporter.sendMail(
             {
               from: mailInfo.user, //发件人
               to: mailInfo.to, //收件人
               subject: mailInfo.subject, //邮件主题
               text: mailInfo.text, //邮件内容
             },
             (err, info) => {
               if (err) throw err;
               console.log('邮件发送成功');
             }
           );
        })
       
    }

}).listen(3000, () => {
    console.log('3000 is running');
})