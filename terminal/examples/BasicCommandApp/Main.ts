import { CommandParser, logging } from "../../src/Exports";

const app = new CommandParser();

app.registerCommand({
	name: "version",
	description: "Get the app version",
	handler: (args, flags) => {
		logging.info("The app does not have a version associated with it");
	},
});

app.registerCommand({
	name: "getFlags",
	description: "Get the app version",
	handler: (args, flags) => {
		logging.info("The app does not have a version associated with it");
	},
});

app.registerCommand({
	name: "getArgs",
	description: "Get the app version",
	handler: (args, flags) => {
		logging.info("The app does not have a version associated with it");
	},
});

app.registerCommand({
	name: "hello",
	description: "Get the app version",
	handler: (args, flags) => {
		logging.info("The app does not have a version associated with it");
	},
});

app.registerCommand({
	name: "bye",
	description: "Get the app version",
	handler: (args, flags) => {
		logging.info("The app does not have a version associated with it");
	},
});

app.registerCommand({
	name: "custom-color",
	description: "Get the app version",
	handler: (args, flags) => {
		logging.info("The app does not have a version associated with it");
	},
});

app.registerCommand({
	name: "echo",
	description: "Get the app version",
	handler: (args, flags) => {
		logging.info("The app does not have a version associated with it");
	},
});

app.registerCommand({
	name: "error",
	description: "Get the app version",
	handler: (args, flags) => {
		logging.info("The app does not have a version associated with it");
	},
});

app.execute();
