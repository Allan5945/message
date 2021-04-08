import React, {useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/extensions
import style from './../css/navigationMenu.scss';
import {Menu, Dropdown, Tooltip} from 'antd';
// @ts-ignore
import classnames from 'classnames';
// eslint-disable-next-line import/no-unresolved
import ListBox from './listBox';
import FindContainer from './seek/findContainer';

const menu = (
    <Menu>
        <Menu.Item className={style['nm-head-icon-state']}>
            <span className={classnames({'iconfont': true, [style['nm-head-icon']]: true})}>&#xe611;</span>
            &nbsp;在线
        </Menu.Item>
        <Menu.Item className={style['nm-head-icon-state']}>
            <span className={classnames({'iconfont': true, [style['nm-head-icon']]: true})}>&#xe611;</span>&nbsp;隐身
        </Menu.Item>
        <Menu.Item className={style['nm-head-icon-state']}>
            <span className={classnames({'iconfont': true, [style['nm-head-icon']]: true})}>&#xe611;</span>
            &nbsp;离开
        </Menu.Item>
    </Menu>
);

function NavigationMenu ({chatData, setChatData, applyFriendsList}: any) {
    const childRef: any = useRef();
    const user = useSelector((state: any) => state.user);

    return (
        <div className={style['nm-box']}>
            <ul className={style['nm-head-operation']}>
                <Tooltip
                    title="设置"
                    color={'blue'}
                >
                    <li className={classnames({'iconfont': true, [style['nm-head-operation-icon']]: true})}>&#xe606;</li>
                </Tooltip>
                <Tooltip
                    title="添加好友/创建群聊"
                    color={'blue'}
                >
                    <li onClick={() => {childRef.current.openFindContainer();}} className={classnames({'iconfont': true, [style['nm-head-operation-icon']]: true})}>&#xe60d;</li>
                </Tooltip>
            </ul>
            <FindContainer cRef={childRef}/>
            <div className={style['nm-head']}>
                <div className={style['nm-head-img']}>
                    <img src={user.headPortraitUrl}/>
                </div>
                <div>
                    <div className={style['nm-head-name']}>{user.nickname}</div>
                    <Dropdown overlay={menu} placement="bottomLeft">
                        <div className={style['nm-head-state']}>
                            <span className={classnames({'iconfont': true, [style['nm-head-icon']]: true})}>&#xe611;</span>
                            <span>&nbsp;在线</span>
                        </div>
                    </Dropdown>
                </div>
            </div>
            <ListBox chatData={chatData} setChatData={setChatData} applyFriendsList={applyFriendsList}/>
        </div>
    );
}


export default NavigationMenu;

