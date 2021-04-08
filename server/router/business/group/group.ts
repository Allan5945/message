import Router from 'koa-router';
import {Code, Result} from '../../../utils/result';
import {createGroup, joinGroup, exitGroup} from '../../../service/group';
import {getUserData} from '../../../utils/userUtils';

let router = new Router({
    prefix: '/bs/group',
});


/**
 * @desc 创建群组
 */
router.post('/createGroup', async (ctx: any) => {
    let { groupName } = ctx.request.body;
    let responseData: any = {};
    if (groupName) {
        await createGroup(groupName, `${ctx.state.id}`, 1, 1, ctx.state.id, '').then((data) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});


/**
 * @desc 删除群组
 */
router.post('/deleteGroup', async (ctx: any) => {

});

/**
 * @desc 修改群名称
 */
router.post('/updateName', async (ctx: any) => {

});


/**
 * @desc 加入群组
 */
router.post('/joinGroup', async (ctx: any) => {
    let { groupId } = ctx.request.body;
    let responseData: any = {};
    if (groupId) {
        await joinGroup(ctx.state.id, groupId).then((data) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});


/**
 * @desc 退出群组
 */
router.post('/exitGroup', async (ctx: any) => {
    let { groupId } = ctx.request.body;
    let responseData: any = {};
    if (groupId) {
        await exitGroup(ctx.state.id, groupId).then((data) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});

/**
 * @desc 转让群
 */
router.post('/transferGroup', async (ctx: any) => {

});

/**
 * @desc 设置/移除管理员
 */
router.post('/setGroupAdmin', async (ctx: any) => {

});


export default router.routes();


