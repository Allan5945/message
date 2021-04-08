import React from 'react';
import {Button, Avatar} from 'antd';
import {ArrowLeftOutlined, SearchOutlined, PlusOutlined} from '@ant-design/icons';
import {useCallbackState} from '../../../../public/utils/hooks/useCallbackState';
// eslint-disable-next-line import/extensions
import stl from '../../css/find.scss';


function FindGroupInformation ({setStep}: any) {
    return (
        <div className={stl['find-step-container']}>
            <div className={stl['find-step-information']}>
                <Avatar size={80} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <div className={stl['find-step-information-name']}>成都前端交流群</div>
                <p className={stl['find-step-information-abstract']}>一群超有爱的小伙伴 ，~每天准时划水，招聘 哒哒哒哒哒哒多多多多多多多</p>
            </div>
            <div className={stl['find-step-module']}>
                <Button icon={<ArrowLeftOutlined />} onClick={() => {setStep(1);}}>返回</Button>
                <Button type="primary" onClick={() => {setStep(603);}}>申请加入</Button>
            </div>
        </div>
    );
}

function CreateFindGroup ({setStep}: any) {
    return (
        <div className={stl['find-step-container']}>
            <div>
                <div className={stl['find-step-head']}>创建群</div>
                <div className={stl['find-friend-box']}>
                    <Avatar size={80} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <input placeholder={'请输入群名称'} className={stl['find-friend-box-input']}/>
                </div>
            </div>
            <div className={stl['find-step-module']}>
                <Button icon={<ArrowLeftOutlined />} onClick={() => {setStep(null);}}>返回</Button>
                <Button type="primary" icon={<PlusOutlined/>} onClick={() => {setStep(604);}}>创建</Button>
            </div>
        </div>
    );
}

export { FindGroupInformation, CreateFindGroup};
