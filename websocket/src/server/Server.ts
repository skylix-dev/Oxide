import http from "http";
import https from "https";
import Settings from "./Settings";
import { WebSocketServer } from "ws";

export default class Server {
    /**
     * The real WebSocket server core
     */
    private realWebSocketServer: WebSocketServer;

    /**
     * Settings for the WebSocket server
     */
    private settings: Settings;

    /**
     * Create a new WebSocket API server
     * @param settings Options for the WebSocket server
     */
    public constructor(settings: Settings) {

    }

    /**
     * Run the WebSocket API server
     */
    public run() {

    }
}