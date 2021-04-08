import React, {useEffect, useRef} from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import {hot} from 'react-hot-loader/root';
import './../../public/utils/axios';
require('./css/main.css');
require('../../public/style/css/reset.css');
// eslint-disable-next-line import/no-unresolved
import {getUserMes, initUserMes, getTid} from '../../public/utils/dataCenter/data';
import {initChat} from '../../api/chat';
import store from './store';
import NavigationMenu from './component/navigationMenu';
import ChatView from './component/chatView';
// eslint-disable-next-line import/extensions
import style from './css/message.scss';
import { listenWs } from '../../public/utils/ws/wsUtils';
import {useCallbackState} from '../../public/utils/hooks/useCallbackState';
import {useSubscribe, usePublish, useUnsubscribe} from '../../public/utils/hooks/usePubSub';
import UserMes from './component/userAction/userMes';

function Index () {
    const dispatch = useDispatch();
    const publish = usePublish();
    const unsubscribe = useUnsubscribe();
    const user = useSelector((state: any) => state.user);
    // mesType 0, 文字， 1语言
    const [chatData, setChatData] = useCallbackState({});

    const chatViewRef: any = useRef();

    const initView = function () {
        initChat().then((data: any) => {
            if (data.success) {
                setChatData(data.result.data.data);
            }
        });
    };

    const listen = function (tid: string) {
        listenWs(tid, function (e: any) {
            let mes = JSON.parse(e.data);
            let type = mes.type;
            if (type === 'chat') {
                let data = mes.data;
                if (data) {
                    publish('chat', data);
                }
            } else if (type === 'updateApply') {
                publish('updateApply');
            } else if (type === 'updateFriend') {
                publish('updateFriend');
            } else if (type === 'videoChat') {
                publish('videoChat', mes);
            }
        });
    };

    const updateFri111en11111d = useSubscribe('updateFri111en11111d', function () {
    });

    useEffect(function () {
        let isTo = initUserMes();
        if (isTo) {
            let userMes = getUserMes();
            if (userMes) {
                dispatch({type: 'USERDATA', state: userMes});
                listen(getTid(),);
                initView();
            } else {
                console.log('userMes身份信息失效');
            }
        } else {
            window.location.href = '/page/about';
        }
    }, []);
    useEffect(() => () => {
        unsubscribe(updateFri111en11111d);
    }, [updateFri111en11111d]);


    return (
        <div className={style['mes-container']}>
            {
                user && <>
                    <NavigationMenu chatData={chatData} setChatData={setChatData}/>
                    <ChatView chatViewRef={chatViewRef} chatData={chatData} setChatData={setChatData}/>
                    <UserMes/>
                </>
            }
        </div>
    );
}


export default hot(function () {
    return (
        <Provider store={store}>
            <Index/>
        </Provider>
    );
});

