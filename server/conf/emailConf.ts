import nodemailer from 'nodemailer';
// 创建可重用邮件传输器
const transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    port: 465,
    secure: true,
    auth: {
        user: 'allan5945@163.com',
        pass: 'JSXOSRRDAJYRMNET',
    },
});
const send = (to: string, subject: string, html: string) => {
    let mailOptions = {
        from: 'allan5945@163.com',
        to,
        subject,
        html,
    };
    transporter.sendMail(mailOptions, function (error: any, info: { messageId: any; }) {
        if (error) {
            return console.log(error);
        }
        console.log('Message send: %s', info.messageId);
    });
};

// let emailCode = '00000110';
// let email = {
//     title: '医联在线--邮箱验证码',
//     htmlBody: '<h1>Hello!</h1><p style="font-size: 18px;color:#000;">mes的验证码为：<u style="font-size: 16px;color:#1890ff;">' + emailCode + '</u></p><p style="font-size: 14px;color:#666;">10分钟内有效</p>',
// };
// send('528386631@qq.com', email.title, email.htmlBody);
export default send;
