import Command from "./Command";

export default interface Settings {
    /**
     * The renderer for the default help page
     */
    defaultHelpPageRenderer?: (commands: {
        name: string;
        description: string;
    }[], page: number, isInvalid: boolean) => void;

    /**
     * The renderer for a sub help page
     */
    specificHelpPageRenderer?: (commands: Command<any>[]) => void;

    /**
     * The renderer for command usage error
     */
    usageErrorRenderer?: (name: string, invalidFlags: string[], requiredFlags: string[]) => void;
}
