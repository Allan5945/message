// import React, {memo, useEffect, useState, Profiler, Suspense, lazy, createContext, Component, useCallback, useLayoutEffect} from 'react';
// import { Provider, useSelector, useDispatch } from 'react-redux';
// import store from './store/index';
// import {hot} from 'react-hot-loader/root';
// import './../../public/utils/axios';
// import enus from '../../public/locale/enus';
// import zhcn from '../../public/locale/zhcn';
// import { Button } from 'antd';
//
// // @ts-ignore
// import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';
// // @ts-ignore
//
// function Parent ():JSX.Element {
//     const [lan, setLang] = useState('zh');
//     const [lan1, set1Lang] = useState('hello');
//     const [ls, setLs] = useState({
//         en: enus,
//         zh: zhcn,
//     });
//
//     return (
//         <Provider store={store} >
//             <Button>51545</Button>
//             <IntlProvider locale={lan} messages={zhcn}>
//                 <FormattedMessage
//                     id={lan1}
//                 />
//             </IntlProvider>
//         </Provider>
//     );
// }
//
//
// export default hot(Parent);
//
