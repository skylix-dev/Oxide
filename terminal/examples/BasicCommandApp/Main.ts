import { CommandParser, logging } from "../../src/Exports";

const cli = new CommandParser();

interface SayHelloFlags {
    customName?: string;
    cute?: boolean;
}

cli.registerCommand<SayHelloFlags>({
    name: "say-hello-world",
    description: "This command prints the text" + ` "Hello World!"`,
    handler: (args, options) => {
        if (options.cute) {
            logging.info("Cute [###########] Generic");
        } else {
            logging.info("Cute [#          ] Generic");
        }

        if (options.cute) {
            console.log(`Hewo ${options.customName ?? "wowld"} uwu`);
            return;
        }

        console.log(`Hello ${options.customName ?? "world"}!`);
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
            type: "boolean",
            required: true
        }
    ]
});

cli.registerCommand<SayHelloFlags>({
    name: "say-hello-world",
    description: "This command prints the text" + ` "Hello World!"`,
    handler: (args, options) => {
        if (options.cute) {
            console.log(`Hewo ${options.customName ?? "wowld"} uwu`);
            return;
        }

        console.log(`Hello ${options.customName ?? "world"}!`);
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

cli.registerCommand<SayHelloFlags>({
    name: "say-hello-world",
    description: "This command prints the text" + ` "Hello World!"`,
    handler: (args, options) => {
        if (options.cute) {
            console.log(`Hewo ${options.customName ?? "wowld"} uwu`);
            return;
        }

        console.log(`Hello ${options.customName ?? "world"}!`);
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

cli.registerCommand<SayHelloFlags>({
    name: "say-hello-world",
    description: "This command prints the text" + ` "Hello World!"`,
    handler: (args, options) => {
        if (options.cute) {
            console.log(`Hewo ${options.customName ?? "wowld"} uwu`);
            return;
        }

        console.log(`Hello ${options.customName ?? "world"}!`);
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

cli.registerCommand<SayHelloFlags>({
    name: "say-hello-world",
    description: "This command prints the text" + ` "Hello World!"`,
    handler: (args, options) => {
        if (options.cute) {
            console.log(`Hewo ${options.customName ?? "wowld"} uwu`);
            return;
        }

        console.log(`Hello ${options.customName ?? "world"}!`);
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

cli.registerCommand<SayHelloFlags>({
    name: "say-hello-world",
    description: "This command prints the text" + ` "Hello World!"`,
    handler: (args, options) => {
        if (options.cute) {
            console.log(`Hewo ${options.customName ?? "wowld"} uwu`);
            return;
        }

        console.log(`Hello ${options.customName ?? "world"}!`);
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

cli.registerCommand<SayHelloFlags>({
    name: "say-hello-world",
    description: "This command prints the text" + ` "Hello World!"`,
    handler: (args, options) => {
        if (options.cute) {
            console.log(`Hewo ${options.customName ?? "wowld"} uwu`);
            return;
        }

        console.log(`Hello ${options.customName ?? "world"}!`);
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

cli.registerCommand<SayHelloFlags>({
    name: "say-hello-world",
    description: "This command prints the text" + ` "Hello World!"`,
    handler: (args, options) => {
        if (options.cute) {
            console.log(`Hewo ${options.customName ?? "wowld"} uwu`);
            return;
        }

        console.log(`Hello ${options.customName ?? "world"}!`);
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

cli.registerCommand<SayHelloFlags>({
    name: "say-hello-world",
    description: "This command prints the text" + ` "Hello World!"`,
    handler: (args, options) => {
        if (options.cute) {
            console.log(`Hewo ${options.customName ?? "wowld"} uwu`);
            return;
        }

        console.log(`Hello ${options.customName ?? "world"}!`);
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

cli.registerCommand<SayHelloFlags>({
    name: "say-hello-world",
    description: "This command prints the text" + ` "Hello World!"`,
    handler: (args, options) => {
        if (options.cute) {
            console.log(`Hewo ${options.customName ?? "wowld"} uwu`);
            return;
        }

        console.log(`Hello ${options.customName ?? "world"}!`);
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

cli.registerCommand<SayHelloFlags>({
    name: "say-hello-world",
    description: "This command prints the text" + ` "Hello World!"`,
    handler: (args, options) => {
        if (options.cute) {
            console.log(`Hewo ${options.customName ?? "wowld"} uwu`);
            return;
        }

        console.log(`Hello ${options.customName ?? "world"}!`);
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

cli.registerCommand<SayHelloFlags>({
    name: "say-hello-world",
    description: "This command prints the text" + ` "Hello World!"`,
    handler: (args, options) => {
        if (options.cute) {
            console.log(`Hewo ${options.customName ?? "wowld"} uwu`);
            return;
        }

        console.log(`Hello ${options.customName ?? "world"}!`);
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

cli.registerCommand<SayHelloFlags>({
    name: "say-hello-world",
    description: "This command prints the text" + ` "Hello World!"`,
    handler: (args, options) => {
        if (options.cute) {
            console.log(`Hewo ${options.customName ?? "wowld"} uwu`);
            return;
        }

        console.log(`Hello ${options.customName ?? "world"}!`);
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
            type: "boolean",
            required: true
        }
    ]
});

cli.registerCommand<SayHelloFlags>({
    name: "say-hello-world",
    description: "This command prints the text" + ` "Hello World!"`,
    handler: (args, options) => {
        if (options.cute) {
            console.log(`Hewo ${options.customName ?? "wowld"} uwu`);
            return;
        }

        console.log(`Hello ${options.customName ?? "world"}!`);
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

cli.execute();