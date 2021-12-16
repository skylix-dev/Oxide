import { BrowserWindow, app } from "electron";
import { initialize, enable } from "@electron/remote/main";

app.once("ready", () => {
	const win = new BrowserWindow({
		width: 1200,
		height: 600,
		show: false,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	});

	enable(win.webContents);
	initialize();

	const send = (data: any) => {
		process.stdout.write(JSON.stringify(data));
	};

	win.on("show", () => {
		send({
			channel: "_internal:window:action",
			message: {
				action: "show",
			},
		}); 
	});  

	win
		.loadURL("http://localhost:" + process.argv[process.argv.length - 1])
		.then(() => {
			send({
				channel: "_internal:setup:task",
				message: { 
					renderer: {
						success: true,
					},
				},
			});

			win.show();
		})
		.catch((error) => {
			send({
				channel: "_internal:setup:task",
				message: {
					renderer: {
						success: false,
						error: error.message,
					},
				},
			});
		});
});
