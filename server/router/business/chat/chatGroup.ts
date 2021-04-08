import Router from 'koa-router';
import {Code, Result} from '../../../utils/result';
import {sendGroup} from '../../../service/chatGroup';
import {getUserData} from '../../../utils/userUtils';

let router = new Router({
    prefix: '/bs/chatGroup',
});

/**
 * @desc 发送群消息
 */
router.post('/sendGroup', async (ctx: any) => {
    let {msg, groupId} = ctx.request.body;
    let responseData: any = {};
    if (msg && groupId) {
        await sendGroup(msg, ctx.state.id, groupId).then((data) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});


export default router.routes();


