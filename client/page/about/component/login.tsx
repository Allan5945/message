import React, {memo, useEffect, useState, Profiler, Suspense, lazy, createContext, Component, useCallback, useLayoutEffect} from 'react';
const style = require('./../css/login.scss');
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {login} from '../../../api/login';
import {setTid, setUserMes} from '../../../public/utils/dataCenter/data';
import axios from 'axios';

export default function (props: any) {
    const [errTip, setErrTip] = useState({
        show: false,
        msg: '',
    });

    const onFinish = async (values: any) => {
        let data: any = await login(values.username, values.password, 1);
        const type = data.result.data.type;
        if (type === 0) {
            const tid = data.result.data.tid;
            const user = data.result.data.user;
            setTid(tid);
            setUserMes(user);
            axios.defaults.headers.common['tid'] = tid;
            window.location.href = '/page/home';
        } else if (type === 1) {
            setErrTip({
                show: true,
                msg: '账号或者密码错误！',
            });
        } else if (type === 2) {
            setErrTip({
                show: true,
                msg: '账号不存在！',
            });
        }
    };

    const toRegistered = function () {
        props.setStep(1);
    };
    const retrievePassword = function () {
        props.setStep(2);
    };
    const cleanTip = function () {
        if (!errTip.show) {
            setErrTip({
                show: false,
                msg: '',
            });
        }
    };
    return (
        <>
            <div className={style['login-title']}>登录</div>
            <div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号/邮箱号" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>记住密码</Checkbox>
                        </Form.Item>
                        <a className={style['login-form-forgot']} onClick={retrievePassword}>
                            忘记密码？
                        </a>
                    </Form.Item>
                    <Form.Item>
                        {
                            errTip.show && <span className={style['ant-alert-error']}>{errTip.msg}</span>
                        }
                        <Button type="primary" htmlType="submit" className={style['login-form-button']}>
                            登录
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <a className={style['login-form-forgot']} onClick={toRegistered}>
                            注册账号
                        </a>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}
