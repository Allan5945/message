/**
 * @desc 检测账号存在与否
 * @param  {string} account 用户名
 * @param  {string} password 用户密码
 * @return {Promise} 结果回调
 * @author xxf 2020/7/7 16:49
 */
declare function login(account: string, password: string): Promise<unknown>;
export { login };
