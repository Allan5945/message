import React, {useEffect} from 'react';
import {Modal, Button } from 'antd';
// eslint-disable-next-line import/extensions
import style from '../../css/videoChat.scss';
import {usePublish, useSubscribe, useUnsubscribe} from '../../../../public/utils/hooks/usePubSub';
import {videoChatApi} from '../../../../api/chat';


// @ts-ignore
const PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

let stream: any;
let localVideo: any;
let remoteVideo: any;
let peer: any;
let connectionMes: any;
let videoName: any;
let videoBox: any, videoLink: any, videoClose: any, videoInitiate: any;
function video ({user}: any) {
    const publish = usePublish();
    const unsubscribe = useUnsubscribe();

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
    const setSdp = async (sendId: number, acceptId: number) => {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        peer = new PeerConnection();
        localVideo.srcObject = stream;
        stream.getTracks().forEach((track: any) => {
            peer.addTrack(track, stream);
        });

        peer.ontrack = (e: any) => {
            if (e && e.streams) {
                // @ts-ignore
                remoteVideo.srcObject = e.streams[0];
            }
        };
        peer.onicecandidate = (e: any) => {
            if (e.candidate) {
                if (peer.signalingState !== 'closed') {
                    videoChatApi(sendId, acceptId, 3, e.candidate).then((data: any) => {
                        if (data.success) {
                            let type = data.result.data.type;
                            // if (type === 0) {}
                        }
                    });
                }
            }
        };
    };
    // eslint-disable-next-line complexity
    let goStep = (d: any, step: number, con?: any) => {
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
                                videoBox.style.display = 'none';
                            } else if (type === 0) {
                                console.log(videoBox);
                                videoBox.style.display = 'flex';
                                videoLink.style.display = 'block';
                            }
                        }
                    });
                } else {
                    videoBox.style.display = 'flex';
                    videoInitiate.style.display = 'block';
                    videoName.innerText = `${nikeName}发起了视频通话`;
                }
                break;
            case 1:
                if (self) {
                    (async function () {
                        await setSdp(sendId, acceptId);
                        const offer = await peer.createOffer();
                        await peer.setLocalDescription(offer);
                        videoChatApi(sendId, acceptId, 2, offer).then((data: any) => {
                            if (data.success) {
                                let type = data.result.data.type;
                                // if (type === 0) {}
                            }
                        });
                    })();
                } else {
                    (async function () {
                        await setSdp(sendId, acceptId);
                        videoChatApi(sendId, acceptId, step).then((data: any) => {
                            if (data.success) {
                                let type = data.result.data.type;
                                if (type === 0) {
                                    videoBox.style.display = 'fixed';
                                    videoLink.style.display = 'block';
                                }
                            }
                        });
                    })();
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
                        await peer.setRemoteDescription(new RTCSessionDescription({ type: con.type, sdp: con.sdp }));
                        const answer = await peer.createAnswer();
                        await peer.setLocalDescription(answer);
                        videoChatApi(sendId, acceptId, 2, answer).then((data: any) => {
                            if (data.success) {
                                let type = data.result.data.type;
                            }
                        });
                    })();
                }
                break;
            case 3:
                con = JSON.parse(con);
                peer.addIceCandidate(con);
                videoBox.style.display = 'fixed';
                videoLink.style.display = 'none';
                videoInitiate.style.display = 'none';
                videoClose.style.display = 'block';
                break;
            case 100:
                if (self) {
                    Modal.error({
                        title: '对方已拒绝！',
                        onOk: function () {
                            videoBox.style.display = 'none';
                            // setOpeName('');
                            videoInitiate.style.display = 'none';
                        },
                    });
                } else {
                    videoChatApi(sendId, acceptId, step).then((data: any) => {
                        if (data.success) {
                            let type = data.result.data.type;
                            if (type === 0) {
                                videoBox.style.display = 'none';
                                // setOpeName('');
                                videoInitiate.style.display = 'none';
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
                videoBox.style.display = 'none';
                videoInitiate.style.display = 'none';
                videoClose.style.display = 'none';
                videoLink.style.display = 'none';
                break;
            default:
        }
    };
    const videoChat = useSubscribe('videoChat', function (mes: any, newData: any) {
        let {step, data, con} = newData;
        // eslint-disable-next-line complexity
        if (step === 0) {
            connectionMes = data;
        }
        goStep(connectionMes, step, con);
    });
    useEffect(() => () => {
        unsubscribe(videoChat);
    }, []);
    useEffect(() => {
        remoteVideo = document.getElementById('remote-video');
        localVideo = document.getElementById('local-video');
        videoBox = document.getElementById('video-box');
        videoLink = document.getElementById('video-link');
        videoClose = document.getElementById('video-close');
        videoInitiate = document.getElementById('video-initiate');
        videoName = document.getElementById('video-name');
        localVideo.onloadeddata = () => {
            // @ts-ignore
            localVideo.play();
            console.log('播放local');
        };
        remoteVideo.onloadeddata = () => {
            // @ts-ignore
            remoteVideo.play();
            console.log('播放remote');
        };
    }, []);
    return <div id={'video-box'}>
        <div className={style.container}>
            <div className={style['video-box']}>
                <video className={style['remote-video']} id={'remote-video'} />
                <video className={style['local-video']}id={'local-video'} muted />
                <div className={style['btn-box']} id={'video-initiate'}>
                    <p className={style['btn-title']} id={'video-name'}/>
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
                <div className={style['btn-box']} id={'video-link'}>
                    <p className={style['btn-title']}>呼叫中...</p>
                    <div className={style['btn-box-btn']}>
                        <Button type="primary" shape="circle" size={'large'} danger className={style['btn']} onClick={() => {
                            videoBox.style.display = 'none';
                            videoLink.style.display = 'none';
                        }}>
                            取消
                        </Button>
                    </div>
                </div>
                <div className={style['btn-box']} id={'video-close'}>
                    <div className={style['btn-box-btn']}>
                        <Button type="primary" shape="circle" size={'large'} danger className={style['btn']} onClick={closeVideo}>
                            挂断
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default video;
