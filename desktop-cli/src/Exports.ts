import { anime, CommandParser, logging } from "@illuxdev/oxide-terminal";
import DevFlags from "./DevFlags";

const cli = new CommandParser();

cli.registerCommand<DevFlags>({
    name: "dev",
    description: "Start a development server for the app",
    handler: (args, flags) => {
        if (flags.readConfig == undefined || flags.readConfig == true) {
            
        }
    },
    options: [
        {
            name: "readConfig",
            type: "boolean",
            description: "Should OxideDesktopCli read the application config"
        }
    ]
})

cli.execute();
