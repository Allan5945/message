import {execute} from '../conf/mysqlConf';

/**
 * @desc 创建分组
 */
async function createGroup (groupName : string, groupUserids : string, groupState : number, groupType : number, groupHaving: number, groupAdmin: string, grpupCode?: string) {
    return await execute('insert into group_table(group_name, group_userids, group_state, group_type, group_having, group_admin, group_code) values(?,?,?,?,?,?,?)', [groupName, groupUserids, groupState, groupType, groupHaving, groupAdmin, grpupCode]);
}

/**
 * @desc 修改组名称
 */
async function updateGroupName (groupName : string, groupId : number) {
    return await execute('update group_table set groupName = ? where groupId = ?', [groupName, groupId]);
}

/**
 * @desc 修改组成员
 */
async function updateGroupUsers (groupUserIds : string, groupId : number) {
    return await execute('update group_table set group_userids = ? where groupId = ?', [groupUserIds, groupId]);
}

/**
 * @desc 修改组状态(开放还是关闭)
 */
async function updateGroupState (groupState : number, groupId : number) {
    return await execute('update group set group_state = ? where groupId = ?', [groupState, groupId]);
}
/**
 * @desc 修改组类型
 */
async function updateGroupType (groupType : number, groupId : number) {
    return await execute('update group_table set group_type = ? where groupId = ?', [groupType, groupId]);
}

/**
 * @desc 修改群归属人
 */
async function updateGroupBelong (groupBelong : number, groupId : number) {
    return await execute('update group_table set group_belong = ? where groupId = ?', [groupBelong, groupId]);
}

/**
 * @desc 加入群组
 */
async function updateGroupDao (groupUserIds : string, groupId : number) {
    return await execute('update group_table set group_userids = ? where id = ?', [groupUserIds, groupId]);
}

/**
 * @desc 查看某群
 */
async function selectGroupDao (groupId : number) {
    return await execute('select * from group_table where id = ?', [groupId]);
}

export {
    createGroup,
    updateGroupName,
    updateGroupUsers,
    updateGroupState,
    updateGroupType,
    updateGroupBelong,
    updateGroupDao,
    selectGroupDao,
};
