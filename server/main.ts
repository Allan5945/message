import path from 'path';
import fs from 'fs';
import Koa from 'koa';
import https from 'https';
import bodyParser = require('koa-body');
// @ts-ignore
// import logger from 'koa-logger';
import koaStatic from 'koa-static';
import koaViews from 'koa-views';
const rootPath = require('app-root-path');
import useRouter from './router/index';
import wsp from './proxy/proxy';
import rearFilter from './filter/rearFilter';
import preFilter from './filter/preFilter';
import {createWs} from './ws';
import {jwtRouter} from './utils/jwtUtils';
import {startTime, endTime} from './utils/startTime';
startTime();
// 实例化koa框架
const app = new Koa();
// 端口
const port: number = 80;

// 配置post处理器
app.use(bodyParser(
    {
        multipart: true,
        formidable: {
            maxFieldsSize: 10485760,
            multiples: true,
        },
    }
));

// 前置拦截器
app.use(preFilter);

// 静态资源配置
app.use(koaStatic(path.join(rootPath.path, 'dist/static/')));
app.use(koaStatic(path.join(rootPath.path, 'static')));

// 视图配置
app.use(koaViews(path.join(rootPath.path, 'dist/static/views'), { map: { html: 'ejs' } }));

// 认证
jwtRouter(app).then(() => {
    console.log('jwt 启动');
});

// // 页面路由
useRouter(app).then(() => {
    // 请求转发器
    app.use(wsp);
    // 后置拦截器
    const server = app.listen(port);
    // @ts-ignore
    // const server = https.createServer(options, app);
    createWs(server);
    endTime();
});
app.use(rearFilter);

