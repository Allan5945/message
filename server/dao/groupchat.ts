import {execute} from '../conf/mysqlConf';

/**
 * @desc 发送消息
 */
async function sendMes (mes: string, sendUserId : number, receiveGroupId : number, createDate : string) {
    return await execute('insert into group_chat(mes, send_userid, receive_groupid, create_date) values(?,?,?,?)', [mes, sendUserId, receiveGroupId, createDate]);
}

export {
    sendMes,
};
