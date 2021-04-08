import {selectEmail, changePas} from '../dao/usercenter';
import {queryFrequentSend, queryVCode, setVCode} from '../dao/verificationCodeServiceDao';
import send from '../utils/emailUtils';
import {num} from '../utils/validation';

const codeType = 'rep';

/**
* @desc 发送邮箱验证码
*/
function sendCode (email: string) {
    return new Promise((resolve, reject) => {
        selectEmail(email).then((data: Array<any>) => {
            if (data.length > 0) {
                queryFrequentSend(email, codeType).then((data: any) => {
                    if (data) {
                        resolve({
                            type: 3,
                            mes: '发送频繁，请稍后发送',
                        });
                    } else {
                        try {
                            let code = num().toString();
                            send(email, 'mes修改密码验证码', `验证码:${code}`);
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
            } else {
                resolve({
                    type: 2,
                    mes: '邮箱不存在',
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
* @desc 通过邮箱找回密码
*/
function retrievePassword (email: string, password: string, repCode: string) {
    return new Promise((resolve, reject) => {
        selectEmail(email).then((data: Array<any>) => {
            if (data.length > 0) {
                let u = data[0];
                queryVCode(email, codeType).then((code: any) => {
                    if (code && code === repCode) {
                        changePas(password, u.username).then((d: any) => {
                            if (d) {
                                resolve({
                                    type: 0,
                                    mes: '修改成功',
                                });
                            } else {
                                resolve({
                                    type: 1,
                                    mes: '修改失败',
                                });
                            }
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
                    mes: '账号不存在',
                });
            }
        }).catch(() => {
            resolve({
                type: 5,
                mes: '内部错误',
            });
        });
    });
}

/**
 * @desc 修改密码
 */
function updatePas (username: string, password: string) {
    return new Promise(function (resolve, reject) {
        changePas(password, username).then((data) => {
            if (data) {
                resolve({
                    type: 0,
                    mes: '修改成功',
                });
            } else {
                resolve({
                    type: 1,
                    mes: '修改成功',
                });
            }
        });
    });
}

export {
    sendCode,
    retrievePassword,
    updatePas,
};
