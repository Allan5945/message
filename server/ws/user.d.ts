import { ClientType } from '../utils/clientTypes';
declare class UserWs {
    private ws;
    private username;
    private clientType;
    constructor(ws: any, username: string, clientType: ClientType);
    getWs(): any;
    setWs(ws: any): any;
    send(text: string): void;
    static message(data: any): void;
    static close(data: any): void;
}
/**
* @desc 添加ws
*/
declare function addWs(username: string, clientType: ClientType, ws: any): void;
/**
* @desc 删除ws
*/
declare function deleteWs(username: string, clientType: ClientType): void;
/**
* @desc 获取ws
*/
declare function getWs(username: string): Map<string, Map<string, any>>;
/**
* @desc 发送给所有的客户端
*/
declare function sendAllClient(receiveUserName: Array<string>, data: any): void;
export { getWs, deleteWs, addWs, UserWs, sendAllClient, };
