import Router from 'koa-router';
import {Code, Result} from '../../../utils/result';
import {
    loginUser,
    addFriend,
    deleteFriend,
    changeAdd,
    loginOut,
    getFriends,
    selectUser,
    selectUserAndRelation,
    selectUserByCode,
    applyFriendsList, operationBlock,
} from '../../../service/userCenter';
import {getClientType} from '../../../utils/clientTypes';

let router = new Router({
    prefix: '/bs/user',
});


/**
* @desc 登录接口
* @param  {string} username 用户名
* @param  {string} password 密码
* @return {Result}
* @author xxf 2020/7/9 13:24
*/
router.post('/login', async (ctx: any) => {
    let { username, password, clientType } = ctx.request.body;
    clientType = getClientType(clientType);
    let responseData: any = {};
    if (username && password && clientType) {
        await loginUser(username, password, clientType).then((data) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});

/**
* @desc 登出
*/
router.post('/loginOut', async (ctx: any) => {
    let responseData: any = {};
    await loginOut(ctx.state.tid).then((data) => {
        responseData['code'] = 0;
        responseData['data'] = data;
        ctx.body = Result.success(responseData);
    });
});

/**
 * @desc 获取信息, 默认查询自己信息
 */
router.post('/getUser', async (ctx: any) => {
    let {id} = ctx.request.body;
    let responseData: any = {};
    await selectUser(id ? id : ctx.state.id).then((data) => {
        responseData['code'] = 0;
        responseData['data'] = data;
        ctx.body = Result.success(responseData);
    });
});

/**
 * @desc 获取信息, 查询用户信息以及与自己关系
 */
router.post('/getUserAndRelation', async (ctx: any) => {
    let {id} = ctx.request.body;
    let responseData: any = {};
    await selectUserAndRelation(ctx.state.id, Number(id)).then((data) => {
        responseData['code'] = 0;
        responseData['data'] = data;
        ctx.body = Result.success(responseData);
    });
});

/**
 * @desc 获取信息, 默认查询自己信息
 */
router.post('/getUserByCode', async (ctx: any) => {
    let {code} = ctx.request.body;
    let responseData: any = {};
    await selectUserByCode(code).then((data) => {
        responseData['code'] = 0;
        responseData['data'] = data;
        ctx.body = Result.success(responseData);
    });
});

/**
* @desc 添加好友
*/
router.post('/addFriend', async (ctx: any) => {
    let {applyId} = ctx.request.body;
    let responseData: any = {};
    if (applyId) {
        await addFriend(ctx.state.id, Number(applyId)).then((data) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});

/**
 * @desc 删除好友
 */
router.post('/deleteFriend', async (ctx: any) => {
    let {applyId} = ctx.request.body;
    let responseData: any = {};
    if (applyId) {
        await deleteFriend(ctx.state.id, Number(applyId)).then((data) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});

/**
 * @desc 同意添加好友
 */
router.post('/agreeFriend', async (ctx: any) => {
    let {id} = ctx.request.body;
    let responseData: any = {};
    if (id) {
        await changeAdd(ctx.state.id, Number(id), 0).then((data) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});

/**
 * @desc 忽略添加好友
 */
router.post('/ignoreAdd', async (ctx: any) => {
    let {id} = ctx.request.body;
    let responseData: any = {};
    if (id) {
        await changeAdd(ctx.state.id, Number(id), 3).then((data) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});

/**
 * @desc 拒绝添加好友
 */
router.post('/refusedAdd', async (ctx: any) => {
    let {id} = ctx.request.body;
    let responseData: any = {};
    if (id) {
        await changeAdd(ctx.state.id, Number(id), 1).then((data) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});


/**
 * @desc 获取好友列表
 */
router.post('/getFriends', async (ctx: any) => {
    let responseData: any = {};
    await getFriends(ctx.state.id).then((data) => {
        responseData['code'] = 0;
        responseData['data'] = data;
        ctx.body = Result.success(responseData);
    });
});

/**
 * @desc 获取申请好友列表
 */
router.post('/getApplyFriendsList', async (ctx: any) => {
    let responseData: any = {};
    await applyFriendsList(ctx.state.id).then((data: any) => {
        responseData['code'] = 0;
        responseData['data'] = data;
        ctx.body = Result.success(responseData);
    });
});

/**
 * @desc 拉黑
 */
router.post('/block', async (ctx: any) => {
    let responseData: any = {};
    let {id} = ctx.request.body;
    await operationBlock(ctx.state.id, Number(id), true).then((data: any) => {
        responseData['code'] = 0;
        responseData['data'] = data;
        ctx.body = Result.success(responseData);
    });
});

/**
 * @desc 取消拉黑
 */
router.post('/unBlock', async (ctx: any) => {
    let responseData: any = {};
    let {id} = ctx.request.body;
    await operationBlock(ctx.state.id, Number(id), false).then((data: any) => {
        responseData['code'] = 0;
        responseData['data'] = data;
        ctx.body = Result.success(responseData);
    });
});


export default router.routes();


