import {createGroup as create, updateGroupDao, selectGroupDao} from '../dao/group';
import {randomString} from '../utils/userUtils';

/**
* @desc 创建群组
*/
function createGroup (groupName : string, groupUserids : string, groupState : number, groupType : number, groupHaving: number, groupAdmin: string) {
    return new Promise((resolve, reject) => {
        create(groupName, groupUserids, groupState, groupType, groupHaving, groupAdmin, `BCG${randomString(6)}`).then((data: any) => {
            if (data) {
                resolve({
                    type: 0,
                    mes: '创建成功',
                });
            } else {
                resolve({
                    type: 1,
                    mes: '创建失败',
                });
            }
        }).catch((e) => {
            resolve({
                type: 2,
                mes: '创建失败',
            });
        });
    });
}

/**
* @desc 加入群
*/
function joinGroup (uid: number, gid : number) {
    return new Promise((resolve, reject) => {
        selectGroupDao(gid).then((data: Array<any>) => {
            if (data.length > 0) {
                let ids: Array<number> = data[0].group_userids.split(',').map((id: string) => Number(id));
                let gs = new Set(ids);
                if (!gs.has(uid)) {
                    gs.add(uid);
                }
                updateGroupDao(Array.from(gs).join(','), gid).then((data: any) => {
                    console.log(data);
                    if (data) {
                        resolve({
                            type: 0,
                            mes: '添加成功',
                        });
                    } else {
                        resolve({
                            type: 1,
                            mes: '添加失败',
                        });
                    }
                }).catch((e) => {
                    resolve({
                        type: 2,
                        mes: '创建失败',
                    });
                });
            } else {
                resolve({
                    type: 2,
                    mes: '群不存在',
                });
            }
        });
    });
}

/**
 * @desc 移出群
 */
function exitGroup (uid: number, gid : number) {
    return new Promise((resolve, reject) => {
        selectGroupDao(gid).then((data: Array<any>) => {
            if (data.length > 0) {
                let ids: Array<number> = data[0].group_userids.split(',').map((id: string) => Number(id));
                let gs = new Set(ids);
                if (gs.has(uid)) {
                    gs.delete(uid);
                    updateGroupDao(Array.from(gs).join(','), gid).then((data: any) => {
                        console.log(data);
                        if (data) {
                            resolve({
                                type: 0,
                                mes: '移出成功',
                            });
                        } else {
                            resolve({
                                type: 1,
                                mes: '移出失败',
                            });
                        }
                    }).catch((e) => {
                        resolve({
                            type: 2,
                            mes: '移出失败',
                        });
                    });
                } else {
                    resolve({
                        type: 3,
                        mes: '未在群组中',
                    });
                }
            } else {
                resolve({
                    type: 2,
                    mes: '群不存在',
                });
            }
        });
    });
}

/**
* @desc 申请加入群
*/
function applyJoinGroup (uid: number, gid : number) {
    return new Promise((resolve, reject) => {
        selectGroupDao(gid).then((data: Array<any>) => {
            if (data.length > 0) {
                let ids: Array<number> = data[0].group_userids.split(',').map((id: string) => Number(id));
                let gs = new Set(ids);
                if (!gs.has(uid)) {
                    gs.add(uid);
                }
                updateGroupDao(Array.from(gs).join(','), gid).then((data: any) => {
                    if (data) {
                        resolve({
                            type: 0,
                            mes: '添加成功',
                        });
                    } else {
                        resolve({
                            type: 1,
                            mes: '添加失败',
                        });
                    }
                }).catch((e) => {
                    resolve({
                        type: 2,
                        mes: '创建失败',
                    });
                });
            } else {
                resolve({
                    type: 2,
                    mes: '群不存在',
                });
            }
        });
    });
}

export {
    createGroup,
    joinGroup,
    exitGroup,
    applyJoinGroup,
};
