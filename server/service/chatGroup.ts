import {sendMes} from '../dao/groupchat';
import {getNowDate} from '../utils/dateUtils';
import {selectGroupDao} from '../dao/group';
import {queryUserByIds} from '../dao/usercenter';
import {idListFormatToNumber} from '../utils/userUtils';
import {getWs, UserWs, sendAllClient} from '../ws/user';

/**
 * @desc 发送群
 */
function sendGroup (msg: string, sendUserId : number, groupId : number) {
    return new Promise(function (resolve, reject) {
        selectGroupDao(groupId).then((data: Array<any>) => {
            if (data.length > 0) {
                let groupUserIds = idListFormatToNumber(data[0].group_userids.split(','));
                if (groupUserIds.includes(sendUserId)) {
                    sendMes(msg, sendUserId, groupId, getNowDate()).then((data: any) => {
                        if (data) {
                            queryUserByIds(groupUserIds).then((users: Array<any>) => {
                                sendAllClient(users.map((user) => user.username), {
                                    msg,
                                    type: 'groupChat',
                                });
                            });
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
                        type: 3,
                        msg: '您不存在该群中',
                    });
                }
            } else {
                resolve({
                    type: 2,
                    msg: '群不存在',
                });
            }
        });
        sendMes(msg, sendUserId, groupId, getNowDate()).then((data: any) => {
            console.log(data);
        });
    });
}

export {sendGroup};

