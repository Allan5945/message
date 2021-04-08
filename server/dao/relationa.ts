import {execute} from '../conf/mysqlConf';

/**
 * @desc 创建用户情况表
 */
async function createRelation (recently : string, userId : number) {
    return await execute('insert into recently(user_id, recently) values(?,?)', [userId, recently]);
}

export {createRelation};
