import React from 'react';
// @ts-ignore
import * as loadable from '@loadable/component';
const Index = loadable['default'](() => import('./../../client/page/home/index'));
const Show = loadable['default'](() => import('./../../client/page/about/index'));
const Login = loadable['default'](() => import('./../../client/page/login/index'));

/**
* @desc 路由数据
*/
interface PageData {
    prefix: string, // 前缀地址
    url: string, // 路由地址
    page: string, // 页面名称
    pageComponent: any, // 入口组件
}

/**
 * @desc 页面路由接口
 */
interface PageMes {
   [key: string]: PageData
}

/**
 * @desc 页面地址数据
 */
const pageData: PageMes = {
    home: {
        prefix: '/page',
        url: '/home',
        page: 'home',
        pageComponent: Index,
    },
    about: {
        prefix: '/page',
        url: '/about',
        page: 'about',
        pageComponent: Show,
    },
    login: {
        prefix: '/page',
        url: '/login',
        page: 'login',
        pageComponent: Login,
    },
};


export default pageData;
