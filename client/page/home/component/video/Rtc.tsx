export default class Rtc {
    peer: any;
    constructor (id: number, stream: any, localVideo: any, remoteVideo: any, send: any) {
        const peer = new RTCPeerConnection();
        peer.ontrack = (e: any) => {
            if (e && e.streams) {
                remoteVideo.srcObject = e.streams[0];
            }
        };
        peer.onicecandidate = (e: any) => {
            if (e.candidate) {
                // peer1.addIceCandidate(e.candidate);
                // TODO
                send(JSON.stringify(e.candidate));
            }
        };
        stream.getTracks().forEach((track: any) => {
            peer.addTrack(track, stream);
        });
        console.log(localVideo);
        localVideo.srcObject = stream;
        this.peer = peer;
    }

    async createOffer (send: any) {
        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(offer);
        // TODO
        send(JSON.stringify(offer));
    }
    async createRemoteOffer (offer: any) {
        const { type, sdp, iceCandidate } = offer;
        await this.peer.setRemoteDescription(new RTCSessionDescription({ type, sdp }));
    }
    async createAnswer (send: any) {
        const answer = await this.peer.createAnswer();
        await this.peer.setLocalDescription(answer);
        // TODO
        send(JSON.stringify(answer));
    }
    async createRemoteAnswer (answer: any) {
        const { type, sdp, iceCandidate } = answer;
        await this.peer.setRemoteDescription(new RTCSessionDescription({ type, sdp }));
    }
}
