import moment from 'moment';
import {execute} from '../conf/mysqlConf';

/**
 * @desc 发送消息
 */
async function sendMes (mes: string, sendUserId : number, receiveUserId : number, createDate : string, mesType: number) {
    return await execute('insert into chat(mes, send_userid, receive_userid, create_date, mes_type) values(?,?,?,?,?)', [mes, sendUserId, receiveUserId, createDate, mesType]);
}

/**
 * @desc 消息已经到达
 */
async function arriveMes (id: number, receiveDate : string) {
    return await execute('update chat set receive_date = ? where id = ?', [receiveDate, id]);
}

/**
 * @desc 查看消息
 */
async function viewMes (uId: number, sendId : number) {
    return await execute('update chat set view_date = ? where receive_userid = ? and send_userid = ? and view_date is null',
        [moment().format('YYYY-MM-DD HH:mm:ss'), uId, sendId]);
}
/**
 * @desc 查看一条消息
 */
async function viewMesOne (id: number) {
    return await execute('update chat set view_date = ? where id = ? and view_date is null', [moment().format('YYYY-MM-DD HH:mm:ss'), id]);
}

/**
* @desc 获取所有消息
*/
async function getAllMes (id: number) {
    return await execute('select * from chat where id=?', [id]);
}

/**
 * @desc 获取消息
 */
async function getMesById (id: number, otherId: number) {
    return await execute('select count(id) as size from chat where (send_userid=? and receive_userid=?) | (receive_userid=? and send_userid=?)', [id, otherId, id, otherId]);
}

/**
 * @desc 分页获取消息
 */
async function getPagingMesById (id: number, otherId: number, startIndex: number, endIndex: number) {
    return await execute('select * from chat where (send_userid=? and receive_userid=?) | (receive_userid=? and send_userid=?) limit ?,?', [id, otherId, id, otherId, startIndex, endIndex]);
}

/**
 * @desc 查询未读用户消息
 */
async function unreadMes (id: number) {
    return await execute('select * from chat where receive_userid=? and view_date is null', [id]);
}

/**
 * @desc 查询最近联系人
 */
async function nearestContact (id: number) {
    return await execute('SELECT * FROM nearest_contact WHERE user_id = ? and state = 0 and  YEARWEEK(date_format(date,\'%Y-%m-%d\')) = YEARWEEK(now())', [id]);
}
/**
 * @desc 删除联系人
 */
async function deleteNearestContact (id: number, contactId: number) {
    return await execute('update nearest_contact set state = 1 where user_id = ? and contact_id = ? and YEARWEEK(date_format(date,\'%Y-%m-%d\')) = YEARWEEK(now())', [id, contactId]);
}

/**
 * @desc 添加最近联系人
 */
async function addNearestContactDao (id: number, otherId: number) {
    return await execute('insert into nearest_contact(date, user_id, contact_id) values(?, ?, ?)', [moment().format('YYYY-MM-DD HH:mm:ss'), id, otherId]);
}


export {
    sendMes,
    arriveMes,
    viewMes,
    viewMesOne,
    getAllMes,
    getMesById,
    getPagingMesById,
    unreadMes,
    nearestContact,
    addNearestContactDao,
    deleteNearestContact,
};
