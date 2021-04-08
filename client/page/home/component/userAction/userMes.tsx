import React, {useEffect} from 'react';
import {Modal, Button, Avatar, Switch, message } from 'antd';
import {useCallbackState} from '../../../../public/utils/hooks/useCallbackState';
import {usePublish, useSubscribe, useUnsubscribe} from '../../../../public/utils/hooks/usePubSub';
// eslint-disable-next-line import/extensions
import stl from '../../css/find.scss';
import {getUserAndRelation, block, unBlock, deleteFriend, addFriend} from '../../../../api/userCenter';

function UserMes () {
    const unsubscribe = useUnsubscribe();
    const publish = usePublish();
    const [visibleContainer, setVisibleContainer] = useCallbackState(false);
    const [user, setUser] = useCallbackState({
        headPortraitUrl: null,
        id: null,
        synopsis: null,
        nickname: null,
        isBlack: false,
        isFriend: null,
    });


    const change = (type: any, id: number) => {
        if (type) {
            block(id).then((data: any) => {
                console.log(data);
                if (data.success && data.result.data.type === 0) {
                    setUser({...user, ...{
                        isBlack: type,
                    }});
                }
            });
        } else {
            unBlock(id).then((data: any) => {
                if (data.success && data.result.data.type === 0) {
                    setUser({...user, ...{
                        isBlack: type,
                    }});
                }
            });
        }
    };
    const addF = (id: number) => {
        addFriend(id).then((data: any) => {
            if (data.success) {
                let type = data.result.data.type;
                if (type === 0) {
                    setVisibleContainer(false, function () {
                        publish('addFriend603');
                    });
                } else if (type === 1) {
                    message.error('申请失败');
                } else if (type === 3) {
                    message.error('已经是好友了');
                } else if (type === 4) {
                    message.error('已经申请过,请勿重复申请');
                }
            }
        });
    }

    const delFriend = (id: number) => {
        deleteFriend(id).then(() => {
            setUser({...user, ...{
                isFriend: false,
            }});
            setVisibleContainer(false);
        });
    };
    const viewUser = useSubscribe('viewUser', (msg: string, id: any) => {
        getUserAndRelation(id).then((data: any) => {
            if (data.success && data.result.data.type === 0) {
                let {headPortraitUrl, isBlack, isFriend, nickname, synopsis, id} = data.result.data.data;
                setUser({
                    headPortraitUrl,
                    id,
                    synopsis,
                    nickname,
                    isBlack,
                    isFriend,
                }, function () {
                    setVisibleContainer(true);
                });
            }
        });
    });
    useEffect(() => () => {
        unsubscribe(viewUser);
    }, [viewUser]);
    return (
        <Modal
            footer={null}
            visible={visibleContainer}
            onCancel={() => {setVisibleContainer(false);}}
        >
            <div className={stl['find-step-container']}>
                <div className={stl['find-step-information']}>
                    <Avatar size={80} src={user.headPortraitUrl} />
                    <div className={stl['find-step-information-name']}>{user.nickname}</div>
                    <p className={stl['find-step-information-abstract']}>{user.synopsis}</p>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <span className={'iconfont'} style={{fontSize: '35px'}}>&#xe612;</span>
                    <span>屏蔽：</span>
                    <Switch
                        size={'default'}
                        checkedChildren="打开"
                        unCheckedChildren="关闭"
                        checked={user.isBlack}
                        onChange={(type) => {change(type, user.id);}}
                    />
                </div>
                <div className={stl['user-mes-operation-box']}>
                    {
                        user.isFriend ? <Button onClick={() => {delFriend(user.id);}}>删除好友</Button> : <Button onClick={() => {addF(user.id);}}>添加好友</Button>
                    }
                    <Button type={'primary'}>发送消息</Button>
                </div>
            </div>
        </Modal>
    );
}

export default UserMes;

