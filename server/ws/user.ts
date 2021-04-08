import {ClientType, getClientName} from '../utils/clientTypes';
import {cryptoUser} from '../utils/encryptionUtils';

let userWsList = new Map<string, Map<string, any>>();

class UserWs {
    private ws: any;
    private username:string;
    private clientType:ClientType;
    constructor (ws: any, username: string, clientType:ClientType) {
        this.ws = ws;
        this.username = username;
        this.clientType = clientType;
        this.ws.on('message', UserWs.message);
        this.ws.on('close', UserWs.close.bind(this));
    }

    getWs (): any {
        return this.ws;
    }

    setWs (ws: any): any {
        this.ws = ws;
    }

    send (text: string) {
        this.ws.send(text);
    }

    static message (data: any) {
        console.log(data);
    }

    static close (data: any) {
        // @ts-ignore
        deleteWs(this.username, this.clientType);
    }
}


/**
* @desc 添加ws
*/
function addWs (username: string, clientType: ClientType, ws: any) {
    const un = cryptoUser(username); // 加密用户名
    const ct = getClientName(clientType); // 获取客户端
    let clients = userWsList.get(un);
    const userWs = new UserWs(ws, username, clientType);
    if (clients) {
        let ctMs: Map<string, any> = clients.get(ct);
        if (ctMs) {
            let w = ctMs.get(ws);
            if (w) {
                w.send('您有其它地方登录！');
                w.close();
            }
            console.log('ws关闭');
        }
        clients.set(ct, new Map<string, any>().set('ws', userWs));
    } else {
        userWsList.set(un, new Map<string, any>().set(ct, new Map<string, any>().set('ws', userWs)));
    }
}

/**
* @desc 删除ws
*/
function deleteWs (username: string, clientType: ClientType) {
    const un = cryptoUser(username); // 加密用户名
    const ct = getClientName(clientType); // 获取客户端
    let clients = userWsList.get(un);
    if (clients) {
        let ctMs: Map<string, any> = clients.get(ct);
        if (ctMs) {
            ctMs.set('ws', null);
        }
    }
}

/**
* @desc 获取ws
*/
function getWs (username: string): Map<string, Map<string, any>> {
    const un = cryptoUser(username); // 加密用户名
    return userWsList.get(un);
}

/**
* @desc 发送给所有的客户端
*/
function sendAllClient (receiveUserName: Array<string>, data: any) {
    receiveUserName.forEach((name) => {
        let receiveUserNames = getWs(name);
        if (receiveUserNames) {
            for (let [key, u] of receiveUserNames) {
                let userWs: UserWs = u.get('ws');
                if (userWs) {
                    userWs.send(data);
                }
            }
        }
    });
}


export {
    getWs,
    deleteWs,
    addWs,
    UserWs,
    sendAllClient,
};
