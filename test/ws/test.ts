
// @ts-ignore
const WebSocket = require('ws');
for (let i = 0; i < 10000;i++) {
    let ws = new WebSocket('ws://localhost:3001');
    // @ts-ignore
    ws.on('open', function open () {
        ws.send('hello');
    });
}
