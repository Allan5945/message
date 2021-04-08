import React from 'react';
import {Button, Avatar, Result, message, Form, Input} from 'antd';
import {ArrowLeftOutlined, SearchOutlined} from '@ant-design/icons';
import {useCallbackState} from '../../../../public/utils/hooks/useCallbackState';
import {getUserByCode, addFriend} from '../../../../api/userCenter';
// eslint-disable-next-line import/extensions
import stl from '../../css/find.scss';

function FindFriendsOrGroup ({setStep, setFMes}: any) {
    const [form] = Form.useForm();

    // const [code, setCode] = useCallbackState(null);
    const queryCode = async (values: any) => {
        let {code} = values;
        let sCode = code.substring(0, 3);
        if (sCode === 'BCF') {
            getUserByCode(code).then((mes: any) => {
                if (mes.success) {
                    // @ts-ignore
                    if (mes.result.data.type === 0) {
                        // @ts-ignore
                        setFMes(mes.result.data.data, () => {
                            setStep(2);
                        });
                        // @ts-ignore
                    } else if (mes.result.data.type === 2) {
                        message.warning('查询对象不存在');
                    } else {
                        message.error('查询失败');
                    }
                } else {
                    message.error('查询失败');
                }
            });
            // @ts-ignore
        } else if (sCode === 'BCG') {

        } else {
            message.error('查询对象不存在');

        }
    };
    return (
        <div className={stl['find-step-container']}>
            <div>
                <div className={stl['find-step-head']}>查找好友/群</div>
                <div className={stl['find-friend-box']}>
                    <Form form={form} name="nest-messages" onFinish={queryCode}>
                        <Form.Item name='code' rules={[
                            {
                                required: true,
                                message: '请输入好友id/群id',
                            },
                        ]}>
                            <Input className={stl['find-friend-box-input']} placeholder={'请输入好友id/群id'}/>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <div className={stl['find-step-module']}>
                <Button icon={<ArrowLeftOutlined />} onClick={() => {setStep(null);}}>返回</Button>
                <Button type="primary" icon={<SearchOutlined/>} onClick={form.submit}>查询</Button>
            </div>
        </div>
    );
}

function FindFriendsInformation ({setStep, fMes}: any) {
    const apply = () => {
        addFriend(fMes.id).then((data: any) => {
            if (data.success) {
                let type = data.result.data.type;
                if (type === 0) {
                    setStep(603);
                } else if (type === 1) {
                    message.error('申请失败');
                } else if (type === 3) {
                    message.error('已经是好友了');
                } else if (type === 4) {
                    message.error('已经申请过,请勿重复申请');
                }
            }
        });
    };

    return (
        <div className={stl['find-step-container']}>
            <div className={stl['find-step-information']}>
                <Avatar size={80} src={fMes.headPortraitUrl} />
                <div className={stl['find-step-information-name']}>{fMes.nickname}</div>
                <p className={stl['find-step-information-abstract']}>{fMes.synopsis}</p>
            </div>
            <div className={stl['find-step-module']}>
                <Button icon={<ArrowLeftOutlined />} onClick={() => {setStep(1);}}>返回</Button>
                {/* <Button type="primary" onClick={() => {setStep(603);}}>添加好友</Button>*/}
                <Button type="primary" onClick={apply}>添加好友</Button>
            </div>
        </div>
    );
}


export {FindFriendsInformation, FindFriendsOrGroup};

