import { spawn, ChildProcess } from "child_process";
import path from "path";
import ElectronSettings from "./ElectronSettings";
import Errors from "./Errors";
import RendererSettings from "./RendererSettings";
import fs from "fs-extra";

export default class Dev {
    /**
     * All processes living status
     */
    private life = {
        renderer: false,
        electron: false
    };

    /**
     * All processes that are booting
     */
    private bootUpProcesses = {
        renderer: false,
        electron: false
    };

    /**
     * Process of the renderer
     */
    private rendererProcess?: ChildProcess;

    /**
     * Process of the Electron development app
     */
    private electronProcess?: ChildProcess;

    /**
     * Command for running npx via spawn
     */
    private npxTrigger: string;

    /**
     * Create a new development server
     * @param settings Settings for the dev server
     */
    public constructor() {
        this.npxTrigger = process.platform == "win32" ? "npx.cmd" : "npx";
    }

    /**
     * Start the rendering server
     * @param settings Settings for the renderer
     * @returns A promise containing the server port if successful
     */
    public startRenderer(settings: RendererSettings): Promise<number> {
        return new Promise((resolve, reject) => {
            if (this.bootUpProcesses.renderer) {
                reject(Errors.alreadyStarting);
                return;
            }

            if (this.life.renderer) {
                reject(Errors.alreadyRunning);
                return;
            }

            this.bootUpProcesses.renderer = true;

            const portFlag = settings.forcedPort ? "--port=" + settings.forcedPort : "";

            this.rendererProcess = spawn(this.npxTrigger, [ "vite", portFlag ], {
                cwd: settings.projectRoot
            });

            const output = (text: string) => {
                if (!this.life.renderer) {
                    const regexp = /  > Local: http:\/\/(.*?):(.*?)\/\n  > Network/.exec(text);
                    
                    if (regexp) {
                        this.life.renderer = true;
                        resolve(+regexp[2]);
                    }
                }
            }

            this.rendererProcess?.stdout?.on("data", t => output(t.toString()));
            this.rendererProcess?.stderr?.on("data", t => output(t.toString()));
        });      
    }

    /**
     * Start an Electron development app
     * @param settings Settings for the Electron starter
     * @returns Promise for when app has been started, error will contain an error from Error export
     */
    public startElectron(settings: ElectronSettings): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.bootUpProcesses.electron) {
                reject(Errors.alreadyStarting);
                return;
            } 

            if (this.life.electron) {
                reject(Errors.alreadyRunning);
            }

            let typeScriptProcess: ChildProcess;
            let tscRunning = false;

            const startTypeScript = (done: CallableFunction) => {
                typeScriptProcess = spawn(this.npxTrigger, [ "tsc", "--watch", "--module", "commonjs", "--target", "esnext" ], {
                    cwd: settings.electronRoot
                });

                typeScriptProcess.stdout?.on("data", data => {
                    if (!tscRunning) {
                        if (data.toString().includes("Watching for file changes.\r\n")) {
                            tscRunning = true;
                            done();
                        }
                    }
                });
            }

            this.bootUpProcesses.electron = true;

            startTypeScript(() => {
                let electronFullMainPath = path.join(settings.projectRoot, settings.electronMain);
                if (electronFullMainPath.endsWith(".ts")) {
                    electronFullMainPath.slice(0, -1) + ".ts"
                }

                if (!fs.existsSync(electronFullMainPath)) {
                    reject(Errors.entryNotFound);
                    return;
                }

                this.electronProcess = spawn(this.npxTrigger, [ "electron", settings.electronMain.slice(0, -2) + "js", settings.port + "" ], {
                    cwd: settings.projectRoot
                });

                this.electronProcess.stdout?.on("data", data => {
                    const promiseJsonParse = <ObjectType>(stringifiedJson: string) => {
                        return new Promise<ObjectType>((resolve, reject) => {
                            try {
                                const jsonObject = JSON.parse(stringifiedJson);
                                resolve(jsonObject);
                            } catch (error) {
                                reject(error);
                            }
                        });
                    }

                    promiseJsonParse<any>(data.toString()).then((message) => {
                        switch (message.channel) {
                            case "_internal:setup:task":
                                if (message.message.renderer.success) {
                                    resolve();
                                }
                                break;
                        }
                    }).catch(() => {});
                });
            });
        });
    }
}
