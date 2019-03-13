import BaseSocket from "./BaseSocket";

import store from "src/Store/index";
import * as actions from "src/Store/actions";

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
            const { data } = e;
            console.log(data);
            const messages = JSON.parse(data);
            console.log(messages);
            if (messages) {
                messages.forEach(message => store.dispatch(actions.receiveMessage(message)));
            } else {
                if (typeof data === "string") {
                    store.dispatch(actions.receiveMessage(data));
                } else if (typeof data === "object" && "message" in Object.keys(data)) {
                    store.dispatch(actions.receiveMessage(data.message));
                } else {
                    throw new Error("Bad message response: no message");
                }
            }
        } catch (e) {
            console.debug("Websocket message handling failed: ", e);
        }
    };
}

export default new WebSocketWrapper();