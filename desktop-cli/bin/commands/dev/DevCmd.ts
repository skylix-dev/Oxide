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
                    description: "The port for the development server, any available is used if port is not provided, 3000 is used first",
                    type: "number"
                }
            ],
            handler: (args, flags) => {
                resolveConfig(flags.config, flags.readConfig).then(config => {
                    this.config = config;

                    this.startRenderer(flags).then(port => {
                        this.startElectron(flags, port).then(() => {

                        });
                    });
                });
            }
        });
    }

    /**
     * Start the rendering server in development
     * @param flags Command flags
     * @returns Promise for when server starts
     */
    public startRenderer(flags: (BaseFlags & Options)): Promise<number> {
        anime.animate("Starting renderer in development");

        return new Promise(resolve => {
            this.devServer.startRenderer({
                projectRoot: process.cwd(),
                forcedPort: flags.port
            }).then(port => {
                anime.stop("Renderer has been started successfully at port " + port, "success");
                resolve(port);
            }).catch(error => {
                anime.stop("Failed to start development server", "error");
            })
        });
    }

    /**
     * Start the Electron development app
     * @param flags Command flags
     * @param port Server port
     * @returns Promise for when the development app starts
     */
    public startElectron(flags: (BaseFlags & Options), port: number): Promise<void> {
        anime.animate("Starting Electron in development");

        return new Promise(resolve => {
            this.devServer.startElectron({ 
                port,
                electronMain: this.config.paths?.electronMain!,
                electronRoot: path.join(process.cwd(), this.config.paths?.electronRoot!).replace(new RegExp(/\\/g), "/"),
                projectRoot: process.cwd()
            }).then(() => {
                anime.stop("Electron has been started successfully in development", "success");
            }).catch(error => {
                switch (error) {
                    case DevErrors.entryNotFound:
                        anime.stop("Failed to start Electron in development because entry script was not found", "error");
                        break;
                }
            });
        });
    }
}
