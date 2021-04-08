/**
 * @desc 描述
 * @param  {Object} ctx ctx全局对象
 * @param  {function} next 下执行
 * @return {void} 无返回值
 * @author 2020/5/25 16:48
 */
declare function preFilter(ctx: any, next: any): Promise<any>;
export default preFilter;
