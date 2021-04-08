// eslint-disable-next-line import/extensions
import stl from '../../css/find.scss';
import {Result, Button, Tooltip} from 'antd';
import React from 'react';

function ApplySuccess ({closeFindContainer}: any) {
    return (
        <div className={stl['find-step-container']}>
            <Result
                status="success"
                title="申请提交成功！"
                subTitle="请耐心等待对方同意"
                extra={[
                    <Button type="primary" onClick={closeFindContainer} key={'ApplySuccess1'}>好哒</Button>,
                ]}
            />
        </div>
    );
}
function CreateSuccess ({closeFindContainer}: any) {
    return (
        <div className={stl['find-step-container']}>
            <Result
                status="success"
                title="创建成功！"
                subTitle={
                    <span>
                        您的邀请码:
                        <Tooltip title="点击复制" color={'blue'}>
                            <a>hTKzmak</a>
                        </Tooltip>
                    </span>
                }
                extra={[
                    <Button type="primary" onClick={closeFindContainer} key={'CreateSuccess1'}>好哒</Button>,
                ]}
            />
        </div>
    );
}

export { ApplySuccess, CreateSuccess};

