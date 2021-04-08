import Router from 'koa-router';

import {Code, Result} from '../../../utils/result';
import {
    sendUser,
    getMes,
    initChatService,
    addNearestContactService,
    viewMesService,
    deleteNearestContactService,
    videoChatService,
} from '../../../service/chat';

let router = new Router({
    prefix: '/bs/chat',
});


/**
 * @desc 发送消息
 */
router.post('/send', async (ctx: any) => {
    let {msg, receiveId, mesType} = ctx.request.body;
    const {blob} = ctx.request.files;
    let responseData: any = {};
    if (msg && receiveId) {
        mesType = Number(mesType);
        await sendUser(mesType === 0 ? msg : blob, ctx.state.id, ctx.state.username, Number(receiveId), Number(mesType)).then((data) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});

router.post('/getMesById', async (ctx: any) => {
    let {receiveId, pageIndex, listCount} = ctx.request.body;
    let responseData: any = {};
    if (pageIndex) {
        pageIndex = Number(pageIndex);
    } else {
        pageIndex = null;
    }
    if (listCount) {
        listCount = Number(listCount);
    } else {
        listCount = null;
    }
    if (receiveId) {
        await getMes(ctx.state.id, Number(receiveId), pageIndex && pageIndex, listCount && listCount).then((data: any) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});

router.post('/initChat', async (ctx: any) => {
    let responseData: any = {};
    await initChatService(ctx.state.id).then((data: any) => {
        responseData['code'] = 0;
        responseData['data'] = data;
        ctx.body = Result.success(responseData);
    });
});


/**
* @desc 添加联系人
*/
router.post('/addNearestContact', async (ctx: any) => {
    let {contactId} = ctx.request.body;
    let responseData: any = {};
    if (contactId) {
        await addNearestContactService(ctx.state.id, Number(contactId)).then((data: any) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});
router.post('/deleteNearestContact', async (ctx: any) => {
    let {id} = ctx.request.body;
    let responseData: any = {};
    if (id) {
        await deleteNearestContactService(ctx.state.id, Number(id)).then((data: any) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});

/**
 * @desc 查看消息
 */
router.post('/viewMes', async (ctx: any) => {
    let {sendId} = ctx.request.body;
    let responseData: any = {};
    if (sendId) {
        await viewMesService(ctx.state.id, Number(sendId)).then((data: any) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});

/**
 * @desc 查看消息
 */
router.post('/videoChat', async (ctx: any) => {
    let {sendId, step, acceptId, con} = ctx.request.body;
    let responseData: any = {};
    if (sendId && step && acceptId) {
        sendId = Number(sendId);
        acceptId = Number(acceptId);
        await videoChatService(ctx.state.id, sendId === ctx.state.id ? acceptId : sendId, Number(step), con).then((data: any) => {
            responseData['code'] = 0;
            responseData['data'] = data;
            ctx.body = Result.success(responseData);
        });
    } else {
        ctx.body = Result.fail(null, Code.A0400);
    }
});

export default router.routes();


