import Router from 'koa-router';
import {Code, Result} from '../../../utils/result';
import {updateHeadPortrait} from '../../../service/headPortraitService';

let router = new Router({
    prefix: '/bs/file',
});
router.post('/hp', async (ctx: any) => {
    const file = ctx.request.files.file;
    let responseData: any = {};
    if (file) {
        const id = ctx.state.id;
        await updateHeadPortrait(id, ctx).then((data: any) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});
export default router.routes();


