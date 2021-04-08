import fs from 'fs';
import path from 'path';
// @ts-ignore
import { v1 as uuidv1 } from 'uuid';
const rootPath = require('app-root-path').path;
import {
    getMesById,
    sendMes,
    getPagingMesById,
    unreadMes,
    nearestContact,
    addNearestContactDao,
    viewMes,
    deleteNearestContact,
} from '../dao/chat';
import {selectJoin} from '../dao/applyJoin';
import {getNowDate} from '../utils/dateUtils';
import {queryUserById, queryUserByIds} from '../dao/usercenter';
import {getWs, UserWs, sendAllClient} from '../ws/user';

function formatNum (num: number) {
    let n = num % 1 === 0;
    return n ? num : Math.trunc(num) + 1;
}

/**
 * @desc 发送人
 */
async function sendUser (msg: any, sendId: any, sendUserName: any, receiveUserId : number, mesType: number) {

    return new Promise(function (resolve, reject) {
        queryUserById(receiveUserId).then((data: any) => {
            if (data) {
                let receiveUserName = data.username;
                if (mesType === 1) {
                    const reader = fs.createReadStream(msg.path);
                    msg = `/voice/${uuidv1()}.mp3`;
                    let filePath = path.join(rootPath, 'static/', msg);
                    const upStream = fs.createWriteStream(filePath);
                    reader.pipe(upStream);
                }
                sendMes(msg, sendId, receiveUserId, getNowDate(), mesType).then((data: any) => {
                    if (data) {
                        sendAllClient([receiveUserName], JSON.stringify({
                            data: {
                                mes: msg,
                                // eslint-disable-next-line camelcase
                                mes_type: mesType,
                                // eslint-disable-next-line camelcase
                                receive_date: null,
                                // eslint-disable-next-line camelcase
                                receive_userid: receiveUserId,
                                // eslint-disable-next-line camelcase
                                send_userid: sendId,
                                // eslint-disable-next-line camelcase
                                view_date: null,
                            },
                            type: 'chat',
                        }));
                        sendAllClient([sendUserName], JSON.stringify({
                            data: {
                                mes: msg,
                                // eslint-disable-next-line camelcase
                                mes_type: mesType,
                                // eslint-disable-next-line camelcase
                                receive_date: null,
                                // eslint-disable-next-line camelcase
                                receive_userid: receiveUserId,
                                // eslint-disable-next-line camelcase
                                send_userid: sendId,
                                // eslint-disable-next-line camelcase
                                view_date: null,
                            },
                            type: 'chat',
                        }));
                        resolve({
                            type: 0,
                            msg: '发送成功',
                        });
                    } else {
                        resolve({
                            type: 1,
                            msg: '发送失败',
                        });
                    }
                });
            } else {
                resolve({
                    type: 2,
                    msg: '用户不存在',
                });
            }
        });
    });
}


/**
* @desc 获取对话记录
*/
async function getMes (id: number, otherId : number, pageIndex?: number, listCount ?: number) {
    let pageSize = 10;
    return new Promise(function (resolve, reject) {
        if (pageIndex && listCount) {
            let startIndex = listCount - pageSize * pageIndex;
            if (startIndex < 0) {
                pageSize = pageSize + startIndex;
                startIndex = 0;
            }
            if (pageSize < 0) {
                pageSize = 0;
            }
            let pageCount = formatNum(listCount / pageSize);
            getPagingMesById(id, otherId, startIndex, pageSize).then((data: any) => {
                resolve({
                    type: 0,
                    msg: '查询成功',
                    data: {
                        listCount,
                        pageSize,
                        pageIndex,
                        pageCount,
                        chatList: data,
                    },
                });
            }).catch(() => {
                resolve({
                    type: 1,
                    msg: '查询失败',
                });
            });
        } else {
            getMesById(id, otherId).then((listCount: any) => {
                if (listCount) {
                    listCount = listCount[0].size;
                    pageIndex = 1;
                    let pageCount = formatNum(listCount / pageSize);
                    let startIndex = listCount - pageSize;
                    if (startIndex < 0) {
                        startIndex = 0;
                    }
                    getPagingMesById(id, otherId, startIndex, pageSize).then((data: any) => {
                        resolve({
                            type: 0,
                            msg: '查询成功',
                            data: {
                                listCount,
                                pageSize,
                                pageIndex,
                                pageCount,
                                chatList: data,
                            },
                        });
                    });
                } else {
                    resolve({
                        type: 1,
                        msg: '查询失败',
                    });
                }
            }).catch(() => {
                resolve({
                    type: 1,
                    msg: '查询失败',
                });
            });
        }
    });
}

/**
 * @desc 初始化获取消息，联系人
 */
async function initChatService (id: number) {
    return new Promise(function (resolve, reject) {
        let um = unreadMes(id);
        let nc = nearestContact(id);
        // @ts-ignore
        Promise.all([um, nc]).then((ds: any) => {
            let unreadMesIds = Array.from(new Set([...ds[0].map((value: any) => value.send_userid), ...ds[1].map((value: any) => value.contact_id)]));
            if (unreadMesIds.length > 0) {
                let m = {};
                ds[0].forEach((data: any) => {
                    // @ts-ignore
                    if (m.hasOwnProperty(data.send_userid)) {
                        // @ts-ignore
                        m[data.send_userid]++;
                    } else {
                        // @ts-ignore
                        m[data.send_userid] = 1;
                    }
                });

                queryUserByIds(unreadMesIds).then((data: any) => {
                    let resultData = {};
                    if (data.length > 0) {
                        data.forEach((d: any) => {
                            if (m.hasOwnProperty(d.id)) {
                                // @ts-ignore
                                resultData[d.id] = {
                                    nickname: d.nickname,
                                    headPortraitUrl: d.headPortraitUrl,
                                    synopsis: d.synopsis,
                                    init: false,
                                    // @ts-ignore
                                    count: m[d.id],
                                    chatList: [],
                                    id: d.id,
                                };
                            } else {
                                // @ts-ignore
                                resultData[d.id] = {
                                    nickname: d.nickname,
                                    headPortraitUrl: d.headPortraitUrl,
                                    synopsis: d.synopsis,
                                    init: false,
                                    count: 0,
                                    chatList: [],
                                    id: d.id,
                                };
                            }
                        });
                    }
                    resolve({
                        type: 0,
                        data: resultData,
                        msg: '查询成功',
                    });
                }).catch(() => {
                    resolve({
                        type: 1,
                        msg: '查询失败',
                    });
                });
            } else {
                resolve({
                    type: 0,
                    data: [],
                    msg: '查询成功',
                });
            }
        }).catch(() => {
            resolve({
                type: 1,
                msg: '查询失败',
            });
        });
    });
}


/**
 * @desc 添加联系人
 */
async function addNearestContactService (id: number, otherId: number) {
    return new Promise(function (resolve, reject) {
        addNearestContactDao(id, otherId).then((data: any) => {
            resolve({
                type: 0,
                msg: '添加成功',
            });
        }).catch(() => {
            resolve({
                type: 1,
                msg: '查询失败',
            });
        });
    });
}

/**
 * @desc 添加联系人
 */
async function deleteNearestContactService (id: number, otherId: number) {
    return new Promise(function (resolve, reject) {
        deleteNearestContact(id, otherId).then((data: any) => {
            resolve({
                type: 0,
                msg: '删除成功',
            });
        }).catch(() => {
            resolve({
                type: 1,
                msg: '失败',
            });
        });
    });
}


/**
 * @desc 查看消息
 */
async function viewMesService (uId: number, sendId: number) {
    return new Promise(function (resolve, reject) {
        viewMes(uId, sendId).then((data: any) => {
            resolve({
                type: 0,
                msg: '修改成功',
            });
        }).catch(() => {
            resolve({
                type: 1,
                msg: '修改失败',
            });
        });
    });
}

/**
 * @desc 查看消息
 */
async function videoChatService (id: number, acceptId: number, step: number, con: any) {
    return new Promise(function (resolve, reject) {
        queryUserById(acceptId).then((user: any) => {
            if (user) {
                let userWs = getWs(user.username);
                if (userWs) {
                    queryUserById(id).then((sUser: any) => {
                        if (sUser) {
                            let names = [user.username];
                            if (step === 101) {
                                names.push(sUser.username);
                            }
                            console.log(names, step);
                            sendAllClient(names, JSON.stringify({
                                data: {
                                    sendId: sUser.id,
                                    acceptId: acceptId,
                                    nikeName: sUser.nickname,
                                },
                                type: 'videoChat',
                                step: step,
                                con,
                            }));
                        }
                    });
                    resolve({
                        type: 0,
                        msg: '操作成功',
                    });
                } else {
                    resolve({
                        type: 3,
                        msg: '对方不在线',
                    });
                }
            } else {
                resolve({
                    type: 2,
                    msg: '用户不存在',
                });
            }
        });
    });
}

export {sendUser, getMes, initChatService, addNearestContactService, viewMesService, deleteNearestContactService, videoChatService};

