// 全局代理请求配置
// 通过不同的环境变量对应不同的环境代理地址
// 特殊的代理地址需要手动配置，比如资源服务器

export interface ProxyConf {
    url: string,
    to: string,
    go: string,
    pathRewrite ?: any,
    onProxyReq ?: any,
    onProxyRes ?: any,
}
// const testV1 = proxy('/ssurl', {
//     target: 'http://192.168.10.161:8080',
//     ws: true,
//     pathRewrite: { '^/ssurl': '' },
//     changeOrigin: true,
//     onProxyReq (proxyReq, req, res) {
//         // 机场
//         // proxyReq.setHeader('Cookie', 'JSESSIONID=AF039D17C8955D8A600CCE5BC3BB995E');
//         // 航司
//         proxyReq.setHeader('Cookie', 'JSESSIONID=3125318983B7B57C3C777D755AEBD438');
//     }
// });

// 系统环境获取
const env: string = process.env.NODE_ENV_CODE ? process.env.NODE_ENV_CODE : 'LOCAL';
// 代理地址
const url: string = process.env.NODE_ENV_URL ? process.env.NODE_ENV_URL : '';
if (url && env) {
    console.log(`运行环境为：${env}`);
    console.log(`代理地址为：${url}`);
} else {
    console.log('运行环境参数错误或者代理地址错误');
    process.exit(1);
}

const conf: ProxyConf[] = [
    {
        url: 'http://localhost',
        to: '/bs',
        go: null,
        pathRewrite: null,

    },
    {
        url: 'http://localhost',
        to: '/images',
        go: null,
        pathRewrite: null,
    },
];
export {conf, env};

