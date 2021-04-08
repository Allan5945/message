import Router from 'koa-router';
import {Code, Result} from '../../../utils/result';
import {sendCode, retrievePassword, updatePas} from '../../../service/retrievePassword';
import {getUserData} from '../../../utils/userUtils';


let router = new Router({
    prefix: '/bs/user/rep',
});

/**
 * @desc 重置密码
 */
router.post('/retrievePassword', async (ctx: any) => {
    let { email, password, repCode } = ctx.request.body;
    let responseData: any = {};
    if (password && email && repCode) {
        await retrievePassword(email, password, repCode).then((data) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});

/**
 * @desc 获取邮箱修改密码验证码
 */
router.post('/repCode', async (ctx: any) => {
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


/**
 * @desc 修改密码
 * @param  {string} password 密码
 * @return {Result}
 * @author xxf 2020/7/9 13:24
 */
router.post('/updatePas', async (ctx: any) => {
    let {password} = ctx.request.body;
    let responseData: any = {};
    if (password) {
        await updatePas(ctx.state.username, password).then((data) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});


export default router.routes();


