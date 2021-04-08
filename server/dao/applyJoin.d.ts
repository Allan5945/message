/**
 * @desc 申请加好友
 */
declare function applyJoin(userId: number, applyId: number, applyTime: string): Promise<unknown>;
/**
 * @desc 修改申请状态
 */
declare function updateState(id: number, state: number): Promise<unknown>;
/**
 * @desc 查看申请
 */
declare function selectJoin(applyId: number, id: number): Promise<unknown>;
export { applyJoin, updateState, selectJoin, };
