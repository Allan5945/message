import Router from 'koa-router';
import {Code, Result} from '../../../utils/result';
import {sendCode, registeredUser} from '../../../service/registered';

let router = new Router({
    prefix: '/bs/user/reg',
});

/**
 * @desc 注册接口
 * @param  {string} username 用户名
 * @param  {string} password 密码
 * @param  {string} email 邮箱
 * @return {Result}
 * @author xxf 2020/7/9 13:24
 */
router.post('/registered', async (ctx: any) => {
    let { username, password, email, emailCode } = ctx.request.body;
    let responseData: any = {};
    if (username && password && email && emailCode) {
        await registeredUser(username, password, email, emailCode).then((data) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});

/**
* @desc 获取注册邮箱验证码
*/
router.post('/emailCode', async (ctx: any) => {
    let { email } = ctx.request.body;
    let responseData: any = {};
    if (email) {
        await sendCode(email).then((data) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});


export default router.routes();


