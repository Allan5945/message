import Router from 'koa-router';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import pageData from '../../conf/pageData';

const router = new Router({
    prefix: '/page',
});

for (let key of Object.keys(pageData)) {
    let pageObject = pageData[key];
    router.get(`${pageObject.url}`, async (ctx: any) => {
        const Index = pageObject.pageComponent;
        await ctx.render(pageObject.page, { root: renderToStaticMarkup(
            <Index data={'sasa'}/>
        )});
    });
}

export default router.routes();
