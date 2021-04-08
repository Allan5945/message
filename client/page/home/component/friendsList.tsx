import React from 'react';
import {useDispatch} from 'react-redux';
// eslint-disable-next-line import/extensions
import style from './../css/sessionList.scss';
import {usePublish} from '../../../public/utils/hooks/usePubSub';

// @ts-ignore

function FriendsList ({friends, pstyle}: any) {

    const dispatch = useDispatch();
    const publish = usePublish();

    const setUser = (data: any) => {
        dispatch({
            type: 'SETCHAT', state: data,
        });
    };

    const viewUser = (id: number) => {
        publish('viewUser', id);
    }
    return (
        <ul className={style['sl-mes-box']} style={pstyle}>
            <li>
                <ul>
                    <li className={style['sl-mes-item-classify']}>朋友</li>
                    {
                        friends.map((data: any, key: any) => (
                            <li className={style['sl-mes-item']} key={key} onClick={() => {
                                setUser(data);
                            }}>
                                <div className={style['sl-mes-item-img']} title={'点击查看信息'} onClick={(e) => {
                                    e.stopPropagation();
                                    viewUser(data.id);
                                }}>
                                    <img src={data.headPortraitUrl}/>
                                </div>
                                <div className={style['sl-mes-item-box']}>
                                    <div className={style['sl-mes-item-name']}>
                                        <div>{data.nickname}</div>
                                    </div>
                                    <div>{data.synopsis}</div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </li>
            <li>
                <ul>
                    <li className={style['sl-mes-item-classify']}>临时会话</li>
                    {/*<li className={style['sl-mes-item']}>*/}
                    {/*    <div className={style['sl-mes-item-img']}>*/}
                    {/*        <img src={require('../static/200.png')}/>*/}
                    {/*    </div>*/}
                    {/*    <div className={style['sl-mes-item-box']}>*/}
                    {/*        <div className={style['sl-mes-item-name']}>*/}
                    {/*            <div>frend</div>*/}
                    {/*        </div>*/}
                    {/*        <div>开心就好</div>*/}
                    {/*    </div>*/}
                    {/*</li>*/}
                </ul>
            </li>
        </ul>
    );
}

export default FriendsList;

