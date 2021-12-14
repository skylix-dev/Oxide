import { CommandParser } from "../../src/Exports";

const cli = new CommandParser();

interface SayHelloFlags {
    customName?: string;
}

cli.registerCommand({
    name: "say-hello-world",
    description: "This command prints the text" + ` "Hello World!"`,
    handler: (args, options: SayHelloFlags) => {
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
            required: true,
            type: "boolean"
        }
    ]
}).then(identifier => {
    cli.execute("say-hello-world --customName XFaon --invalidFlag");
}).catch(errCode => {
    console.log("Err occurred", "CODE = " + errCode);
});
