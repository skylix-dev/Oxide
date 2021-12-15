import { anime, CommandParser } from "@illuxdev/oxide-terminal";
import BaseFlags from "../../BaseFlags";
import { baseFlags, resolveConfig } from "../../Entry";
import Options from "./Options";

export default class DevCmd {
    /**
     * Start a development server
     * @param cli Command parser
     */
    public constructor(cli: CommandParser) {
        cli.registerCommand<BaseFlags & Options>({
            name: "dev",
            description: "Start a development server",
            options: [ ...baseFlags! ],
            handler: (args, flags) => {
                resolveConfig(flags.config, flags.readConfig).then(config => {
                    anime.animate("Starting application in development");
                });
            }
        });
    }
}
