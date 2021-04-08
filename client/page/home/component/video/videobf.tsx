import React, {useEffect, useRef, useMemo} from 'react';
import {Modal, Button, Radio } from 'antd';
// eslint-disable-next-line import/extensions
import style from '../../css/videoChat.scss';
import Draggable from 'react-draggable';
import {usePublish, useSubscribe, useUnsubscribe} from '../../../../public/utils/hooks/usePubSub';
import {useCallbackState} from '../../../../public/utils/hooks/useCallbackState';
import {videoChatApi} from '../../../../api/chat';
import Rtc from './Rtc';
import {useSelector} from 'react-redux';

// @ts-ignore
const PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

const Connections = new Map();

// let stream :any, stream1: any, connection, peer: any;
let peer: any, localVideo: any, remoteVideo: any;
function video ({openVideo, setOpenVideo }: any) {
    const publish = usePublish();
    const user = useSelector((state: any) => state.user);
    const unsubscribe = useUnsubscribe();
    // const localVideo = useRef(null);
    // const remoteVideo = useRef(null);
    const [initiate, setInitiate] = useCallbackState(false);
    // const [peer, setPeer] = useCallbackState({});
    const [stream, setStream] = useCallbackState({});
    const [link, setLink] = useCallbackState(false);
    const [close, setClose] = useCallbackState(false);
    const [opeName, setOpeName] = useCallbackState('');
    const [connectionMes, setConnectionMes] = useCallbackState({});

    const memoDom = useMemo(() => (
        <>

        </>
    ), []);


    const videoChat = useSubscribe('videoChat', function (mes: any, newData: any) {
        let {step, data, con} = newData;
        // eslint-disable-next-line complexity
        let goStep = (d: any, step: number) => {
            let { sendId, acceptId, nikeName} = d;
            let self = sendId === user.id;
            switch (step) {
                case 0:
                    if (self) {
                        videoChatApi(sendId, acceptId, step).then((data: any) => {
                            if (data.success) {
                                let type = data.result.data.type;
                                if (type === 3) {
                                    Modal.error({
                                        title: '对方不在线，请稍后再试！',
                                    });
                                } else if (type === 0) {
                                    console.log('>>>>>>>>>>>>>>>>>>>>>>+   1');
                                    setOpenVideo(true, function () {
                                        setLink(true);
                                    });
                                }
                            }
                        });
                    } else {
                        setOpenVideo(true, function () {
                            setOpeName(nikeName);
                            setInitiate(true);
                        });
                    }
                    break;
                case 1:
                    if (self) {
                        console.log('>>>>>>>>>>>>>>>>>>>>>>+   3');
                        (async function () {
                            setStream(await navigator.mediaDevices.getUserMedia({ audio: true }), function (stream: any) {
                                // @ts-ignore
                                localVideo.onloadeddata = () => {
                                    // @ts-ignore
                                    localVideo.play();
                                };
                                // @ts-ignore
                                localVideo.srcObject = stream;
                                peer = new PeerConnection();
                                stream.getTracks().forEach((track: any) => {
                                    peer.addTrack(track, stream);
                                });
                                peer.ontrack = (e: any) => {
                                    if (e && e.streams) {
                                        console.log(e, '>>>>>>>>>>>>>2222');
                                        // @ts-ignore
                                        remoteVideo.srcObject = e.streams[0];
                                    }
                                };
                                peer.onicecandidate = (e: any) => {
                                    if (e.candidate) {
                                        videoChatApi(sendId, acceptId, 3, e.candidate).then((data: any) => {
                                            if (data.success) {
                                                let type = data.result.data.type;
                                                // if (type === 0) {}
                                            }
                                        });
                                    }
                                };
                                (async function () {
                                    const offer = await peer.createOffer();
                                    await peer.setLocalDescription(offer);
                                    videoChatApi(sendId, acceptId, 2, offer).then((data: any) => {
                                        if (data.success) {
                                            let type = data.result.data.type;
                                            // if (type === 0) {}
                                        }
                                    });
                                })();
                            });
                        })();
                    } else {
                        videoChatApi(sendId, acceptId, step).then((data: any) => {
                            console.log('>>>>>>>>>>>>>>>>>>>>>>+   2');
                            if (data.success) {
                                let type = data.result.data.type;
                                if (type === 0) {
                                    setOpenVideo(true, function () {
                                        setLink(true);
                                    });
                                }
                            }
                        });
                    }
                    break;
                case 2:
                    con = JSON.parse(con);
                    if (self) {
                        (async function () {
                            await peer.setRemoteDescription(new RTCSessionDescription({ type: con.type, sdp: con.sdp }));
                        })();
                    } else {
                        (async function () {
                            (async function () {
                                await peer.setRemoteDescription(new RTCSessionDescription({ type: con.type, sdp: con.sdp }));
                                const answer = await peer.createAnswer();
                                await peer.setLocalDescription(answer);
                                videoChatApi(sendId, acceptId, 2, answer).then((data: any) => {
                                    if (data.success) {
                                        let type = data.result.data.type;
                                    }
                                });
                            })();
                        })();
                    }
                    break;
                case 3:
                    con = JSON.parse(con);
                    peer.addIceCandidate(con);
                    setLink(false);
                    setInitiate(false);
                    setClose(true);
                    break;
                case 100:
                    if (self) {
                        Modal.error({
                            title: '对方已拒绝！',
                            onOk: function () {
                                setOpenVideo(false, function () {
                                    setOpeName('');
                                    setInitiate(false);
                                });
                            },
                        });
                    } else {
                        videoChatApi(sendId, acceptId, step).then((data: any) => {
                            if (data.success) {
                                let type = data.result.data.type;
                                if (type === 0) {
                                    setOpenVideo(false, function () {
                                        setOpeName('');
                                        setInitiate(false);
                                    });
                                }
                            }
                        });
                    }
                    break;
                case 101:
                    peer.close();
                    stream.getTracks().forEach((track: any) => {
                        track.stop();
                    });
                    setOpenVideo(false);
                    setLink(false);
                    setInitiate(false);
                    setClose(false);
                    break;
                default:
            }
        };
        if (step === 0) {
            setConnectionMes(data, function (nd: any) {
                goStep(nd, step);
            });
        } else {
            goStep(connectionMes, step);
        }

    });

    /**
    * @desc 同意
    */
    const agreeVideo = async () => {
        setStream(await navigator.mediaDevices.getUserMedia({ audio: true }), function (stream: any) {
            localVideo.srcObject = stream;
            // @ts-ignore
            localVideo.onloadeddata = () => {
                // @ts-ignore
                localVideo.play();
            };
            peer = new PeerConnection();
            stream.getTracks().forEach((track: any) => {
                peer.addTrack(track, stream);
            });
            peer.ontrack = (e: any) => {
                if (e && e.streams) {
                    // @ts-ignore
                    remoteVideo.srcObject = e.streams[0];
                }
            };
            publish('videoChat', {
                step: 1,
                data: connectionMes,
            });
            peer.onicecandidate = (e: any) => {
                if (e.candidate) {
                    let {sendId, acceptId} = connectionMes;
                    videoChatApi(sendId, acceptId, 3, e.candidate).then((data: any) => {
                        if (data.success) {
                            let type = data.result.data.type;
                        }
                    });
                }
            };
        });
    };

    /**
     * @desc 关闭视频通话
     */
    const closeVideo = () => {
        let {sendId, acceptId} = connectionMes;
        videoChatApi(sendId, acceptId, 101).then((data: any) => {
            if (data.success) {
                let type = data.result.data.type;
            }
        });
    };

    useEffect(() => () => {
        unsubscribe(videoChat);
    }, [videoChat]);

    useEffect(() => {
        remoteVideo = document.getElementById('remote-video');
        localVideo = document.getElementById('local-video');
    }, []);


    return (
        <Modal
            visible={openVideo}
            // visible
            footer={null}
            closable={false}
            width={800}
        >
            <div className={style.container}>
                <div className={style['video-box']}>
                    {memoDom}
                    {
                        initiate && <div className={style['btn-box']}>
                            <p className={style['btn-title']}>{opeName}发起视频通话</p>
                            <div className={style['btn-box-btn']}>
                                <Button type="primary" shape="circle" size={'large'} danger className={style['btn']} onClick={() => {
                                    publish('videoChat', {
                                        step: 100,
                                        data: connectionMes,
                                    });
                                }}>
                                    拒绝
                                </Button>
                                <Button type="primary" shape="circle" size={'large'} className={style['btn']} onClick={() => {
                                    publish('videoChat', {
                                        step: 1,
                                        data: connectionMes,
                                    });
                                }}>
                                    同意
                                </Button>
                            </div>
                        </div>
                    }
                    {
                        link && <div className={style['btn-box']}>
                            <p className={style['btn-title']}>呼叫中...</p>
                            <div className={style['btn-box-btn']}>
                                <Button type="primary" shape="circle" size={'large'} danger className={style['btn']} onClick={() => {
                                    setLink(false);
                                    setOpenVideo(false);
                                }}>
                                    取消
                                </Button>
                            </div>
                        </div>
                    }
                    {
                        close && <div className={style['btn-box']}>
                            <div className={style['btn-box-btn']}>
                                <Button type="primary" shape="circle" size={'large'} danger className={style['btn']} onClick={closeVideo}>
                                    挂断
                                </Button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Modal>
    );
}

export default video;
