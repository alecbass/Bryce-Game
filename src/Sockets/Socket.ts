import BaseSocket from "./BaseSocket";

import store from "../Store/index";
import * as actions from "../Store/actions";
import { API } from "../Sockets";

// const url ="ws://192.168.0.4:3002";
const url = "ws://101.165.152.52:3002";
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

    send(message: API.BaseMessage) {
        this.ws.json(message);
    }

    handleMessage = (e: MessageEvent) => {
        try {
            const { data } = e;
            let messages = JSON.parse(data) as API.BaseMessage;
            store.dispatch(actions.receiveMessage(messages));
        } catch (e) {
            console.debug("Websocket message handling failed: ", e);
        }
    };
}

export default new WebSocketWrapper();