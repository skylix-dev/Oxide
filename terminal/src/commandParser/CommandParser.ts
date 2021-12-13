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
     * Execute a command from the registry from a string
     * @param commandString The raw full command to be executed
     */
    public execute(commandString: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const parsedCommandData = yargs
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
