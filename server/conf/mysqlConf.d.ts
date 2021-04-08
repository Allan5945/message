/**
* @desc 描述
* @param  {string} sql sql
* @param  {Array} data 参数
* @return {Index} sasa
* @author xxf 2020/7/8 15:56
*/
declare function execute(sql: string, data: Array<any>): Promise<unknown>;
export { execute };
