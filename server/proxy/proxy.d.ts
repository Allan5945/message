/**
 * @desc 代理请求
 * @param {object} ctx koa全局对象
 * @param {object} next koa全局对象
 * @author xxf
 * @return {void}
 * */
declare function wsp(ctx: any, next: any): Promise<boolean>;
export default wsp;
