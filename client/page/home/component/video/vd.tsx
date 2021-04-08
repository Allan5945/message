
import {useSubscribe} from '../../../../public/utils/hooks/usePubSub';
import {videoChatApi} from '../../../../api/chat';
import style from "../../css/videoChat.scss";

// @ts-ignore
const PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

let stream: any;
let localVideo: any;
let remoteVideo: any;
let peer: any;
const videoChat = useSubscribe('videoChat', function (mes: any, newData: any) {
    let {step, data, con} = newData;
});
let vbx = document.getElementById('video-box');


export {
};
