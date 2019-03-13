import BaseSocket from "./BaseSocket";

const url = "ws://192.168.0.4:3002";
// const url = "ws://echo.websocket.org";

class WebSocketWrapper {
    ws: BaseSocket;

    constructor() {
        this.ws = new BaseSocket(url, {
            onMessage: this.handleMessage,
            onReconnect: () => console.debug("Websocket reconnecting..."),
            onClose: e => console.debug("Websocket closed!", e),
            onError: e => console.debug("Websocket error:", e)
        });
    }

    open() {
        console.debug("Opening websocket");
        this.ws.open();
    }

    close() {
        console.debug("Closing websocket");
        this.ws.close();
    }

    send(message: string) {

        const data = {
            message
        };

        this.ws.json(data);
    }

    handleMessage = (e: MessageEvent) => {
        try {
            const message = JSON.parse(e.data);
            console.log("Message: " + message);
        } catch (e) {
            console.debug("Websocket message handling failed: ", e);
        }
    };
}

export default new WebSocketWrapper();