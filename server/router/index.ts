// @ts-ignore
import Router from 'koa-router';
const router = new Router();
import {env} from '../conf/proxyConf';
import usercenter from './business/usercenter/usercenter';
import registered from './business/usercenter/registered';
import retrievePassword from './business/usercenter/retrievePassword';
import group from './business/group/group';
import chat from './business/chat/chat';
import chatGroup from './business/chat/chatGroup';
import headPortrait from './business/files/headPortrait';

async function useRouter (app: any) {
    if (env === 'LOCAL') {
        require('./../dev/development')['default'](app);
    } else {
        router.use(require('./pageRouter/pageRouter')['default']);

    }
    router.use(usercenter);
    router.use(group);
    router.use(chat);
    router.use(chatGroup);
    router.use(registered);
    router.use(retrievePassword);
    router.use(headPortrait);
    app.use(router.routes()).use(router.allowedMethods());
}
export default useRouter;
