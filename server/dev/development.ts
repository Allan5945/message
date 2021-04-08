import path from 'path';
import rootPath from 'app-root-path';
// @ts-ignore
import koaWebpack from 'koa-webpack';
import webpack from 'webpack';
// @ts-ignore
import HtmlWebpackPlugin from 'html-webpack-plugin';
// @ts-ignore
import config from '../../conf/webpack.dev.conf';
import pageData from '../conf/pageData';

async function development (app: any) {
    let page = process.argv[process.argv.length - 1];
    let pageNames = [];
    if (page.includes('=')) {
        pageNames = page.split('=')[1].split(',');
    } else {
        for (let [key] of Object.entries(pageData)) {
            pageNames.push(key);
        }
    }
    pageNames.forEach((k: any) => {
        if (pageData.hasOwnProperty(k)) {
            let pageItem = pageData[k];
            let pur = `./client/page/${k}/main.tsx`;
            config.entry[pageItem.page] = [pur];
            config.plugins.push(
                new HtmlWebpackPlugin({
                    root: '<%- root %>',
                    template: path.join(rootPath.path, `/client/page/${pageItem.page}/index.html`),
                    chunksSortMode: 'none',
                    filename: `${pageItem.page}.html`,
                    chunks: [`${pageItem.page}`]}
                )
            );
        }
    });
    const compiler = webpack(config);
    try {
        const middleware = await koaWebpack({
            compiler,
        });
        app.use(middleware);
        app.use(async (ctx: any, next: any) => {
            for (let key of Object.keys(pageData)) {
                let value = pageData[key];
                try {
                    if (ctx.request.url.startsWith(`${value.prefix}${value.url}`)) {
                        let pageUrl = path.join(rootPath.path, `dist/${value.page}.html`);
                        let file = middleware.devMiddleware.fileSystem.readFileSync(pageUrl, 'utf-8');
                        ctx.body = file.toString();
                    }
                } catch (e) {
                    await next();
                }
            }
        });
    } catch (e) {
        console.log(e);
    }
}

export default development;

