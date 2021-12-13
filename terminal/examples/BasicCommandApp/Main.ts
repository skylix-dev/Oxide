import { CommandParser } from "../../src/Exports";

const cli = new CommandParser();

cli.registerCommand({
    name: "say-hello-world",
    description: "This command prints the text" + ` "Hello World!"`
}).then(identifier => {
    console.log("Command registered", "ID = " + identifier);
}).catch(errCode => {
    console.log("Err occurred", "CODE = " + errCode);
});

cli.execute("say-hello-world");
