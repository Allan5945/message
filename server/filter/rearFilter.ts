/**
* @desc 描述
* @param  {Object} ctx ctx全局对象
* @param  {function} next 下执行
* @return {void} 无返回值
* @author xxf 2020/5/25 16:48
*/
async function filter (ctx: any, next: any) {
    if (ctx.request.url === '/') {
        await ctx.response.redirect('/page/home');
        return false;
    }
    await next();
}

export default filter;
