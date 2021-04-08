import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
// @ts-ignore
import classnames from 'classnames';
// eslint-disable-next-line import/extensions
import style from './../css/sessionList.scss';
// @ts-ignore
import {Badge, Button} from 'antd';
import {ignoreAdd, agreeFriend, refusedAdd, getApplyFriendsList} from '../../../api/userCenter';
import {useCallbackState} from '../../../public/utils/hooks/useCallbackState';
import {usePublish, useSubscribe, useUnsubscribe} from '../../../public/utils/hooks/usePubSub';
import {deleteNearestContact} from '../../../api/chat';

function ChatList ({chatData, setChatData, pstyle}: any) {
    // 申请好友列表
    const [applyFriendsList, setApplyFriendsList] = useCallbackState([]);
    const unsubscribe = useUnsubscribe();
    const dispatch = useDispatch();
    const publish = usePublish();

    const setUser = (data: any) => {
        dispatch({
            type: 'SETCHAT', state: data,
        });
    };

    const removeChat = (id: number) => {
        deleteNearestContact(id).then((data: any) => {
            if (data.success && data.result.data.type === 0) {
                delete chatData[id];
                setChatData({...chatData});
            }
        });
    };
    const afl = () => {
        getApplyFriendsList().then((data: any) => {
            if (data.success && data.result.data.type === 0) {
                setApplyFriendsList(data.result.data.data);
            }
        });
    };

    const formatting = (data: any): any => {
        let list = [];
        // eslint-disable-next-line guard-for-in
        for (let key in data) {
            // eslint-disable-next-line camelcase
            let {nickname, synopsis, headPortraitUrl, count, id} = data[key];
            list.push(
                <li className={style['sl-mes-item']} key={key} onClick={() => {
                    setUser(data[key]);
                }}>
                    <div className={style['sl-mes-item-img']}>
                        {/* eslint-disable-next-line camelcase */}
                        <img src={headPortraitUrl} onClick={(e) => {
                            e.stopPropagation();
                            viewUser(id);
                        }}/>
                    </div>
                    <div className={style['sl-mes-item-box']}>
                        <div className={style['sl-mes-item-name']}>
                            <div>{nickname}</div>
                            <Badge count={count}/>
                        </div>
                        <div>{synopsis}</div>
                    </div>
                    <span className={classnames({'iconfont': true, [style['sl-none']]: true})} title={'移除'} onClick={(e) => {
                        e.stopPropagation();
                        removeChat(id);
                    }}>&#xe609;</span>
                </li>
            );
        }
        return list;
    };
    const dealWith = (type: number, id: number) => {
        switch (type) {
            case 0:
                agreeFriend(id);
                break;
            case 1:
                refusedAdd(id).then((data: any) => {
                    console.log(data);
                    if (data.success && data.result.data.type === 0) {
                        afl();
                    }
                });
                break;
            case 2:
                ignoreAdd(id).then((data: any) => {
                    if (data.success && data.result.data.type === 0) {
                        afl();
                    }
                });
                break;
            default:
        }
    };
    const viewUser = (id: number) => {
        publish('viewUser', id);
    };
    const uda = useSubscribe('updateApply', afl);
    useEffect(function () {
        afl();
    }, []);
    useEffect(() => () => {
        unsubscribe(uda);
    }, [uda]);

    return (
        <ul className={style['sl-mes-box']} style={pstyle}>
            {
                applyFriendsList.map((data: any, key: number) => (
                    <li className={style['sl-mes-item1']} key={key}>
                        <div className={style['sl-mes-item-img']}>
                            <img src={require('../static/ts.png')}/>
                        </div>
                        <div className={style['sl-mes-item-box']}>
                            <div className={style['sl-mes-item-name']}>
                                <div className={style['sl-mes-item-img1-c']}>
                                    <div className={style['sl-mes-item-img1']}>
                                        <img className={style['']} src={data.headPortraitUrl} alt="" onClick={(e) => {
                                            e.stopPropagation();
                                            viewUser(data.id);
                                        }}/>
                                    </div>
                                    <span><a>{data.nickname}</a> &nbsp;&nbsp;添加了你</span>
                                </div>
                                <Badge count={1}/>
                            </div>
                            <div>
                                <Button type="primary" size={'small'} onClick={() => {dealWith(0, data.id);}}>确定</Button>
                                <Button size={'small'} danger style={{marginLeft: '5px'}} onClick={() => {dealWith(1, data.id);}}>拒绝</Button>
                                <Button size={'small'} style={{marginLeft: '5px'}} onClick={() => {dealWith(2, data.id);}}>忽略</Button>
                            </div>
                        </div>
                    </li>
                ))
            }
            {
                formatting(chatData)
            }
        </ul>
    );
}


export default ChatList;

