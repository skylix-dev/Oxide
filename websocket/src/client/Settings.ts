export default interface Settings {
    /**
     * The port of the Oxide server to connect to
     */
    port: number;

    /**
     * The host of the Oxide server to connect to
     */
    host?: string;

    /**
     * Does the Oxide server host use an SSL certificate
     */
    ssl?: boolean;
}
