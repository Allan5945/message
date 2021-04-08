/**
 * @desc 发送消息
 */
declare function sendMes(mes: string, sendUserId: number, receiveUserId: number, createDate: string): Promise<unknown>;
/**
 * @desc 消息已经到达
 */
declare function arriveMes(id: number, receiveDate: string): Promise<unknown>;
/**
 * @desc 查看消息
 */
declare function viewMes(id: number, receiveDate: string): Promise<unknown>;
/**
* @desc 获取消息
*/
declare function getAllMes(id: number): Promise<unknown>;
export { sendMes, arriveMes, viewMes, getAllMes, };
