#!/usr/bin/env node

import mergeDeep from "merge-deep";
import { anime, CommandParser } from "@illuxdev/oxide-terminal";
import Command from "@illuxdev/oxide-terminal/src/commandParser/Command";
import fs from "fs-extra";
import path from "path";
import AppConfig from "../src/AppConfig";
import { ModuleKind, transpileModule } from "typescript";
import BuildCmd from "./commands/build/BuildCmd";
import DevCmd from "./commands/dev/DevCmd";

const cli = new CommandParser();
const defaultConfig: AppConfig = {
	name: "Unnamed App",
	paths: {
		electronMain: "electron/Main.ts",
		electronPreload: undefined,
		electronRoot: "electron",
		otherElectronDirs: []
	},
};

/**
 * Get an app config
 * @param configLocation Location of the config
 * @param readConfig Should the config be read
 * @returns Promise containing app config
 */
export function resolveConfig(
	configLocation = "app.config.ts",
	readConfig = true
): Promise<AppConfig> {
	return new Promise<AppConfig>((resolve) => {
		if (!readConfig) {
			resolve(defaultConfig);
			return;
		}

		anime.animate("Reading application config");

		const loaded = (configModule: any) => {
			if (typeof configModule.default != "object") {
				anime.stop(
					"The config does not provide an export named default, using default config instead",
					"error"
				);

				resolve(defaultConfig);
				return;
			}

			anime.stop("App config loaded successfully", "success");
			resolve(mergeDeep(defaultConfig, configModule.default));
		};

		const appDir = path.join(process.cwd(), path.dirname(configLocation));
		const config = path.join(process.cwd(), configLocation);

		if (fs.existsSync(config)) {
			if (config.endsWith(".ts")) {
				const compiledTypeScript = transpileModule(
					fs.readFileSync(config).toString(),
					{
						compilerOptions: {
							module: ModuleKind.CommonJS,
						},
					}
				);

				if (!fs.existsSync(path.join(appDir, "temp"))) {
					fs.mkdir(path.join(appDir, "temp"));
				}

				fs.writeFileSync(
					path.join(appDir, "temp/app.config.js"),
					compiledTypeScript.outputText
				);

				import(path.join(appDir, "temp/app.config.js")).then((configModule) => {
					loaded(configModule);
				});
			} else if (config.endsWith(".js")) {
				import(path.join(appDir, config)).then((configModule) => {
					loaded(configModule);
				});
			} else {
				anime.stop(
					"Your app config must be a JavaScript (.js) or TypeScript (.ts) file, using default config instead",
					"warning"
				);
				resolve(defaultConfig);
			}
			return;
		}

		anime.stop(
			"Could not find app config, using default config instead",
			"warning"
		);
		resolve(defaultConfig);
	});
}

const baseFlags: Command<any>["options"] = [
	{
		name: "config",
		description: "Path to the app config",
		type: "string",
	},
	{
		name: "readConfig",
		description: "Should the app config be read",
		type: "boolean",
	},
];

export { baseFlags };
const commandLoaders = [BuildCmd, DevCmd] as any[];

commandLoaders.forEach((CommandConstructor) => {
	new CommandConstructor(cli);
});

cli.execute();
