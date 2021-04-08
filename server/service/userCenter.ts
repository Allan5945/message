import {
    login,
    createUser,
    queryUserName,
    changePas,
    queryUserById,
    updateFrends,
    getFriendsDao,
    queryUserByIds,
    queryUserByCode, updateBlackList,
} from '../dao/usercenter';
import {ClientType} from '../utils/clientTypes';
import {addUser, removeUser} from '../dao/redisCache';
import {createToken} from '../utils/jwtUtils';
import {cryptoUser} from '../utils/encryptionUtils';
import {applyJoin, updateState, selectJoin, recentlyApply, closeApplyJoin, selectJoinList} from '../dao/applyJoin';
import {getNowDate} from '../utils/dateUtils';
import {sendAllClient} from '../ws/user';
import {idListFormatToNumber} from '../utils/userUtils';

/**
* @desc 登录
*/
function loginUser (username: string, password: string, clientType : ClientType) {
    return new Promise(function (resolve, reject) {
        login(username, password,).then((data: Array<any>) => {
            if (data.length > 0) {
                const user = data[0];
                const token: string = createToken(username); // token
                const un = cryptoUser(username); // 加密用户名
                let tid = addUser(un, token, clientType, username, user.id);
                resolve({
                    tid,
                    user,
                    type: 0,
                    msg: '查询成功',
                });
            } else {
                queryUserName(username).then((data: Array<any>) => {
                    if (data.length > 0) {
                        resolve({
                            type: 1,
                            msg: '密码错误',
                        });
                    } else {
                        resolve({
                            type: 2,
                            msg: '账号不存在',
                        });
                    }
                });
            }
        }).catch((err) => {
            reject(err);
        });
    });
}

/**
 * @desc 登出
 */
function loginOut (tid: string) {
    return new Promise((resolve, reject) => {
        removeUser(tid);
        resolve({
            type: 0,
            mes: '退出成功',
        });
    });
}

/**
* @desc 申请添加好友
*/
async function addFriend (userId: number, applyId: number) {
    let u = queryUserById(userId);
    let o = queryUserById(applyId);
    return new Promise(function (resolve, reject) {
        Promise.all([u, o]).then((data: Array<any>) => {
            let umes = data[0];
            let omes = data[1];
            if (umes) {
                if (omes) {
                    if (idListFormatToNumber(umes.frend_ids.split(',')).includes(applyId)) {
                        resolve({
                            type: 3,
                            msg: '已经是好友',
                        });
                    } else {
                        recentlyApply(userId, applyId).then((ra : Array<any>) => {
                            if (ra.length === 0) {
                                closeApplyJoin(userId, applyId).then(() => {
                                    applyJoin(userId, applyId, getNowDate()).then((data) => {
                                        if (data) {
                                            sendAllClient([omes.username], JSON.stringify(
                                                {
                                                    type: 'updateApply',
                                                }
                                            ));
                                            resolve({
                                                type: 0,
                                                msg: '申请成功',
                                            });
                                        } else {
                                            resolve({
                                                type: 1,
                                                msg: '申请失败',
                                            });
                                        }
                                    });
                                });
                            } else {
                                resolve({
                                    type: 4,
                                    msg: '已经申请过请勿重复申请',
                                });
                            }
                        });

                    }
                } else {
                    resolve({
                        type: 2,
                        msg: '添加的人不存在',
                    });
                }
            } else {
                resolve({
                    type: 1,
                    msg: '申请失败',
                });
            }

        }).catch(() => {
            resolve({
                type: 1,
                msg: '申请失败',
            });
        });
    });
}

/**
* @desc 修改添加好友状态
*/
function changeAdd (applyId: number, id: number, state: number) {
    return new Promise(function (resolve, reject) {
        selectJoin(applyId, id).then((data: Array<any>) => {
            if (data.length > 0) {
                let uid = data[0].user_id;
                updateState(id, state).then((join: any) => {
                    if (join) {
                        if (state === 0) {
                            queryUserById(applyId).then((user: any) => {
                                let ids = idListFormatToNumber(user.frend_ids === '' ? [] : user.frend_ids.split(','));
                                ids.push(uid);
                                let friends = new Set(ids);
                                updateFrends(user.id, Array.from(friends).join(',')).then((data: any) => {
                                    if (data) {
                                        sendAllClient([user.username], JSON.stringify({
                                            type: 'updateApply',
                                        }));
                                        sendAllClient([user.username], JSON.stringify({
                                            type: 'updateFriend',
                                        }));
                                    }
                                });
                            });
                            queryUserById(uid).then((user: any) => {
                                let ids = idListFormatToNumber(user.frend_ids === '' ? [] : user.frend_ids.split(','));
                                ids.push(applyId);
                                let friends = new Set(ids);
                                updateFrends(user.id, Array.from(friends).join(',')).then((data: any) => {
                                    if (data) {
                                        sendAllClient([user.username], JSON.stringify({
                                            type: 'updateApply',
                                        }));
                                        sendAllClient([user.username], JSON.stringify({
                                            type: 'updateFriend',
                                        }));
                                    }
                                });
                            });
                            resolve({
                                type: 0,
                                msg: '同意添加成功',
                            });
                        } else if (state === 1) {
                            resolve({
                                type: 0,
                                msg: '拒绝添加成功',
                            });
                        } else if (state === 3) {
                            resolve({
                                type: 0,
                                msg: '忽略添加成功',
                            });
                        }
                    } else {
                        resolve({
                            type: 3,
                            msg: '失败',
                        });
                    }
                });
            } else {
                resolve({
                    type: 2,
                    msg: '申请不存在',
                });
            }
        });
    });
}


/**
 * @desc 删除好友
 */
function deleteFriend (userId: number, applyId: number) {
    return new Promise(function (resolve, reject) {
        queryUserByIds([userId, applyId]).then((data: Array<any>) => {
            if (data && data.length === 2) {
                let s = data.filter((d: any) => d.id === userId)[0];
                let o = data.filter((d: any) => d.id === applyId)[0];
                if (s && o) {
                    let sIds = idListFormatToNumber(s.frend_ids.split(','));
                    let sFriends = new Set(sIds);
                    sFriends.delete(applyId);
                    let sp = updateFrends(userId, Array.from(sFriends).join(','));

                    let oIds = idListFormatToNumber(o.frend_ids.split(','));
                    let oFriends = new Set(oIds);
                    oFriends.delete(userId);
                    let op = updateFrends(applyId, Array.from(oFriends).join(','));

                    Promise.all([sp, op]).then(() => {
                        sendAllClient([s.username, o.username], JSON.stringify({
                            type: 'updateFriend',
                        }));
                        resolve({
                            type: 0,
                            msg: '删除成功',
                        });
                    }).catch(() => {
                        resolve({
                            type: 1,
                            msg: '删除失败',
                        });
                    });
                }
            } else {
                resolve({
                    type: 2,
                    msg: '不存在该好友',
                });
            }
        });
        queryUserById(userId).then((users: any) => {
            let ids = idListFormatToNumber(users.frend_ids.split(','));
            if (ids.includes(applyId)) {
                let friends = new Set(ids);
                friends.delete(applyId);
                updateFrends(userId, Array.from(friends).join(',')).then((data: any) => {
                    if (data) {
                        queryUserById(applyId).then((users: any) => {
                            sendAllClient([users.username], {
                                type: 'updateFriend',
                            });
                        });
                        resolve({
                            type: 0,
                            msg: '删除成功',
                        });
                    } else {
                        resolve({
                            type: 0,
                            msg: '删除失败',
                        });
                    }
                });
            } else {
                resolve({
                    type: 2,
                    msg: '不存在该好友',
                });
            }
        });

    });
}

/**
* @desc 获取好友列表
*/
function getFriends (id: number) {
    return new Promise(function (resolve, reject) {
        queryUserById(id).then((users: any) => {
            if (users) {
                let ids = users.frend_ids || '';
                let userIds = idListFormatToNumber(ids.split(','));
                getFriendsDao(userIds).then((users: Array<any>) => {
                    if (users) {
                        resolve({
                            type: 0,
                            msg: '查询成功',
                            data: users,
                        });
                    } else {
                        resolve({
                            type: 1,
                            msg: '查询失败',
                        });
                    }
                });
            } else {
                resolve({
                    type: 1,
                    msg: '查询失败',
                });
            }
        });
    });
}

/**
 * @desc 查询用户信息
 */
function selectUser (id: number) {
    return new Promise((resolve, reject) => {
        queryUserById(id).then((data: any) => {
            if (data) {
                resolve({
                    type: 0,
                    msg: '查询成功',
                    data: data,
                });
            } else {
                resolve({
                    type: 2,
                    msg: '用户不存在',
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
 * @desc 查询用户信息以及与自己关系
 */
function selectUserAndRelation (sId: number, oId: number) {
    return new Promise((resolve, reject) => {
        queryUserByIds([sId, oId]).then((data: Array<any>) => {
            if (data && data.length === 2) {
                let s = data.filter((d: any) => d.id === sId)[0];
                let o = data.filter((d: any) => d.id === oId)[0];
                let resultData = {
                    isFriend: false,
                    isBlack: false,
                };
                let suIds = idListFormatToNumber(s.frend_ids.split(','));
                let sbIds = idListFormatToNumber(s.black_list.split(','));
                if (suIds.includes(oId)) {
                    resultData['isFriend'] = true;
                }
                if (sbIds.includes(oId)) {
                    resultData['isBlack'] = true;
                }
                resolve({
                    type: 0,
                    msg: '查询成功',
                    data: {
                        isFriend: resultData.isFriend,
                        isBlack: resultData.isBlack,
                        id: o.id,
                        headPortraitUrl: o.headPortraitUrl,
                        nickname: o.nickname,
                        synopsis: o.synopsis,
                    },
                });
            } else {
                resolve({
                    type: 2,
                    msg: '用户不存在',
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

function selectUserByCode (code: string) {
    return new Promise((resolve, reject) => {
        queryUserByCode(code).then((data: any) => {
            if (data.length > 0) {
                resolve({
                    type: 0,
                    msg: '查询成功',
                    data: data[0],
                });
            } else {
                resolve({
                    type: 2,
                    msg: '用户不存在',
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
 * @desc 获取申请添加好友信息
 */
async function applyFriendsList (id: number) {
    return new Promise(function (resolve, reject) {
        selectJoinList(id).then((data: Array<any>) => {
            if (data.length > 0) {
                queryUserByIds(data.map((u: any) => u.user_id).join(',')).then((us: Array<any>) => {
                    let result = [];
                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < us.length; j++) {
                            if (data[i].user_id === us[j].id) {
                                result.push({...data[i], ...{
                                    headPortraitUrl: us[j].headPortraitUrl,
                                    nickname: us[j].nickname,
                                    uid: us[j].id,
                                    userCode: us[j].user_code,
                                }});
                                break;
                            }
                        }
                    }
                    resolve({
                        type: 0,
                        data: result,
                        msg: '查询成功',
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
 * @desc 拉黑/取消拉黑
 */
async function operationBlock (sId: number, oId: number, type: boolean) {
    return new Promise(function (resolve, reject) {
        queryUserByIds([sId, oId]).then((data: Array<any>) => {
            if (data && data.length === 2) {
                let s = data.filter((d: any) => d.id === sId)[0];
                let sbIds = idListFormatToNumber(s.black_list.split(','));
                if (type) {
                    if (sbIds.includes(oId)) {
                        resolve({
                            type: 2,
                            msg: '已经在黑名单中',
                        });
                    } else {
                        sbIds.push(oId);
                        updateBlackList(sId, sbIds.join(',')).then((re: any) => {
                            if (re) {
                                resolve({
                                    type: 0,
                                    msg: '修改成功',
                                });
                            } else {
                                resolve({
                                    type: 1,
                                    msg: '修改失败',
                                });
                            }
                        });
                    }
                } else {
                    if (sbIds.includes(oId)) {
                        let newData = new Set(sbIds);
                        newData.delete(oId);
                        updateBlackList(sId, Array.from(newData).join(',')).then((re: any) => {
                            if (re) {
                                resolve({
                                    type: 0,
                                    msg: '修改成功',
                                });
                            } else {
                                resolve({
                                    type: 1,
                                    msg: '修改失败',
                                });
                            }
                        });
                    } else {
                        resolve({
                            type: 3,
                            msg: '未在黑名单中',
                        });
                    }
                }
            } else {
                resolve({
                    type: 2,
                    msg: '用户不存在',
                });
            }
        }).catch(() => {
            resolve({
                type: 1,
                msg: '修改失败',
            });
        });
    });
}

export {
    loginUser,
    addFriend,
    deleteFriend,
    changeAdd,
    loginOut,
    getFriends,
    selectUser,
    selectUserByCode,
    applyFriendsList,
    selectUserAndRelation,
    operationBlock,
};

