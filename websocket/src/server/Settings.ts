export default interface Settings {
	/**
	 * Listening port of the server
	 */
	port: number;

	/**
	 * Host name for the server
	 */
	host?: string;

	/**
	 * Limit for the amount of pending connections
	 */
	pendingLimit?: number;

	/**
	 * The SSL certificate info for the server to use with wss:// instead of ws://
	 */
	ssl?:
		| false
		| {
				/**
				 * The SSL certificate
				 */
				certificate?: string;

				/**
				 * The SSL certificate key
				 */
				key?: string;
		  };
}
