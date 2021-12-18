import { Settings } from './Settings';
import mergeDeep from "merge-deep";
import { BrowserWindow, app, dialog } from "electron";
import isDev from "electron-is-dev";
import InternalSetupTask from './InternalSetupTask';
import Errors from './Errors';
import { initialize as initRemote, enable as remoteEnable } from "@electron/remote/main";

export default class DesktopElectron {
	/**
	 * Settings for the instance
	 */
	private settings: Settings;

	/**
	 * Is the app ready
	 */
	private appReady = false;

	/**
	 * The app window
	 */
	private browserWindow?: BrowserWindow;

	/**
	 * Create a new Electron instance (This class must be used for oxide-desktop-gui to work correctly)
	 */
	public constructor(settings: Settings) {
		const defaultSettings = {
			width: 1200,
			height: 800
		} as Settings;

		if (app.isReady()) {
			this.appReady = true;
		} else {
			app.once("ready", () => {
				this.appReady = true;
			});
		}

		this.settings = mergeDeep(defaultSettings, settings);
	}

	/**
	 * Run the app
	 */
	public run() {
		const logic = () => {
			this.browserWindow = new BrowserWindow({
				width: this.settings.width,
				height: this.settings.height,
                show: false,
				frame: false,
				webPreferences: {
					nodeIntegration: true,
					contextIsolation: false,
					webviewTag: true,
					enableWebSQL: true,
					webSecurity: true,
					webgl: true
				}
			});

			remoteEnable(this.browserWindow!.webContents);
			initRemote();

            if (isDev) {
                this.browserWindow.loadURL("http://localhost:" + process.argv[2]).then(() => {
					this.command<InternalSetupTask>("_internal:setup:task", {
						renderer: {
							success: true
						}
					});

                    this.browserWindow?.show();
                }).catch(() => {
					dialog.showErrorBox("Failed to start", "Failed to start development app because renderer source does not seem to be active");
				});
            }
		}

		if (this.appReady) {
			logic();
			return;
		}

		app.once("ready", () => {
			this.appReady = true;
            logic();
		});
	}

	/**
	 * Send a command to the dev server
	 * @param channel Channel name
	 * @param message The actual message
	 */
	private command<MessageType>(channel: string, message: MessageType = {} as any) {
		console.log(JSON.stringify({ channel, message }));
	}

	/**
	 * Send a message to the renderer
	 * @param channel Channel name
	 * @param message The actual message
	 * @returns Promise for if the message was sent
	 */
	public send<MessageType>(channel: string, message: MessageType = {} as any): Promise<void> {
		return new Promise((resolve, reject) => {
			if (!this.browserWindow) {
				reject(Errors.appNotRunning);
				return;
			}

			this.browserWindow.webContents.send(channel, message);
			resolve();
		});
	}
}
 