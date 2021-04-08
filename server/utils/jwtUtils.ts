// @ts-ignore
import jwt from 'jsonwebtoken';
import koajwt from 'koa-jwt';
export const SECRET = 'ssaaaaaa-saudhufjksdnkl&&#$53453';
const time = '2592000s';


/**
 * @desc 配置jwt
 * @param  {Object} app koa对象
 * @author xxf 2020/7/9 11:13
 */
async function jwtRouter (app: any) {
    app.use(koajwt({ secret: SECRET }).unless({
        // path: [/^\/bs*/]
        path: [/^\/*/]
    }));
}

/**
* @desc 生成token工具方法
* @param  {string} username 用户名
* @return {string} token
* @author xxf 2020/7/9 13:47
*/
function createToken (username: string) {
    return jwt.sign(
        { name: username},
        SECRET,
        { expiresIn: time }
    );
}

export {
    createToken,
    jwtRouter,
};
