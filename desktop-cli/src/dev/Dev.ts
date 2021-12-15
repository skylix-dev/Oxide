import { spawn, ChildProcess } from "child_process";
import path from "path";
import ElectronSettings from "./ElectronSettings";
import Errors from "./Errors";
import RendererSettings from "./RendererSettings";

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
                console.log(settings)
                typeScriptProcess = spawn(this.npxTrigger, [ "tsc", "--watch" ], {
                    cwd: settings.electronRoot
                });

                typeScriptProcess.stdout?.on("data", data => {
                    if (!tscRunning) {
                        console.log(data.toString().split(""));
                        if (data.toString().startsWith("")) {
                            tscRunning = true;
                        }
                    }
                });
            }

            this.bootUpProcesses.electron = true;

            startTypeScript(() => {
                this.electronProcess = spawn(this.npxTrigger, [ "electron", settings.electronMain, settings.port + "" ]);
            });
        });
    }
}