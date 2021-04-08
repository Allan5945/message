import React, {memo, useEffect, useState, Profiler, Suspense, lazy, createContext, Component, useCallback, useLayoutEffect} from 'react';
import { Provider } from 'react-redux';
import {initUserMes} from '../../public/utils/dataCenter/data';
import store from './store/index';
import {hot} from 'react-hot-loader/root';
import './../../public/utils/axios';
require('./css/main.css');
require('../../public/style/css/reset.css');
const style = require('./css/about.scss');

import Login from './component/login';
import Registered from './component/registered';
import RetrievePassword from './component/retrievePassword';

function Parent ():JSX.Element {

    const [step, setStep] = useState(0); // 0、 登录， 1、注册，2、找回密码

    useEffect(() => {
        initUserMes() && (location.href = '/page/home');
    }, []);

    const renderStep = function (step: number) {
        switch (step) {
            case 0:
                return <Login setStep={setStep}/>;
            case 1:
                return <Registered setStep={setStep}/>;
            case 2:
                return <RetrievePassword setStep={setStep}/>;
            default:
                return <Login setStep={setStep}/>;
        }
    };

    return (
        <Provider store={store}>
            <div className={style['box-content']}>
                <div className={style['box']}>
                    {
                        renderStep(step)
                    }
                </div>
            </div>
        </Provider>
    );
}

export default hot(Parent);


