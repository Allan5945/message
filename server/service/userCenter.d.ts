import { ClientType } from '../utils/clientTypes';
/**
* @desc 登录
*/
declare function loginUser(username: string, password: string, clientType: ClientType): Promise<unknown>;
/**
 * @desc 登出
 */
declare function loginOut(tid: string): Promise<unknown>;
/**
 * @desc 注册
 */
declare function registeredUser(username: string, password: string, email: string, createDate: string): Promise<unknown>;
/**
 * @desc 修改密码
 */
declare function updatePas(username: string, password: string): Promise<unknown>;
/**
* @desc 申请添加好友
*/
declare function addFriend(userId: number, applyId: number): Promise<unknown>;
/**
* @desc 修改添加好友状态
*/
declare function changeAdd(applyId: number, id: number, state: number): Promise<unknown>;
/**
 * @desc 删除好友
 */
declare function deleteFriend(userId: number, applyId: number): Promise<unknown>;
/**
* @desc 获取好友列表
*/
declare function getFriends(ids: string): Promise<unknown>;
export { loginUser, registeredUser, updatePas, addFriend, deleteFriend, changeAdd, loginOut, getFriends, };
