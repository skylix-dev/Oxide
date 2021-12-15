#!/usr/bin/env node

import mergeDeep from 'merge-deep';
import { anime, CommandParser, logging } from "@illuxdev/oxide-terminal";
import Command from "@illuxdev/oxide-terminal/src/commandParser/Command";
import fs from "fs-extra";
import path from "path";
import AppConfig from "../src/AppConfig";
import BaseFlags from "./BaseFlags";
import { ModuleKind, transpileModule } from "typescript";

const cli = new CommandParser();
const defaultConfig: AppConfig = {
    name: "Unnamed App",
    paths: {
        electronMain: "electron/Main.ts",
        electronPreload: undefined,
        electronRoot: "electron"
    }
};

const resolveConfig = (configLocation = "app.config.ts", readConfig = true) => {
    return new Promise<AppConfig>(resolve => {
        if (!readConfig) {
            resolve(defaultConfig);
            return;
        }
    
        anime.animate("Reading application config");
    
        const loaded = (configModule: any) => {
            if (typeof configModule.default != "object") {
                anime.stop("The config does not provide an export named default, using default config instead", "error");

                resolve(defaultConfig);
                return;
            }

            anime.stop("App config loaded successfully", "success");
            resolve(mergeDeep(defaultConfig, configModule.default));
        }

        const appDir = path.join(process.cwd(), path.dirname(configLocation));
        const config = path.join(process.cwd(), configLocation);
        
        if (fs.existsSync(config)) {
            if (config.endsWith(".ts")) {
                const compiledTypeScript = transpileModule(fs.readFileSync(config).toString(), {
                    compilerOptions: {
                        module: ModuleKind.CommonJS
                    }
                });
    
                if (!fs.existsSync(path.join(appDir, "temp"))) {
                    fs.mkdir(path.join(appDir, "temp"));
                }
                
                fs.writeFileSync(path.join(appDir, "temp/app.config.js"), compiledTypeScript.outputText);

                import(path.join(appDir, "temp/app.config.js")).then(configModule => {
                    loaded(configModule);
                });
            } else if (config.endsWith(".js")) {
                import(path.join(appDir, "app.config.js")).then(configModule => {
                    loaded(configModule);
                }); 
            } else {
                anime.stop("Your app config must be a JavaScript (.js) or TypeScript (.ts) file, using default config instead", "warning");
                resolve(defaultConfig);
            }
            return;
        }
    
        anime.stop("Could not find app config, using default config instead", "warning");
        resolve(defaultConfig);
    });
}

const baseFlags: Command<any>["options"] = [
    {
        name: "config",
        description: "Path to the app config",
        type: "string"
    },
    {
        name: "readConfig",
        description: "Should the app config be read",
        type: "boolean"
    }
];

cli.registerCommand<BaseFlags>({
    name: "dev",
    description: "Start the application in development",
    handler: (args, flags) => {
        resolveConfig(flags.config, flags.readConfig).then(config => {
            console.log(config);
        });
    },
    options: [
        ...baseFlags
    ]
});

cli.execute();
