import { WebSocket } from "ws";

export default class Connection {
    /**
     * The actual WebSocket connection interaction object
     */
    private realWebSocketConnection: WebSocket;

    /**
     * All event callbacks for event listeners
     */
    private events = {
        messageError: [] as {
            channel: string,
            listener: (error: any) => void
        }[],
        message: [] as {
            channel: string,
            listener: (message: any) => void
        }[],
        disconnect: [] as (() => void)[]
    };

    /**
     * WebSocket server connection object
     */
    public constructor(connection: WebSocket) {
        this.realWebSocketConnection = connection;

        connection.on("message", message => {
            const jsonParsePromise = () => {
                return new Promise((resolve, reject) => {
                    try {
                        const messageObject = JSON.parse(message.toString());
                        resolve(messageObject);
                    } catch (error) {
                        reject(error);
                    }
                });
            }

            jsonParsePromise().then(messageObject => {
                console.log(messageObject);
            }).catch(error => {
                console.log(error);
            });
        });
    }

    public on<MessageType>(event: "message" | "messageError", channel: string, listener: (message: MessageType) => void): void;
    public on(event: "disconnect", listener: () => void, nullValue?: null): void;

    public on(event: any, listenerOrChannel: any, nullOrListener: any) {
        if (typeof listenerOrChannel == "string" && typeof nullOrListener == "function") {
            (this.events as any)[event].push({
                channel: listenerOrChannel,
                listenerOrChannel: nullOrListener
            });
            return;
        }

        (this.events as any)[event].push(listenerOrChannel);
    }
}