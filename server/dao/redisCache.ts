import redisClient from './../conf/redis';
// @ts-ignore
import { v1 as uuidv1 } from 'uuid';
import {ClientType} from '../utils/clientTypes';

// 过期时间
const time: number = 2592000;

function addUser (userName: string, token: string, clientType : ClientType, u: string, id: number) {
    let tid = `${userName}:${uuidv1()}`;
    redisClient.hmset(tid, 'token', token, 'clientType', clientType, 'username', u, 'id', id);
    redisClient.expire(tid, time);
    return tid;
}
function removeUser (uuid: string) {
    redisClient.del(uuid);
}
function getUser (tid: string): any {
    return new Promise((resolve, reject) => {
        redisClient.hmget(tid, 'token', 'clientType', 'username', 'id', (err, res) => {
            if (err || !res[0]) {
                resolve(null);
            } else {
                resolve({
                    token: res[0],
                    clientType: Number(res[1]),
                    username: res[2],
                    id: Number(res[3]),
                });
            }
        });
    });
}
export {addUser, removeUser, getUser};
