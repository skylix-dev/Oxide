import Command from "./Command";

export default interface Settings {
    defaultHelpPageRenderer?: (commands: {
        name: string;
        description: string;
        usage: string;
    }[]) => void;
    specificHelpPageRenderer?: (commands: Command[]) => void;
}
