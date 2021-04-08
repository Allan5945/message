/**
* @desc 创建群组
*/
declare function createGroup(groupName: string, groupUserids: string, groupState: number, groupType: number, groupHaving: number, groupAdmin: string): Promise<unknown>;
/**
* @desc 加入群
*/
declare function joinGroup(uid: number, gid: number): Promise<unknown>;
/**
 * @desc 移出群
 */
declare function exitGroup(uid: number, gid: number): Promise<unknown>;
/**
* @desc 申请加入群
*/
declare function applyJoinGroup(uid: number, gid: number): Promise<unknown>;
export { createGroup, joinGroup, exitGroup, applyJoinGroup, };
