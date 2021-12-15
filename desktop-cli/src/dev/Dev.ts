import { spawn, ChildProcess } from "child_process";
import path from "path/posix";
import Errors from "./Errors";
import RendererSettings from "./RendererSettings";

export default class Dev {
    /**
     * All processes living status
     */
    private life = {
        renderer: false,
        electron: false,
        typeScript: false
    };

    /**
     * All processes that are booting
     */
    private bootUpProcesses = {
        renderer: false,
        electron: false,
        typeScript: false
    };

    /**
     * Process of the renderer
     */
    private rendererProcess?: ChildProcess;

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
        });      
    }
}