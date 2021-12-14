export default interface Command<FlagTypes> {
    name: string;
    description: string;
    handler: (args: string[], options: FlagTypes) => void;
    options?: {
        name: string;
        description: string;
        type: "string" | "boolean" | "any" | "number";
        required?: boolean;
    }[];
}
