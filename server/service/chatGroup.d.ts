/**
 * @desc 发送群
 */
declare function sendGroup(msg: string, sendUserId: number, groupId: number): Promise<unknown>;
export { sendGroup };
