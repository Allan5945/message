import React, {useState} from 'react';
import {Form, Input, Button, Tooltip, message} from 'antd';
import {regUserName, regPas} from '../../../public/utils/reg';
import {getCode, registered} from '../../../api/registered';
import {useCallbackState} from '../../../public/utils/hooks/useCallbackState';

const style = require('../css/login.scss');

const layout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};

export default function (props: any) {
    const [form] = Form.useForm();
    const [codeDisable, setCodeDisable] = useCallbackState(0);
    const onFinish = async (values: any) => {
        let {username, password, email, code} = values;
        let data = await registered(username, password, email, code);
        if (data) {
            // @ts-ignore
            let type = data.result.data.type;
            if (type === 0) {
                alert('注册成功');
            } else if (type === 1) {
                message.error('注册失败');
            } else if (type === 2) {
                message.error('用户名已经存在');
            } else if (type === 3) {
                message.error('验证码错误');
            }
        }

    };

    const backLogin = function () {
        props.setStep(0);
    };

    const getEmailCode = async function () {
        const list = await form.validateFields(['email']);
        let data = await getCode(list.email);
        if (data) {
            // @ts-ignore
            let type = data.result.data.type;
            if (type === 0) {
                message.info('验证码发送成功');
                let countdown = function (tim: number) {
                    setCodeDisable(tim);
                    let nTime = tim - 1;
                    setTimeout(() => {
                        if (nTime > 0) {
                            countdown(nTime);
                        } else {
                            setCodeDisable(0);
                        }
                    }, 1000);
                };
                countdown(5);
            } else if (type === 1) {
                message.error('验证码发送失败');
            } else if (type === 2) {
                message.error('邮箱已经被绑定');
            } else if (type === 3) {
                message.error('发送频繁，请稍后再试');
            }
        }
    };

    return (
        <>
            <div className={style['login-title']}>注册</div>
            <Form form={form} {...layout} name="nest-messages" onFinish={onFinish}>
                <Form.Item name='username' label="账号名" rules={[
                    {
                        required: true,
                        message: '请输入用户名',
                    },
                    {
                        pattern: new RegExp(regUserName),
                        message: '用户名不合法， 用户名长度为6-16位',
                    },
                ]}>
                    <Input/>
                </Form.Item>
                <Form.Item
                    name='password'
                    label="密码"
                    hasFeedback
                    rules={
                        [
                            {
                                required: true,
                                message: '请输入密码',
                            },
                            {
                                pattern: new RegExp(regPas),
                                message: '密码规则不合法，密码长度为6-16',
                            },
                        ]
                    }>
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    name='again'
                    label="确认密码"
                    dependencies={['密码']}
                    hasFeedback
                    rules={
                        [
                            {
                                required: true,
                                message: '请再次输入密码',
                            },
                            ({ getFieldValue }) => ({
                                validator (rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('您输入的两个密码不匹配!');
                                },
                            }),
                        ]
                    }>
                    <Input.Password/>
                </Form.Item>
                <Form.Item name='email' label="邮箱" rules={
                    [
                        {
                            required: true,
                            message: '请输入邮箱',
                        },
                        {
                            type: 'email',
                            message: '邮箱格式不正确',
                        },
                    ]

                }>
                    <Input/>
                </Form.Item>
                <Form.Item label='验证码' style={{display: 'flex', flexFlow: 'row '}}>
                    <Form.Item name='code' rules={[
                        {
                            required: true,
                            message: '请输入验证码',
                        },
                    ]} style={{width: '187px'}}>
                        <Input/>
                    </Form.Item>
                    <Button type="primary" onClick={getEmailCode}>
                        {
                            codeDisable === 0 ? '获取验证码' : `${codeDisable}秒`
                        }
                    </Button>
                </Form.Item>
                {/* <Tooltip placement={'left'} title="选择后，mes会对您绑定的邮箱进行单向加密存入数据库， 之后无论是谁也无法获取到您的邮箱账号。" color={'cyan'}>*/}
                {/*    <Form.Item name='encryption' label="邮箱加密">*/}
                {/*        <Checkbox/>*/}
                {/*    </Form.Item>*/}
                {/* </Tooltip>*/}
                <Form.Item wrapperCol={{...layout.wrapperCol, offset: 3}}>
                    <Button type="primary" htmlType="submit" className={style['login-form-button']}>
                        提交
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{...layout.wrapperCol, offset: 3}}>
                    <Button className={style['login-form-button']} onClick={backLogin}>
                        返回登录
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
