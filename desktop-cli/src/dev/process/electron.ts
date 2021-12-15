import { spawn } from "child_process";

const vite = spawn(process.platform == "win32" ? "npx.cmd" : "npx", [ "electron", process.argv[3], process.argv[4] ], {
    cwd: process.argv[2]
});

vite.stdout.on("data", data => process.stdout.write(data.toString()));
vite.stderr.on("data", data => process.stderr.write(data.toString()));
