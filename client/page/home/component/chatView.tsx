import React, {useEffect, useImperativeHandle, useMemo, useRef} from 'react';
import { Input, Tooltip, Button, Drawer } from 'antd';
import {useSelector} from 'react-redux';
// @ts-ignore
import cls from 'classnames';
// @ts-ignore
import { Scrollbars } from 'react-custom-scrollbars';
// eslint-disable-next-line import/extensions
import style from '../css/chatView.scss';
// eslint-disable-next-line no-redeclare
import {useCallbackState} from '../../../public/utils/hooks/useCallbackState';
import {usePublish, useSubscribe, useUnsubscribe} from '../../../public/utils/hooks/usePubSub';
import Video from './video/video';
import {getVoiceStream} from '../../../public/utils/webRTC/rtcUtis';
import {addNearestContact, getMes, sendSBMes, viewMes} from '../../../api/chat';
import {getUser} from '../../../api/userCenter';
const { TextArea } = Input;
let voices: number[] = [];

function ChatView ({chatViewRef, chatData, setChatData, afl}: any) :JSX.Element {
    useImperativeHandle(chatViewRef, () => ({
    }));
    const slRef = useRef();
    const publish = usePublish();
    const unsubscribe = useUnsubscribe();
    const setChat = useSelector((state: any) => state.setChat);
    const user = useSelector((state: any) => state.user);
    let mediaRecorder;
    const [stream, setStream] = useCallbackState(null);
    const [step, setStep] = useCallbackState(null); // 0、 开始录音， 1、录音中，2、选择发送?
    // const [chatList, setChatList] = useCallbackState([]);
    const [defaultMesValue, setDefaultMesValue] = useCallbackState(''); // 默认内容
    const [mesValue, setMesValue] = useCallbackState(''); // 输入文字
    /**
     * 开始录音
     * */
    const recording = function () {
        getVoiceStream().then((voiceStream) => {
            if (voiceStream) {
                setStep(1, function () {
                    setStream(voiceStream);
                    // @ts-ignore
                    mediaRecorder = new MediaRecorder(voiceStream);
                    mediaRecorder.ondataavailable = function (data: any) {
                        let ar = data.data;
                        let fileReader = new FileReader();
                        fileReader.onload = function () {
                            // @ts-ignore
                            voices = [...voices, ...new Uint8Array(fileReader.result)];
                            // let byteArray = new Uint8Array(voices);
                        };
                        fileReader.readAsArrayBuffer(ar);
                    };
                    mediaRecorder.start(10);
                });
            } else {
                console.log('未找到麦克风');
            }
        });

    };

    /**
     * 暂停录音
     * */
    const pause = function () {
        // @ts-ignore
        stream.getTracks().forEach((track) => {
            track.stop();
        });
        setStep(2, function () {
            // console.log(voices);
            // 获取语音
        });
    };

    /**
     * 发送录音
     * */
    const sendVoices = function () {
        setStep(0, async function () {
            let byteArray = new Uint8Array(voices);
            let b = new Blob([byteArray]);
            await sendSBMes(setChat.id, ' ', 1, b);
            // 发送录音
            voices = [];
            setStep(null);
        });
    };

    /**
     * 取消录音
     * */
    const cleanRecording = function () {
        setStep(0, function () {
            voices = [];
            // 取消语音
        });
    };

    const sendMes = async () => {
        if (mesValue !== '') {
            await sendSBMes(setChat.id, mesValue, 0);
            setMesValue('');
        }
    };
    // TODO 后期enter优化
    // const keyUp = (e: any) => {
    // };
    const inputMes = (e: any) => {
        let mes = e.target.value;
        setMesValue(mes);
    };
    // 播放语音
    const playVoice = (url: any) => {
        let audio = new Audio();
        // let byteArray = new Uint8Array(voice);
        // audio.src = URL.createObjectURL(new Blob([byteArray]));
        audio.src = url;
        audio.play();
    };

    /**
     * @desc 描述格式化消息
     */
    const refactoringData = (data: Array<any> | any) => {
        let result: {}[] = [];
        if (Array.isArray(data)) {
            data.forEach((v: any) => {
                result.push({
                    fromId: v.send_userid,
                    toId: v.receive_userid,
                    mes: v.mes,
                    mesType: v.mes_type,
                    viewDate: v.view_date,
                });
            });
        } else {
            result.push({
                fromId: data.send_userid,
                toId: data.receive_userid,
                mes: data.mes,
                mesType: data.mes_type,
                viewDate: data.view_date,
            });
        }
        return result;
    };

    const queryChat = (setChatId: number, type : boolean = false, index ? : number, listCount ? : number) => {
        getMes(setChatId, index, listCount).then((data: any) => {
            let {listCount, pageCount, pageIndex, pageSize, chatList} = data.result.data.data;
            let rd = refactoringData(chatList);
            if (index) {
                chatData[setChatId].chatList = [...chatData[setChatId].chatList, rd];
                chatData[setChatId].pageIndex = index;
                setChatData({...chatData}, function () {
                    console.log(chatData);
                });
            } else {
                getUser(setChatId).then((chatMes: any) => {
                    if (data.success) {
                        // eslint-disable-next-line camelcase
                        let {nickname, headPortraitUrl, synopsis} = chatMes.result.data.data;
                        console.log(rd);
                        setChatData({
                            ...chatData,
                            [setChatId]: {
                                chatList: rd,
                                listCount,
                                pageCount,
                                pageIndex,
                                pageSize,
                                nickname,
                                // eslint-disable-next-line camelcase
                                headPortraitUrl: headPortraitUrl,
                                synopsis,
                                init: true,
                                id: setChatId,
                                // @ts-ignore
                                count: type ? rd.filter((d) => (d.fromId !== user.id && d.viewDate === null)).length : 0,
                            },
                        }, function (data: any) {
                            if (!type) {
                                scrollToBottom(data);
                            }
                        });
                    }
                });
            }
        });
    };

    const scrollToBottom = (chatData : any) => {
        // @ts-ignore
        setChat && chatData[setChat.id] && slRef.current.scrollTop(slRef.current.getScrollHeight());
    };
    const updateChat = (data: any) => {
        if (data) {
            let rd = refactoringData(data);
            let id = data.send_userid === user.id ? data.receive_userid : data.send_userid;
            if (chatData[id]) {
                chatData[id].chatList = [...chatData[id].chatList, ...rd];
                if (data.send_userid !== user.id) {
                    if (setChat) {
                        if (!id === setChat.id) {
                            chatData[id].count++;
                        }
                    } else {
                        chatData[id].count++;
                    }
                }
                setChatData({...chatData}, function (newData: any) {
                    if (setChat) {
                        // @ts-ignore
                        let h = slRef.current.getScrollHeight();
                        // @ts-ignore
                        if (((slRef.current.getScrollTop() + slRef.current.getClientHeight()) === h) || (data.send_userid === user.id)) {
                            scrollToBottom(newData);
                        }
                    }
                });
            } else {
                queryChat(id, true);
            }
        }
    };

    const sponsorVideo = () => {
        publish('videoChat', {
            step: 0,
            data: {
                sendId: user.id,
                acceptId: setChat.id,
            },
        });
    };
    useEffect(function () {
        if (setChat) {
            let setChatId = setChat.id;
            let chatUser = chatData[setChatId];
            if (!chatUser || !chatUser.init) {
                if (chatUser) {
                    if (chatUser.count > 0) {
                        viewMes(setChatId).then(() => {
                            queryChat(setChatId);
                        });
                    }
                } else {
                    queryChat(setChatId);
                }
            } else {
                if (chatUser.count > 0) {
                    chatUser.count = 0;
                    viewMes(setChatId).then(() => {
                        setChatData({...chatData});
                    });
                }
                scrollToBottom(chatData);
            }
            addNearestContact(setChatId);
        }
    }, [setChat]);
    const chat = useSubscribe('chat', (msg: string, data: any) => {
        updateChat(data);
    });
    useEffect(() => () => {
        unsubscribe(chat);
    }, [chat]);

    const vdm = useMemo(() => <Video user={user} />, []);

    const stepComponent = function (step: number):JSX.Element {
        switch (step) {
            case 0:
                return <Button type="primary" shape="circle" style={{width: '100px', height: '100px'}} onClick={
                    () => {
                        recording();
                    }
                }>开始</Button>;
            case 1:
                return <Button type="primary" danger shape="circle" style={{width: '100px', height: '100px'}} onClick={
                    () => {
                        pause();
                    }
                }>暂停</Button>;
            case 2:
                return (
                    <div>
                        <Button shape="circle" type="primary" className={style['recording-operation-stepBtn']} style={{width: '50px', height: '50px'}}
                            onClick={
                                () => {
                                    sendVoices();
                                }
                            }
                        >发送</Button>
                        <Button shape="circle" type="primary" className={style['recording-operation-stepBtn']} danger style={{width: '50px', height: '50px'}}
                            onClick={
                                () => {
                                    cleanRecording();
                                }
                            }
                        >取消</Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={style['chat-view-box']}>
            {
                vdm
            }
            {
                setChat && chatData[setChat.id] && (
                    <>
                        <Drawer
                            placement={'bottom'}
                            closable={step === 0}
                            onClose={() => {
                                setStep(null);
                            }}
                            visible={step !== null}
                        >
                            <div className={style['recording-icon']}>
                                {
                                    step === 1 && <span>录音中...</span>
                                }
                            </div>
                            <div className={style['recording-operation-container']}>
                                {
                                    stepComponent(step)
                                }
                            </div>
                        </Drawer>
                        <div className={style['chat-view-title']}>
                            与{setChat.nickname}会话中...
                        </div>
                        <ul className={style['chat-view-container']}>
                            <Scrollbars
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                ref={slRef}
                            >
                                {
                                    chatData[setChat.id].chatList.map((chatData: any, key: any) => chatData.fromId !== user.id ? (
                                        <li key={key} className={style['chat-view-item']}>
                                            <div className={style['chat-view-head-img']}>
                                                <img src={setChat.headPortraitUrl}/>
                                            </div>
                                            <div className={style['chat-view-mes-other']}>
                                                {
                                                    chatData.mesType === 0 ? chatData.mes : <span onClick={() => {playVoice(chatData.mes);}} className={cls({'iconfont': true, [style['chat-view-mes-voice']]: true})}>&#xe7b2;</span>
                                                }
                                            </div>
                                        </li>
                                    ) : (
                                        <li key={key} className={style['chat-view-item1']}>
                                            <div className={style['chat-view-mes-self']}>
                                                {
                                                    chatData.mesType === 0 ? chatData.mes : <span onClick={() => {playVoice(chatData.mes);}} className={cls({'iconfont': true, [style['chat-view-mes-voice']]: true})}>&#xe7b2;</span>
                                                }
                                            </div>
                                            <div className={style['chat-view-head-img']}>
                                                <img src={user.headPortraitUrl}/>
                                            </div>
                                        </li>
                                    )
                                    )
                                }
                            </Scrollbars>
                        </ul>
                        <div className={style['chat-view-input-box']}>
                            <div className={style['chat-view-tool']}>
                                <Tooltip
                                    title="语音"
                                    color={'blue'}
                                >
                                    <div onClick={() => {
                                        setStep(0);
                                    }}>&#xe664;</div>
                                </Tooltip>
                                <Tooltip title="语音通话" color={'blue'}>
                                    <div>&#xe649;</div>
                                </Tooltip>
                                <Tooltip title="视频通话" color={'blue'}>
                                    <div onClick={sponsorVideo}>&#xe60c;</div>
                                </Tooltip>
                                <Tooltip title="表情包" color={'blue'}>
                                    <div>&#xec80;</div>
                                </Tooltip>
                            </div>
                            <div className={style['chat-view-send']}>
                                <div className={style['chat-view-input-container']}>
                                    <Scrollbars
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <TextArea
                                            className={style['chat-view-input']}
                                            placeholder="输入内容"
                                            allowClear
                                            defaultValue={defaultMesValue}
                                            value={mesValue}
                                            // onKeyUp={keyUp}
                                            onChange={inputMes}
                                        />
                                    </Scrollbars>
                                </div>
                                <Button type="primary" className={style['chat-view-send-btn']} onClick={sendMes}>
                                    发送
                                </Button>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default ChatView;
