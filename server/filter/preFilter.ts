import {getUser} from '../dao/redisCache';


/**
 * @desc 描述
 * @param  {Object} ctx ctx全局对象
 * @param  {function} next 下执行
 * @return {void} 无返回值
 * @author 2020/5/25 16:48
 */
async function preFilter (ctx: any, next: any) {
    let tid = null;
    try {
        const devTid = ctx.req.headers['tid'];
        if (devTid) {
            tid = devTid;
        } else {
            let cookies = ctx.req.headers['cookie'];
            if (cookies) {
                let cookie = ctx.req.headers['cookie'].split(';');
                if (cookie && cookie.length > 0) {
                    cookie.forEach((ci: string) => {
                        let c = ci.split('=');
                        if (c && c.length > 0) {
                            if (c[0] === 'tid') {
                                tid = c[1];
                            }
                        }
                    });
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
    if (tid) {
        let data = await getUser(tid);
        if (data) {
            let {token, clientType, username, id} = data;
            ctx.req.headers['authorization'] = `Bearer ${data.token}`;
            ctx.state.tid = tid;
            ctx.state.token = token;
            ctx.state.clientType = clientType;
            ctx.state.username = username;
            ctx.state.id = id;
        }
    }
    return next().catch((err: any) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = '无权限访问!';
        } else {
            throw err;
        }
    });
}

export default preFilter;
