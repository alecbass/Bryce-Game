interface PersistentWebSocketOptions {
    protocols?: string | string[];
    timeout?: number;
    onOpen?: (e: Event) => any;
    onMessage?: (e: MessageEvent) => any;
    onReconnect?: () => any;
    onClose?: (e: CloseEvent) => any;
    onError?: (e: Event) => any;
}
  
const MAX_CONNS = 4;
const CLOSE_NORMAL = 4000;
const DEFAULT_RECONNECT_TIME = 5000;

class BaseSocket {
    constructor(private url: string, options?: PersistentWebSocketOptions) {
        this.options = options || {};
    }

    private options: PersistentWebSocketOptions;
    private ws?: WebSocket;
    private timeout?: NodeJS.Timer;

    open() {
        // TODO(johan): A bit of crazy defensive programming here to make sure we aren't
        // firing events for sockets which aren't the current one. If I could get the logic
        // right this just shouldn't happen, so over time if we never see BAD SOCKET in the
        // debug console, it means it's probably correct, but there's a lot of different
        // things with logging in/out and refreshing auth tokens which may cause this to be
        // necessary. Keep an eye on it, and revisit later.

        // NOTE(alec): Sorry Johan I stole this
        const eventWrapper = <T extends Event>(fn: (e: T) => void) => (e: T) => {
            if (e.target && e.target instanceof WebSocket) {
                if (e.target === this.ws) {
                    fn(e);
                } else {
                    console.debug("BAD SOCKET");
                    e.target.close(CLOSE_NORMAL);
                }
            }
        };

        this.ws = new WebSocket(this.url, this.options.protocols || []);

        this.ws.onmessage = eventWrapper(e => {
            console.log(e);
            if (this.options.onMessage) {
                this.options.onMessage(e);
            }
        });

        this.ws.onopen = eventWrapper(e => {
            if (this.options.onOpen) {
                this.options.onOpen(e);
            }
        });

        this.ws.onclose = eventWrapper(e => {
            if (this.options.onClose) {
                this.options.onClose(e);
            }

            if (e.code !== CLOSE_NORMAL) {
                this.reconnect();
            }
        });

        this.ws.onerror = eventWrapper(e => {
            if (this.options.onError) {
                this.options.onError(e);
            }
        });
    }

    close() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = undefined;
        }
        if (this.ws) {
            this.ws.close(CLOSE_NORMAL, "Closed on purpose");
        }
    }

    reconnect() {
        this.timeout = setTimeout(() => {
            this.timeout = undefined;
            if (this.options.onReconnect) {
                this.options.onReconnect();
            }
            this.open();
        }, this.options.timeout || DEFAULT_RECONNECT_TIME);
    }

    send(data: string) {
        console.log(this.ws);
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            console.log("sending" + data);
            this.ws.send(data);
        }
    }

    json(data: any) {
        this.send(JSON.stringify(data));
    }
}

export default BaseSocket;