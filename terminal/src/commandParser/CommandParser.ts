import Command from "./Command";
import Errors from "./Errors";
import Settings from "./Settings";
import * as uuid from "uuid";
import mergeDeep from "merge-deep";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { logging } from "../Exports";

export default class CommandParser {
    /**
     * All of the registered commands
     */
    private commandRegistry: {
        [index: string]: Command<any>;
    } = {};

    /**
     * Constructor settings
     */
    private settings: Settings;

    /**
     * Parse CLI commands quickly with an easy to use and consistent API
     */
    public constructor(settings: Settings = {}) {
        const defaultSettings = {
            defaultHelpPageRenderer: commands => {
                logging.info("Help Commands | Page 1 of 1");
                logging.info(`Use "help --page <page number>" to change the page`);
                logging.info("");
                logging.info("Commands:");

                commands.forEach(command => {
                    logging.info(`  ${command.name} - ${command.description}`);
                });
            },
            specificHelpPageRenderer: commands => {
                console.log(commands);
            },
            usageErrorRenderer: (name, invalid, missing) => {
                console.log("Invalid Usage On Command: " + name, invalid, missing);
            }
        } as Settings;

        this.settings = mergeDeep(defaultSettings, settings);

        this.registerCommand({
            name: "help",
            description: "Get a list of all possible commands",
            handler: (args, options) => {
                const commands  = [] as any[];
                const registry = this.getAllCommands();

                for (const itemKey in registry) {
                    const item = registry[itemKey];

                    commands.push({
                        name: item.name,
                        description: item.description
                    });
                }

                this.settings.defaultHelpPageRenderer!(commands);
            }
        });
    } 

    /**
     * Check if a command exists in this registry
     * @param commandName The name of the command, or trigger name
     * @returns If the command exists in this registry
     */
    public commandExists(commandName: string) {
        for (const command in this.commandRegistry) {
            if (this.commandRegistry[command].name == commandName) {
                return true;
            }
        }

        return false;
    }

    /**
     * Get a command by its command trigger
     * @param commandName The command's trigger
     * @returns The command if it exists, other wise undefined
     */
    public getCommand<FlagTypes>(commandName: string): Command<FlagTypes> | undefined {
        for (const command in this.commandRegistry) {
            if (this.commandRegistry[command].name == commandName) {
                return this.commandRegistry[command];
            }
        }

        return undefined;
    } 

    /**
     * Execute a command from the registry from a string
     * @param commandString The raw full command to be executed
     * @param throwError Should the error be thrown through a rejection in the promise if there is an error
     */
    public execute(commandString: string | string[] = "", throwError = false): Promise<void> {
        return new Promise((resolve, reject) => {
            if (commandString.length == 0) {
                commandString = hideBin(process.argv);
            }

            const parsedCommandData = yargs.help(false).parse(commandString) as {
                _: string[],
                $0: any,
                [index: string]: any;
            };

            const commandOptions = {} as any;

            if (this.commandExists(parsedCommandData._[0] ?? "")) {
                for (const commandItem in parsedCommandData) {
                    if (commandItem != "_" && commandItem != "$0") {
                        commandOptions[commandItem] = parsedCommandData[commandItem];
                    }
                }
                
                const registryCommand = this.getCommand(parsedCommandData._[0]);

                if (registryCommand?.options && registryCommand.options.length > 0) {
                    let missingFlags = [] as string[];
                    let invalidFlags = [] as string[];
                    let typeErrorFlags = [] as {
                        name: string;
                        expectedType: string;
                        givenType: string;
                    }[];

                    const observeDataType: (input: any) => ("string" | "boolean" | "number") = (input: any) => {
                        if (input == "true" || input == true || input == false || input == "false") {
                            return "boolean";
                        }

                        if (typeof input == "string" && /^\d+$/.test(input)) {

                        }
                    }

                    registryCommand.options.forEach(option => {
                        if (option.required && !commandOptions.hasOwnProperty(option.name)) {
                            missingFlags.push(option.name);
                        }
                    });

                    if (missingFlags.length != 0) {
                        this.settings.usageErrorRenderer!(parsedCommandData._[0], invalidFlags, missingFlags);
                    }

                    if (missingFlags.length == 0) {
                        for (const inputFlag in commandOptions) {
                            if (!(registryCommand.options.filter(opt => opt.name == inputFlag).length > 0)) {
                                invalidFlags.push(inputFlag);
                            }
                        }

                        if (invalidFlags.length != 0) {
                            this.settings.usageErrorRenderer!(parsedCommandData._[0], invalidFlags, missingFlags);
                        } else {
                            const command = this.getCommand(parsedCommandData._[0]);
                            command?.handler([], {});
                        }
                    }
                }

                resolve();
                return;
            }

            const commands  = [] as any[];
            const registry = this.getAllCommands();

            for (const itemKey in registry) {
                const item = registry[itemKey];

                commands.push({
                    name: item.name,
                    description: item.description
                });
            }

            this.settings.defaultHelpPageRenderer!(commands);

            if (throwError) {
                reject(Errors.doesNotExist);
            }
        });
    }

    /**
     * Register a new command for usage
     * @param command A command object
     * @returns Promise for if the command was registered, it will also include the command identifier
     */
    public registerCommand<FlagTypes>(command: Command<FlagTypes>): Promise<string> {
        return new Promise((resolve, reject) => {
            for (const commandIdentifier in this.commandRegistry) {
                const commandItem = this.commandRegistry[commandIdentifier];
                if (command == commandItem) {
                    reject(Errors.alreadyExists);
                    return;
                }
            }

            let chosenIdentifier = uuid.v4();

            const generateIdentifier = () => {
                if (this.commandRegistry[chosenIdentifier]) {
                    chosenIdentifier = uuid.v4();
                    generateIdentifier();
                }
            }

            generateIdentifier();
            this.commandRegistry[chosenIdentifier] = command;

            resolve(chosenIdentifier);
        });
    }

    /**
     * Get all the commands that are registered
     * @returns All the commands from the registry
     */
    public getAllCommands(): { [index: string]: Command<any> } {
        return {...this.commandRegistry};
    }
}
