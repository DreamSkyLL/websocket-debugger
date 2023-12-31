import { PORT } from "../config";
var ws: WebSocket | null = null;

setTimeout(() => {
    ws = new WebSocket(`ws://localhost:${PORT}`);

    ws.onopen = () => {
        if (!ws) return;
        ws.send('{"app":"websocket-debugger"}');
    }

    ws.onmessage = async (event: MessageEvent<any>) => {
        if (!event.data.text) return
        let strData = await event.data.text();
        console.log('raw', strData);
    }
}, 3000);

export function send(data: string) {
    if (!ws) return;
    ws.send(data);
}

export function updateHandler(handler: (data: string) => void) {
    if (!ws) return;
    ws.onmessage = async (event: MessageEvent<any>) => {
        let strData = await event.data.text();
        handler(strData);
    }
}