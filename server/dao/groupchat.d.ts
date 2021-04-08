/**
 * @desc 发送消息
 */
declare function sendMes(mes: string, sendUserId: number, receiveGroupId: number, createDate: string): Promise<unknown>;
export { sendMes, };
