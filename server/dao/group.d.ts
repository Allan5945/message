/**
 * @desc 创建分组
 */
declare function createGroup(groupName: string, groupUserids: string, groupState: number, groupType: number, groupHaving: number, groupAdmin: string): Promise<unknown>;
/**
 * @desc 修改组名称
 */
declare function updateGroupName(groupName: string, groupId: number): Promise<unknown>;
/**
 * @desc 修改组成员
 */
declare function updateGroupUsers(groupUserIds: string, groupId: number): Promise<unknown>;
/**
 * @desc 修改组状态(开放还是关闭)
 */
declare function updateGroupState(groupState: number, groupId: number): Promise<unknown>;
/**
 * @desc 修改组类型
 */
declare function updateGroupType(groupType: number, groupId: number): Promise<unknown>;
/**
 * @desc 修改群归属人
 */
declare function updateGroupBelong(groupBelong: number, groupId: number): Promise<unknown>;
/**
 * @desc 加入群组
 */
declare function updateGroupDao(groupUserIds: string, groupId: number): Promise<unknown>;
/**
 * @desc 查看某群
 */
declare function selectGroupDao(groupId: number): Promise<unknown>;
export { createGroup, updateGroupName, updateGroupUsers, updateGroupState, updateGroupType, updateGroupBelong, updateGroupDao, selectGroupDao, };
