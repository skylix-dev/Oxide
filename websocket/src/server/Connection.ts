import { WebSocket } from "ws";
import ConnectionCloseCodeRange from "./ConnectionCloseCodeRange";
import ConnectionErrors from "./ConnectionErrors";
import Server from "./Server";
import * as uuid from "uuid";

export default class Connection<CustomProperties> {
    /**
     * The actual WebSocket connection interaction object
     */
    private realWebSocketConnection: WebSocket;

    /**
     * Custom properties
     */
    public props: CustomProperties = {} as any;

    /**
     * Is the connection to the server alive
     */
    private connectionAlive = true;

    /**
     * The identifier for the connection
     */
    private identifier!: string;

    /**
     * The parent Oxide WebSocket server
     */
    private server: Server;

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
        disconnect: [] as ((code: number) => void)[]
    };

    /**
     * WebSocket server connection object
     */
    public constructor(connection: WebSocket, server: Server, onFinish: () => void, onDeath: (identifier: string, stateUpdatesDone: () => void) => void) {
        this.realWebSocketConnection = connection;
        this.server = server;
        
        const generateIdentifier = () => {
            this.identifier = uuid.v4();

            if (server.connectionExists(this.identifier)) {
                generateIdentifier();
            }
        };

        generateIdentifier();

        this.send("_system:status:ready").then(() => {
            onFinish();
        });

        connection.on("close", (code) => {
            this.connectionAlive = false;
            
            onDeath(this.identifier, () => {
                this.events.disconnect.forEach(event => event(code));
            });
        });

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

                if (typeof channel == "string" && typeof contents == "object" && !Array.isArray(contents)) {
                    this.events.message.forEach(event => {
                        if (event.channel == channel) {
                            event.listener(contents);
                        }
                    });
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
     * See if the connection is alive
     * @returns If the connection is alive
     */
    public isAlive(): boolean {
        return this.connectionAlive;
    }

    /**
     * Send a message to this connection
     * @param channel The channel to send the message on
     * @param message The actual message response
     * @returns Promise for is the message was sent
     */
    public send<MessageType>(channel: string, message: MessageType = {} as any): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.connectionAlive) {
                reject(ConnectionErrors.notAlive);
                return;
            }

            try {
                this.realWebSocketConnection.send(JSON.stringify({ message, channel }));
                resolve();
            } catch (error) {
                if (!this.realWebSocketConnection.CLOSING || !this.realWebSocketConnection.CLOSED) {
                    this.realWebSocketConnection.terminate();
                }

                this.connectionAlive = false;
                reject(ConnectionErrors.notAlive);
            }
        });
    }

    /**
     * Get the connection identifier
     */
    public getIdentifier(): string {
        return this.identifier;
    }

    /**
     * Kill the connection between the server and client
     * @param code Reason code for closing the connection
     * @param reason The actual reason for closing the connection
     */
    public disconnect(code?: ConnectionCloseCodeRange) {
        if (this.connectionAlive) {
            this.realWebSocketConnection.close(code);
        }
    }

    /**
     * Listen for message or message error events
     * @param event Event name
     * @param channel Channel to listen for messages on, or errors
     * @param listener Event callback
     */
    public on<MessageType>(event: "message" | "messageError", channel: string, listener: (message: MessageType) => void): void;

    // TODO: Split message and message error

    /**
     * Listen for when the connection disconnects from the server
     * @param event Event name
     * @param listener Event callback
     * @param nullValue This parameter serves no purpose with this event
     */
    public on(event: "disconnect", listener: (code: number) => void, nullValue?: null): void;

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
