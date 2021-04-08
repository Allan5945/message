
function listenWs (tid: string, listen: any) {
    let ws = new WebSocket(`ws://localhost?tid=${tid}`);
    ws.onopen = function () {
        ws.onmessage = listen;
    };
}

export {
    listenWs,
};
