import Router from 'koa-router';

let router = new Router({
    prefix: '/',
});
router.get('/', async (ctx: any) => {
    await ctx.render('index');
});


export default router.routes();
