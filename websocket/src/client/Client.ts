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
     * The settings for the Oxide client
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
     * The address of the Oxide server
     */
    public serverAddress: string;

    /**
     * Create a new Oxide server client
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
     * Generate a new connect URL to connect to an Oxide server
     * @returns The connect URL for the Oxide server
     */
    private generateConnectUri() {
        const prefix = this.settings.ssl ? "wss" : "ws";
        return prefix + "://" + this.settings.host + ":" + this.settings.port;
    }

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

            this.realWebSocket.on("open", () => {
                this.connecting = false;
                this.connected = true;

                resolve();
            });
        });
    }
}
