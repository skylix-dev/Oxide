import http, { Server as HttpServer } from "http";
import https, { Server as HttpsServer } from "https";
import Settings from "./Settings";
import { WebSocketServer } from "ws";
import mergeDeep from "merge-deep";
import Errors from "./Errors";
import Connection from "./Connection";

export default class Server {
    /**
     * The real WebSocket server core
     */
    private realWebSocketServer: WebSocketServer;

    /**
     * The external HTTP/HTTPS server for the socket server
     */
    private httpServer: HttpsServer | HttpServer;

    /**
     * Settings for the WebSocket server
     */
    private settings: Settings;

    /**
     * WebSocket server listening state
     */
    private running = false;

    /**
     * Is the WebSocket server in its booting state
     */
    private starting = false;

    /**
     * The public server event listeners storage
     */
    private events = {
        connect: [] as ((connection: Connection<any>) => void)[]
    };

    /**
     * Create a new WebSocket API server
     * @param settings Options for the WebSocket server
     */
    public constructor(settings: Settings) {
        const defaultSettings = {
            host: "0.0.0.0",
            ssl: false,
            pendingLimit: 10000
        } as Settings;

        this.settings = mergeDeep(defaultSettings, { ...settings });
        
        if (this.settings.ssl) {
            this.httpServer = https.createServer({
                cert: this.settings.ssl.certificate,
                key: this.settings.ssl.key
            });
        } else {
            this.httpServer = http.createServer();
        }

        this.realWebSocketServer = new WebSocketServer({
            server: this.httpServer
        });

        this.realWebSocketServer.on("connection", webSocketConnection => {
            const connection = new Connection(webSocketConnection);
            this.events.connect.forEach(event => event(connection));
        });
    }

    /**
     * Run the WebSocket server
     * @returns Promise for when the server is ready,
     */
    public run(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.running) {
                reject(Errors.alreadyRunning);
                return;
            }

            if (this.starting) {
                reject(Errors.alreadyStarting);
                return;
            }

            this.starting = true;

            this.httpServer.listen(this.settings.port, this.settings.host, this.settings.pendingLimit, () => {
                this.starting = false;
                this.running = true;

                resolve();
            });
        });
    }

    /**
     * Listen for new connections
     * @param event Event name
     * @param listener Event callback
     */
    public on<CustomConnectionProperties>(event: "connect", listener: (connection: Connection<CustomConnectionProperties>) => void): void;

    public on(event: any, listener: any) {
        (this.events as any)[event].push(listener);
    }
}
