// @ts-ignore
import k2c from 'koa2-connect';
// @ts-ignore
import proxy from 'http-proxy-middleware';
import {conf, ProxyConf} from '../conf/proxyConf';


const confProxy: any = conf.map((key: ProxyConf) => ({
    proxy: proxy(key.to, {
        target: key.url,
        ws: true,
        changeOrigin: true,
        ...key.onProxyReq && {onProxyReq: key.onProxyReq},
        ...key.pathRewrite && {pathRewrite: key.pathRewrite},
    }),
    conf: key,
}));

/**
 * @desc 代理请求
 * @param {object} ctx koa全局对象
 * @param {object} next koa全局对象
 * @author xxf
 * @return {void}
 * */
async function wsp (ctx: any, next: any) {
    for (let i = 0; i < confProxy.length; i++) {
        if (ctx.url.startsWith(confProxy[i].conf.to)) {
            ctx.respond = false;
            await k2c(confProxy[i].proxy)(ctx, next);
            return false;
        }
    }
    await next();
}

export default wsp;
