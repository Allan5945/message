import React, {useEffect} from 'react';
// eslint-disable-next-line import/extensions
import style from './../css/sessionList.scss';
// @ts-ignore
import { Scrollbars } from 'react-custom-scrollbars';
// @ts-ignore
import classnames from 'classnames';
import {useCallbackState} from '../../../public/utils/hooks/useCallbackState';
import ChatList from './chatList';
import FriendsList from './friendsList';
import {getFriends} from '../../../api/userCenter';
import {useSubscribe, useUnsubscribe} from '../../../public/utils/hooks/usePubSub';

function ListBox ({chatData, setChatData, applyFriendsList}: any) {
    const [selectMenu, setSelectMenu] = useCallbackState(true);
    const [friends, setFriends] = useCallbackState([]);
    const unsubscribe = useUnsubscribe();
    /**
    * @desc 切换栏
    */
    const changeMenu = (item: boolean) => {
        setSelectMenu(item);
    };
    const updateFriend = () => {
        getFriends().then((data: any) => {
            if (data.success) {
                setFriends(data.result.data.data);
            }
        });
    };
    useEffect(() => {
        updateFriend();
    }, []);

    const adf = useSubscribe('updateFriend', updateFriend);
    useEffect(() => () => {
        unsubscribe(adf);
    }, [adf]);
    return (
        <div className={style['sl-box']}>
            <div className={style['sl-menu']}>
                <div onClick={() => {changeMenu(true);}} className={classnames({[style['sl-menu-select']]: selectMenu})}>消息</div>
                <div onClick={() => {changeMenu(false);}} className={classnames({[style['sl-menu-select']]: !selectMenu})}>联系人</div>
            </div>
            <div className={style['sl-mes-box-scroll']}>
                <Scrollbars
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <ChatList chatData={chatData} setChatData={setChatData} applyFriendsList={applyFriendsList} pstyle={{display: !selectMenu ? 'none' : 'block'}}/>
                    <FriendsList friends={friends} pstyle={{display: selectMenu ? 'none' : 'block'}}/>
                    {/*{*/}
                    {/*    selectMenu ? <ChatList chatData={chatData} setChatData={setChatData} applyFriendsList={applyFriendsList}/> : <FriendsList friends={friends}/>*/}
                    {/*}*/}
                </Scrollbars>
            </div>
        </div>
    );
}


export default ListBox;

