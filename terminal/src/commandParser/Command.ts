export default interface Command {
    name: string;
    description: string;
    handler: (args: string[], options: any) => void;
    options?: {
        name: string;
        description: string;
        type: "string" | "boolean" | "any" | "number";
        required?: boolean;
    }[];
}
