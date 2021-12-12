import Settings from "./Settings";
import WebSocket from "ws";
import mergeDeep from "merge-deep";
import Errors from "./Errors";

export default class Client {
    /**
     * The actual WebSocket client
     */
    private realWebSocket?: WebSocket;

    /**
     * The settings for the Oxide WebSocket client
     */
    private settings: Settings;

    /**
     * Is the server connecting currently
     */
    private connecting = false;

    /**
     * Is the server connection alive
     */
    private connected = false;

    /**
     * The address of the Oxide WebSocket server
     */
    public serverAddress: string;

    /**
     * All event listener callbacks
     */
    private events = {
        disconnect: [] as ((code: number, reason: string) => void)[],
        message: [] as {
            channel: string;
            listener: (message: any) => void;
        }[]
    };

    /**
     * Create a new Oxide WebSocket server client
     * @param settings Settings for the Oxide server client
     */
    public constructor(settings: Settings) {
        const defaultSettings = {
            host: "0.0.0.0",
            ssl: false
        } as Settings;

        this.settings = mergeDeep(defaultSettings, settings);
        this.serverAddress = this.generateConnectUri();
    }

    /**
     * Generate a new connect URL to connect to an Oxide WebSocket server
     * @returns The connect URL for the Oxide server
     */
    private generateConnectUri() {
        const prefix = this.settings.ssl ? "wss" : "ws";
        return prefix + "://" + this.settings.host + ":" + this.settings.port;
    }

    /**
     * Send a message to the Oxide WebSocket server
     * @param channel The channel to send the message in
     * @param message The actual message data
     * @returns Promise for if the message was sent
     */
    public send<MessageType>(channel: string, message: MessageType = {} as any): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.connected) {
                reject(Errors.notAlive);
                return;
            }

            try {
                this.realWebSocket?.send(JSON.stringify({ channel, message }));
                resolve();
            } catch (error) {
                reject(Errors.notAlive);
            }
        });
    }

    /**
     * 
     * @returns Promise for when the client is connected to an Oxide WebSocket server
     */
    public run(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.connected) {
                reject(Errors.alreadyConnected);
                return;
            }

            if (this.connecting) {
                reject(Errors.alreadyConnecting);
                return;
            }

            this.connecting = true;
            this.realWebSocket = new WebSocket(this.serverAddress);

            this.realWebSocket.on("close", (ws: unknown, code: number, reason: any) => {
                console.log(reason);
                this.connected = false;
                this.events.disconnect.forEach(event => event(code, reason ?? ""));
            });

            this.realWebSocket.on("open", () => {
                this.connecting = false;
                this.connected = true;

                resolve();
            });
        });
    }

    /**
     * Listen for when the server disconnects
     * @param event Event name
     * @param listener Event callback
     * @param nullValue This value should not be used
     */
    public on(event: "disconnect", listener: (code: number, reason: string) => void, nullValue?: any): void;

    /**
     * Listen for message events from the server
     * @param event Event type
     * @param channel Channel for listening for messages
     * @param listener Event callback
     */
    public on<MessageType>(event: "message", channel: string, listener: (message: MessageType) => void): void;

    public on(event: any, listenerOrChannel: any, nullOrListener: any) {
        if (typeof listenerOrChannel == "string" && typeof nullOrListener == "function") {
            this.events.message.push({
                channel: listenerOrChannel,
                listener: nullOrListener
            });
            return;
        }

        (this.events as any)[event].push(listenerOrChannel);
    }
}
