import Command from "./Command";
import Errors from "./Errors";
import Settings from "./Settings";
import * as uuid from "uuid";
import mergeDeep from "merge-deep";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { logging } from "../Exports";
import HelpCommandFlags from "./HelpCommandFlags";

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
            defaultHelpPageRenderer: (commands, page, isInvalid) => {
                if (isInvalid) {
                    logging.warning("Sorry, but that command doesn't exist");
                }

                if (page < 1) {
                    logging.warning("Page " + page + " does not exist, showing results for page 1");
                    page = 1;
                }

                const commandPages: {
                    name: string,
                    description: string
                }[][] = [];

                const maxPerPage = 8;
                let buildingPage = 0;
                
                commands.forEach(command => {
                    if (commandPages[buildingPage] == undefined) {
                        commandPages.push([]);
                    }

                    if (commandPages[buildingPage].length < maxPerPage) {
                        commandPages[buildingPage].push(command);
                    } else {
                        buildingPage++;
                        commandPages.push([]);
                        commandPages[buildingPage].push(command);
                    }
                });

                if (commandPages[page - 1] == undefined) {
                    logging.warning("Page " + page + " does not exist, showing results for page 1");
                    page = 1;
                }

                logging.info("Help Commands | Page " + page + " of " + commandPages.length + " | 8 results max per page");
                logging.info(`Use "help --page <page number>" to change the page`);
                logging.info("");
                logging.info("Commands:");

                commandPages[page - 1].forEach(command => {
                    logging.info(`  ${command.name} - ${command.description}`);
                });
            },
            specificHelpPageRenderer: commands => {
                console.log(commands);
            },
            usageErrorRenderer: (name, invalid, missing) => {
                logging.info(`Invalid usage for command "${name}", use "help ${name}" to get a detailed list of commands and options`);

                if (invalid.length > 0) {
                    logging.error("Unexpected options were provided");

                    invalid.forEach(option => {
                        logging.info("  --" + option + "  <-  Invalid");
                    });
                } else if (missing.length > 0) {
                    logging.error("The following options were expected but not provided");

                    missing.forEach(option => {
                        logging.info("  --" + option + "  <-  Missing Option");
                    });
                }
            }
        } as Settings;

        this.settings = mergeDeep(defaultSettings, settings);

        this.registerCommand<HelpCommandFlags>({
            name: "help",
            description: "Get a list of all possible commands",
            options: [
                {
                    name: "page",
                    description: "The help page number",
                    type: "number"
                }
            ],
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

                this.settings.defaultHelpPageRenderer!(commands, options.page ?? 1, false);
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
                        if (typeof input == "boolean") {
                            return "boolean";
                        }

                        if (typeof input == "string") {
                            return "string";
                        }

                        if (typeof input == "number") {
                            return "number";
                        }

                        return "string";
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
                            registryCommand.options.forEach(option => {
                                if (option.type && commandOptions.hasOwnProperty(option.name)) {
                                    const optionType = observeDataType(commandOptions[option.name]);

                                    switch (option.type) {
                                        case "boolean":
                                            if (optionType != "boolean") {
                                                typeErrorFlags.push({
                                                    name: option.name,
                                                    expectedType: option.type,
                                                    givenType: optionType
                                                });
                                            }
                                            break;
                                        
                                        case "string":
                                            if (optionType != "string") {
                                                typeErrorFlags.push({
                                                    name: option.name,
                                                    expectedType: option.type,
                                                    givenType: optionType
                                                });
                                            }
                                            break;

                                        case "number":
                                            if (optionType != "number") {
                                                typeErrorFlags.push({
                                                    name: option.name,
                                                    expectedType: option.type,
                                                    givenType: optionType
                                                });
                                            }
                                            break;
                                    }
                                }
                            });

                            if (typeErrorFlags.length == 0) {
                                registryCommand.handler(parsedCommandData._.splice(1), commandOptions);
                                resolve();
                                return;
                            }

                            console.log("Flag type errors:", typeErrorFlags);
                            return;
                        }

                        return;
                    }
                } else {
                    registryCommand!.handler(parsedCommandData._.splice(1), commandOptions);
                    resolve();
                    return;
                }
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

            let isInvalidCommand = false;
            if (parsedCommandData._.length != 0 && !this.commandExists(parsedCommandData._[0])) {
                isInvalidCommand = true;
            }

            this.settings.defaultHelpPageRenderer!(commands, 1, isInvalidCommand);

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
