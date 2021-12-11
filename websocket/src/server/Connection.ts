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

            jsonParsePromise().then((messageObject: any) => {
                const channel: string | undefined | any = messageObject.channel;
                const contents: any | undefined = messageObject.message;

                if (typeof channel == "string" && typeof contents == "object") {

                }
            }).catch(error => {
                this.events.messageError.forEach(event => {
                    if (event.channel.length == 0) {
                        event.listener(new Error(`An error ocurred while parsing the JSON data in the message, JSON error: "${error.message}"`));
                    }
                })
            });
        });
    }

    /**
     * Listen for message or message error events
     * @param event Event name
     * @param channel Channel to listen for messages on, or errors
     * @param listener Event callback
     */
    public on<MessageType>(event: "message" | "messageError", channel: string, listener: (message: MessageType) => void): void;

    /**
     * Listen for when the connection disconnects from the server
     * @param event Event name
     * @param listener Event callback
     * @param nullValue This parameter serves no purpose with this event
     */
    public on(event: "disconnect", listener: () => void, nullValue?: null): void;

    public on(event: any, listenerOrChannel: any, nullOrListener: any) {
        if (typeof listenerOrChannel == "string" && typeof nullOrListener == "function") {
            (this.events as any)[event].push({
                channel: listenerOrChannel,
                listener: nullOrListener
            });
            return;
        }

        (this.events as any)[event].push(listenerOrChannel);
    }
}
