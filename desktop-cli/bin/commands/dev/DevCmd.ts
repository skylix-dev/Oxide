import { anime, CommandParser } from "@illuxdev/oxide-terminal";
import path from "path/posix";
import Dev from "../../../src/dev/Dev";
import BaseFlags from "../../BaseFlags";
import { baseFlags, resolveConfig } from "../../Entry";
import Options from "./Options";

export default class DevCmd {
    /**
     * The development server controller
     */
    private devServer: Dev;

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
                    anime.animate("Starting application in development");

                    this.startRenderer(flags).then(() => {
                        
                    });
                });
            }
        });
    }

    public startRenderer(flags: (BaseFlags & Options)): Promise<number> {
        return new Promise((resolve, reject) => {
            this.devServer.startRenderer({
                projectRoot: path.join(process.cwd()),
                forcedPort: flags.port
            });
        });
    }
}
