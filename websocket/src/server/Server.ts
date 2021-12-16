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
	 * All of the currently connected clients
	 */
	private openConnections: Connection<any>[] = [];

	/**
	 * The number of currently alive connections to the server
	 */
	private totalConnected = 0;

	/**
	 * The public server event listeners storage
	 */
	private events = {
		connect: [] as ((connection: Connection<any>) => void)[],
	};

	/**
	 * Create a new WebSocket API server
	 * @param settings Options for the WebSocket server
	 */
	public constructor(settings: Settings) {
		const defaultSettings = {
			host: "0.0.0.0",
			ssl: false,
			pendingLimit: 10000,
		} as Settings;

		this.settings = mergeDeep(defaultSettings, { ...settings });

		if (this.settings.ssl) {
			this.httpServer = https.createServer({
				cert: this.settings.ssl.certificate,
				key: this.settings.ssl.key,
			});
		} else {
			this.httpServer = http.createServer();
		}

		this.realWebSocketServer = new WebSocketServer({
			server: this.httpServer,
		});

		this.realWebSocketServer.on("connection", (webSocketConnection) => {
			const connection = new Connection(
				webSocketConnection,
				this,
				() => {
					this.openConnections.push(connection);
					this.totalConnected = this.openConnections.length;

					this.events.connect.forEach((event) => event(connection));
				},
				(identifier, stateUpdatesDone) => {
					this.openConnections.forEach((deadConnection, index) => {
						if (deadConnection.getIdentifier() == identifier) {
							let newOpenConns = [] as Connection<any>[];

							this.openConnections.forEach((openConn) => {
								if (openConn.isAlive()) {
									newOpenConns.push(openConn);
								}
							});

							this.openConnections = newOpenConns;
							this.totalConnected = newOpenConns.length;
							stateUpdatesDone();
						}
					});
				}
			);
		});
	}

	/**
	 * Get the number of total connections
	 * @returns The number of total connections
	 */
	public countTotalClients(): number {
		return this.totalConnected;
	}

	/**
	 * Send a message to every open connection
	 * @param channel The channel to send the message on
	 * @param message The actual message
	 */
	public emit<MessageType>(channel: string, message: MessageType = {} as any) {
		this.openConnections.forEach((connection) => {
			connection.send(channel, message).catch(() => {});
		});
	}

	/**
	 * Get a connection based on it identifier
	 * @param identifier The identifier of the connection
	 * @returns The connection, if it doesn't exist or is not alive, undefined is returned
	 */
	public getConnection<ConnectionPropType>(
		identifier: string
	): Connection<ConnectionPropType> | undefined {
		let result: Connection<ConnectionPropType> | undefined = undefined;

		this.openConnections.forEach((connection) => {
			if (connection.isAlive() && connection.getIdentifier() == identifier) {
				result = connection;
			}
		});

		return result;
	}

	/**
	 * Get all currently connected clients
	 * @returns All the alive and connected connections
	 */
	public getConnections<
		ConnectionPropType
	>(): Connection<ConnectionPropType>[] {
		return [...this.openConnections];
	}

	/**
	 * Check if a connection exists and is alive on this server
	 * @param identifier The connection identifier
	 * @returns If the connection is alive and exists on this server
	 */
	public connectionExists(identifier: string): boolean {
		let exists = false;

		this.openConnections.forEach((connection) => {
			if (connection.isAlive() && connection.getIdentifier() == identifier) {
				exists = true;
			}
		});

		return exists;
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

			this.httpServer.listen(
				this.settings.port,
				this.settings.host,
				this.settings.pendingLimit,
				() => {
					this.starting = false;
					this.running = true;

					resolve();
				}
			);
		});
	}

	/**
	 * Stop the websocket server
	 * @returns Promise for if the server was stopped
	 */
	public stop(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (!this.running) {
				reject(Errors.notRunning);
				return;
			}

			this.httpServer.on("close", () => {
				this.running = false;
				resolve();
			});

			if (this.openConnections.length > 0) {
				this.openConnections.forEach((connection) => {
					connection.disconnect();
				});

				this.httpServer.close();
				return;
			}

			this.httpServer.close();
		});
	}

	/**
	 * Listen for new connections
	 * @param event Event name
	 * @param listener Event callback
	 */
	public on<CustomConnectionProperties>(
		event: "connect",
		listener: (connection: Connection<CustomConnectionProperties>) => void
	): void;

	public on(event: any, listener: any) {
		(this.events as any)[event].push(listener);
	}
}
