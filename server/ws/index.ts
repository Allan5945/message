import WebSocket from 'ws';
import urlib from 'url';
import wsFilter from '../filter/wsFilter';
import {getUser} from '../dao/redisCache';
import {getUserData} from '../utils/userUtils';
import {addWs} from './user';

async function postOffice (d: any) {
    let {type, tid, data} = JSON.parse(d);
    let userInformation = await wsFilter(tid);
    if (userInformation) {
        if (userInformation) {
            switch (type) {
                case 'message':
                    // sendUser(data.text, userInformation, data.receiveId);
                    break;
                case 'groupMessage':
                    // sendGroup(data.text, userInformation, data.receiveId);
                    break;
                case 'notice':
                    break;
                default:
            }
        }
    }
}

function createWs (server: any) {
    const wss = new WebSocket.Server({
        server,
    });
    wss.on('connection', async function connection (ws: any, request: any) {
        const url = request.url;
        const urls = urlib.parse(url, true);
        const tid = urls.query.tid;
        if (tid && typeof tid === 'string') {
            let data = await getUser(tid);
            if (data && data.token) {
                let u = await getUserData(tid);
                if (u) {
                    // 添加新ws
                    addWs(u.username, u.clientType, ws);
                }
            } else {
                ws.send('身份过期！，即将断开连接');
                ws.close();
            }
        } else {
            ws.send('无权访问！，即将断开连接');
            ws.close();
        }
    });
    console.log('ws启动成功');
}


export {postOffice, createWs };

