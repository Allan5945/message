export interface ProxyConf {
    url: string;
    to: string;
    go: string;
    pathRewrite?: any;
    onProxyReq?: any;
    onProxyRes?: any;
}
declare const env: string;
declare const conf: ProxyConf[];
export { conf, env };
