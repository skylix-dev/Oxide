import { CommandParser } from "../../src/Exports";

const cli = new CommandParser();

interface SayHelloFlags {
    customName?: string;
}

cli.registerCommand<SayHelloFlags>({
    name: "say-hello-world",
    description: "This command prints the text" + ` "Hello World!"`,
    handler: (args, options) => {
        console.log(args, options);
    },
    options: [
        {
            name: "customName",
            description: "Use a different name instead of world",
            type: "string"
        },
        {
            name: "cute",
            description: "Make it cute",
            type: "boolean"
        }
    ]
});

setTimeout(() => {
    cli.execute();
}, 1000);
