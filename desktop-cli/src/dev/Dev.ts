import { spawn, ChildProcess } from "child_process";
import RendererSettings from "./RendererSettings";
import Settings from "./Settings";

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

    private rendererProcess?: ChildProcess;

    /**
     * Create a new development server
     * @param settings Settings for the dev server
     */
    public constructor(settings: Settings) {

    }

    private startRenderer(settings: RendererSettings) {
        
    }
}