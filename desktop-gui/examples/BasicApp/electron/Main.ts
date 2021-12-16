import { BrowserWindow, app } from "electron";

app.once("ready", () => {
	const win = new BrowserWindow({
		width: 1200,
		height: 600,
		show: false,
		titleBarOverlay: true,
		titleBarStyle: "hidden",
	});

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

	console.log(process.argv);

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
