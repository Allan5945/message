import {execute} from '../conf/mysqlConf';

/**
 * @desc 申请加群
 */
async function applyJoinGroup (userId: number, groupId : number, applyTime : string) {
    return await execute('insert into apply_join_group(user_id, group_id, apply_time) values(?,?,?)', [userId, groupId, applyTime]);
}

export {
    applyJoinGroup,
};
