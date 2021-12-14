import Command from "./Command";

export default interface Settings {
    /**
     * The renderer for the default help page
     */
    defaultHelpPageRenderer?: (commands: {
        name: string;
        description: string;
    }[]) => void;

    /**
     * The renderer for a sub help page
     */
    specificHelpPageRenderer?: (commands: Command[]) => void;

    /**
     * The renderer for command usage error
     */
    usageErrorRenderer?: (name: string, invalidFlags: string[], requiredFlags: string[]) => void;
}
