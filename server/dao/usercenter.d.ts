/**
* @desc 登录
*/
declare function login(username?: string, password?: string): Promise<unknown>;
/**
 * @desc 创建用户
 */
declare function createUser(username?: string, password?: string, email?: string, createDate?: string): Promise<unknown>;
/**
 * @desc 查看用户名是否存在
 */
declare function queryUserName(username: string): Promise<unknown>;
/**
 * @desc 通过id查询用户
 */
declare function queryUserById(id: number): Promise<unknown>;
/**
 * @desc 通过id数组查询用户
 */
declare function queryUserByIds(ids: any): Promise<unknown>;
/**
 * @desc 修改密码
 */
declare function changePas(password: string, username: string): Promise<unknown>;
/**
 * @desc 修改邮箱
 */
declare function changeEmail(email: string, username: string): Promise<unknown>;
/**
 * @desc 添加/删除好友
 */
declare function updateFrends(id: number, frends: string): Promise<unknown>;
/**
 * @desc 添加/删除黑名单
 */
declare function updateBlackList(id: number, blackList: string): Promise<unknown>;
/**
 * @desc 获取好友列表
 */
declare function getFriendsDao(ids: any): Promise<unknown>;
export { login, createUser, queryUserName, changePas, changeEmail, queryUserById, queryUserByIds, updateFrends, updateBlackList, getFriendsDao, };
