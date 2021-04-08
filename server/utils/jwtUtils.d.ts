export declare const SECRET = "ssaaaaaa-saudhufjksdnkl&&#$53453";
/**
 * @desc 配置jwt
 * @param  {Object} app koa对象
 * @author xxf 2020/7/9 11:13
 */
declare function jwtRouter(app: any): Promise<void>;
/**
* @desc 生成token工具方法
* @param  {string} username 用户名
* @return {string} token
* @author xxf 2020/7/9 13:47
*/
declare function createToken(username: string): any;
export { createToken, jwtRouter, };
