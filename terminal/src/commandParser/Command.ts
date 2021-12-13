export default interface Command {
    name: string;
    description: string;
    options?: {
        name: string;
        description: string;
        type: "string" | "boolean" | "any" | "number";
    }[];
}
