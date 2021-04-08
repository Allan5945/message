import React, {memo, useEffect, useState, Profiler, Suspense, lazy, createContext, Component, useCallback, useLayoutEffect} from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store/index';
import {hot} from 'react-hot-loader/root';
import './../../public/utils/axios';


function Parent ():JSX.Element {
    return (
        <Provider store={store}>
            <div>login</div>
        </Provider>
    );
}


export default hot(Parent);

// /api/v1/login
