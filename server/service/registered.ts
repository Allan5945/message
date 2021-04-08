import { generateFromString } from 'generate-avatar';
import path from 'path';
const rootPath = require('app-root-path').path;
// @ts-ignore
import { v1 as uuidv1 } from 'uuid';
const fs = require('fs');
import {selectEmail, createUser, queryUserName} from '../dao/usercenter';
import {
    queryVCode,
    delVCode,
    queryFrequentSend,
    setVCode,
} from '../dao/verificationCodeServiceDao';
import send from '../utils/emailUtils';
import {num} from '../utils/validation';
import {randomString} from '../utils/userUtils';
import {getNowDate} from '../utils/dateUtils';
import {cryptoUser} from '../utils/encryptionUtils';

const codeType = 'reg';


function sendCode (email: string) {
    return new Promise((resolve, reject) => {
        selectEmail(email).then((data: Array<any>) => {
            if (data.length > 0) {
                resolve({
                    type: 2,
                    mes: '邮箱存在',
                });
            } else {
                queryFrequentSend(email, codeType).then((data: any) => {
                    if (data) {
                        resolve({
                            type: 3,
                            mes: '发送频繁，请稍后发送',
                        });
                    } else {
                        try {
                            let code = num().toString();
                            send(email, 'mes注册验证码', `验证码:${code}`);
                            let isTrue = setVCode(email, codeType, 60, 600, true, code);
                            if (isTrue) {
                                resolve({
                                    type: 0,
                                    mes: '验证码发送成功',
                                });
                            } else {
                                resolve({
                                    type: 1,
                                    mes: '验证码发送失败',
                                });
                            }
                        } catch (e) {
                            resolve({
                                type: 1,
                                mes: '验证码发送失败',
                            });
                        }
                    }
                });
            }
        }).catch(() => {
            resolve({
                type: 1,
                mes: '验证码发送失败',
            });
        });
    });
}

/**
 * @desc 注册
 */
function registeredUser (username: string, password: string, email : string, emailCode: string) {
    return new Promise(function (resolve, reject) {
        queryUserName(username).then((data: any) => {
            if (data.length === 0) {
                queryVCode(email, codeType).then((code: any) => {
                    if (code && code === emailCode) {
                        let url = `/img/ph/${cryptoUser(username)}-${uuidv1()}.svg`;
                        createUser(username, password, email, getNowDate(), url, `BCF${randomString(6)}`).then((data: any) => {
                            if (data) {
                                resolve({
                                    type: 0,
                                    mes: '注册成功',
                                });
                                delVCode(email, codeType);
                                let filePath = path.join(rootPath, 'static/', url);
                                // @ts-ignore
                                fs.open(filePath, 'a+', (err, fd) => {
                                    if (err) { throw err; }
                                    fs.writeFile(fd, generateFromString(username), (error: any) => {
                                        if (error) { throw err; }
                                        // 3.关闭文件
                                        fs.close(fd, (err: any) => {
                                            if (err) { throw err; }
                                        });
                                    });
                                });

                            } else {
                                resolve({
                                    type: 1,
                                    mes: '注册失败',
                                });
                            }
                        }).catch((err) => {
                            reject(err);
                        });
                    } else {
                        resolve({
                            type: 3,
                            mes: '验证码错误',
                        });
                    }
                });
            } else {
                resolve({
                    type: 2,
                    mes: '用户名存在',
                });
            }
        });
    });
}

export {
    sendCode,
    registeredUser,
};
