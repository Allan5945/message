import React from 'react';
import {Button} from 'antd';
// eslint-disable-next-line import/extensions
import stl from './../../css/find.scss';

function FindStep ({setStep}: any) {
    return (
        <div>
            <div className={stl['find-step-head']}>请选择您的操作</div>
            <div className={stl['find-step-box']}>
                <div>
                    <img src={require('../../static/addFriend.png')} alt=""/>
                    <Button type="primary" onClick={() => {setStep(1);}}>查找朋友/群</Button>
                </div>
                <div>
                    <img src={require('../../static/groupChat.png')} alt=""/>
                    <Button type="primary" onClick={() => {setStep(201);}}>创建群聊</Button>
                </div>
            </div>
        </div>
    );
}

export default FindStep;
