// const webSocket = require('ws');
// const wss = new webSocket.Server({ port: 3000 });
//
//
// class WsUser {
//     // 用户ws对象
//     static users = new Map();
//     // 用户名
//     private readonly userName: string;
//     constructor (ws: any, request:any) {
//         const un = request.headers['sec-websocket-key'];
//         this.userName = un;
//         this.closeWs = this.closeWs.bind(this);
//         this.error = this.error.bind(this);
//         WsUser.users.set(un, ws);
//         ws.on('message', WsUser.message);
//         ws.on('close', this.closeWs);
//         ws.on('error', this.error);
//     }
//
//     /**
//      * @desc 发送给一个人
//      * @param  {string} uid 用户的id
//      * @param  {string} mes 内容
//      * @return {} void
//      * @author allan 2020/7/24 16:31
//      */
//     static send (uid: string, mes: string): void {
//         const user = WsUser.users.get(uid);
//         user.send(mes);
//     }
//
//     /**
//      * @desc 推送
//      * @param  {array} uids 用户的id数组
//      * @param  {string} mes 内容
//      * @return {void}
//      * @author allan 2020/7/24 16:31
//      */
//     static sendGroup (uids: [], mes: string): void {
//         uids.forEach((uid) => {
//             const user = WsUser.users.get(uid);
//             user.send(mes);
//         });
//     }
//
//     /**
//      * @desc 关闭连接
//      * @param  {ws} ws 字段备注
//      * @return {Index} sasa
//      * @author allan 2020/7/24 16:47
//      */
//     private closeWs (ws: any) {
//         WsUser.users.delete(this.userName);
//         console.log(WsUser.users.size);
//     }
//
//     /**
//      * @desc 收取消息
//      * @param  {string} data 字段备注
//      * @return {Index} sasa
//      * @author allan 2020/7/24 16:47
//      */
//     private static message (data: string) {
//         console.log(`收取到消息:${data}`);
//     }
//
//     /**
//      * @desc 报错、断开
//      * @param  {ws} ws 字段备注
//      * @return {Index} sasa
//      * @author allan 2020/7/24 16:47
//      */
//     private error (ws: any) {
//         WsUser.users.delete(this.userName);
//     }
//
// }
//
// wss.on('connection', function connection (ws: any, request: any) {
//     // eslint-disable-next-line no-new
//     new WsUser(ws, request);
// });
