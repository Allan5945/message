import {execute} from '../conf/mysqlConf';

/**
 * @desc 申请加好友
 */
async function applyJoin (userId: number, applyId : number, applyTime : string) {
    return await execute('insert into apply_join(user_id, apply_id, apply_time) values(?,?,?) ', [userId, applyId, applyTime]);
}

/**
 * @desc 查看是否最近有添加过
 */
async function recentlyApply (userId: number, applyId : number) {
    return await execute('select * from apply_join where user_id = ? and  apply_id = ? and state = 2 and YEARWEEK(date_format(apply_time,\'%Y-%m-%d\')) = YEARWEEK(now())', [userId, applyId]);
}
/**
 * @desc 把之前的申请关闭掉
 */
async function closeApplyJoin (userId: number, applyId : number) {
    return await execute('update apply_join set state = 4 where user_id = ? and  apply_id = ?  and state = 2', [userId, applyId]);
}

/**
 * @desc 修改申请状态
 */
async function updateState (id: number, state: number) {
    return await execute('update apply_join set state = ? where id = ?', [state, id]);
}

/**
 * @desc 查看申请列表
 */
async function selectJoinList (applyId: number) {
    return await execute('select * from apply_join where apply_id = ? and state = 2', [applyId]);
}

/**
 * @desc 查看申请
 */
async function selectJoin (applyId: number, id: number) {
    return await execute('select * from apply_join where id = ? and state = 2 and apply_id = ?', [id, applyId]);
}

/**
 * @desc 查看申请
 */
async function selectJoinById (applyId: number, id: number) {
    return await execute('select * from apply_join where id = ? and state = 2 and apply_id = ?', [id, applyId]);
}

export {
    applyJoin,
    updateState,
    selectJoin,
    recentlyApply,
    closeApplyJoin,
    selectJoinList,
};
