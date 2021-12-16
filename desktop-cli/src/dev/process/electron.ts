import { spawn } from "child_process";
import electron from "electron";

const vite = spawn(
	electron as unknown as string,
	[process.argv[3], process.argv[4]],
	{
		cwd: process.argv[2],
	}
);

vite.stdout.on("data", (data) => process.stdout.write(data.toString() + "\n"));
vite.stderr.on("data", (data) => process.stderr.write(data.toString() + "\n"));
