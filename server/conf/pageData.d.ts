/**
* @desc 路由数据
*/
interface PageData {
    prefix: string;
    url: string;
    page: string;
    pageComponent: any;
}
/**
 * @desc 页面路由接口
 */
interface PageMes {
    [key: string]: PageData;
}
/**
 * @desc 页面地址数据
 */
declare const pageData: PageMes;
export default pageData;
