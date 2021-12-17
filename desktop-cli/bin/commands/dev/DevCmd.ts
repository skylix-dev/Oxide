import { anime, CommandParser } from "@illuxdev/oxide-terminal";
import path from "path/posix";
import AppConfig from "../../../src/AppConfig";
import Dev from "../../../src/dev/Dev";
import { DevErrors } from "../../../src/Exports";
import BaseFlags from "../../BaseFlags";
import { baseFlags, resolveConfig } from "../../Entry";
import Options from "./Options";

export default class DevCmd {
	/**
	 * The development server controller
	 */
	private devServer: Dev;

	/**
	 * The application config
	 */
	private config!: AppConfig;

	/**
	 * Start a development server
	 * @param cli Command parser
	 */
	public constructor(cli: CommandParser) {
		this.devServer = new Dev();

		cli.registerCommand<BaseFlags & Options>({
			name: "dev",
			description: "Start a development server",
			options: [
				...baseFlags!,
				{
					name: "port",
					description:
						"The port for the development server, any available is used if port is not provided, 3000 is used first",
					type: "number",
				},
			],
			handler: (args, flags) => {
				resolveConfig(flags.config, flags.readConfig).then((config) => {
					this.config = config;

					this.startRenderer(flags).then((port) => {
						this.startElectron(flags, port).then(() => {});
					});
				});
			},
		});
	}

	/**
	 * Start the rendering server in development
	 * @param flags Command flags
	 * @returns Promise for when server starts
	 */
	public startRenderer(flags: BaseFlags & Options): Promise<number> {
		anime.animate("Starting renderer in development");
		let time = 0;
		let timer = setInterval(() => {
			time++;
		}, 1000);

		return new Promise((resolve) => {
			this.devServer
				.startRenderer({
					projectRoot: process.cwd(),
					forcedPort: flags.port,
				})
				.then((port) => {
					clearInterval(timer);
					anime.stop(
						"Renderer has been started successfully at port " +
							port +
							" after " +
							time +
							"s",
						"success"
					);
					resolve(port);
				})
				.catch((error) => {
					clearInterval(timer);
					anime.stop(
						"Failed to start development server after " + time + "s",
						"error"
					);
				});
		});
	}

	/**
	 * Start the Electron development app
	 * @param flags Command flags
	 * @param port Server port
	 * @returns Promise for when the development app starts
	 */
	public startElectron(
		flags: BaseFlags & Options,
		port: number
	): Promise<void> {
		anime.animate("Starting Electron in development");

		return new Promise((resolve) => {
			let time = 0;
			let timer = setInterval(() => {
				time++;
			}, 1000);

			this.devServer
				.startElectron({
					port,
					electronMain: this.config.paths?.electronMain!,
					electronRoot: path
						.join(process.cwd(), this.config.paths?.electronRoot!)
						.replace(new RegExp(/\\/g), "/"),
					projectRoot: process.cwd(),
				})
				.then(() => {
					clearInterval(timer);
					anime.stop(
						"Electron has been started successfully in development after " +
							time +
							"s",
						"success"
					);
				})
				.catch((error) => {
					clearInterval(timer);

					switch (error) {
						case DevErrors.entryNotFound:
							this.devServer.stopRenderer();
							anime.stop(
								"Failed to start Electron in development because entry script was not found after " +
									time +
									"s",
								"error"
							);
							break;
					}
				});
		});
	}
}