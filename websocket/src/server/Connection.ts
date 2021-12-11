import { WebSocket } from "ws";

export default class Connection {
    /**
     * The actual WebSocket connection interaction object
     */
    private realWebSocketConnection: WebSocket;

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
}