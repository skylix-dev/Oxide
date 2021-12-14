import Command from "./Command";
import Errors from "./Errors";
import Settings from "./Settings";
import * as uuid from "uuid";
import mergeDeep from "merge-deep";
import yargs from "yargs";

export default class CommandParser {
    /**
     * All of the registered commands
     */
    private commandRegistry: {
        [index: string]: Command;
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
                console.log(commands);
            },
            specificHelpPageRenderer: commands => {
                console.log(commands);
            }
        } as Settings;

        this.settings = mergeDeep(defaultSettings, settings);
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
    public getCommand(commandName: string): Command | undefined {
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
    public execute(commandString: string, throwError = false): Promise<void> {
        return new Promise((resolve, reject) => {
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

                    registryCommand.options.forEach(option => {
                        if (option.required && !commandOptions.hasOwnProperty(option.name)) {
                            missingFlags.push(option.name);
                        }
                    });

                    for (const inputFlag in commandOptions) {
                        if (!(registryCommand.options.filter(opt => opt.name == inputFlag).length > 0)) {
                            invalidFlags.push(inputFlag);
                        }
                    }

                    console.log(missingFlags, invalidFlags);
                }

                resolve();
                return;
            }

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
    public registerCommand(command: Command): Promise<string> {
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
    public getAllCommands(): { [index: string]: Command } {
        return {...this.commandRegistry};
    }
}
