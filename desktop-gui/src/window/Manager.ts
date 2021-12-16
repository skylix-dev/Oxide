export default class Manager {
    /**
     * Is the window focused
     */
    private focused = false;

    /**
     * The window's position
     */
    private position = { left: 0, top: 0 };

    /**
     * The window's size
     */
    private size = { width: 0, height: 0 };

    /**
     * The state of the window
     */
    private state = "normal" as "normal" | "maximized" | "minimized" | "fullScreen";

    /**
     * The browser window
     */
    private browserWindow: any;

    /**
     * All event listener callbacks
     */
    private events = {
        state: [] as (() => void)[],
        focusChange: [] as (() => void)[]
    }

    /**
     * Create a window manager for Electron that works in WebPack and other bundlers
     */
    public constructor() {
        const { getCurrentWindow } = this.getElectronModule("@electron/remote");
        this.browserWindow = getCurrentWindow();

        this.focused = this.browserWindow.isFocused();

        this.browserWindow.on("focus", () => {
            this.focused = true;
            this.events.focusChange.forEach(event => event());
        });

        this.browserWindow.on("blur", () => {
            this.focused = false;
            this.events.focusChange.forEach(event => event());
        });

        const runWindowStateChecks = (initial = false) => {
            if (this.browserWindow.isFullScreen()) {
                this.state = "fullScreen";
            } else if (this.browserWindow.isMaximized()) {
                this.state = "maximized";
            } else if (this.browserWindow.isMinimized()) {
                this.state = "minimized";
            } else {
                this.state = "normal";
            }

            if (!initial) {
                this.events.state.forEach(event => event());
            }
        }

        runWindowStateChecks(true);

        this.browserWindow.on("maximize", () => {
            runWindowStateChecks();
        });

        this.browserWindow.on("restore", () => {
            runWindowStateChecks();
        });

        this.browserWindow.on("un" + "maximize", () => {
            runWindowStateChecks();
        });
        
        this.browserWindow.on("minimize", () => {
            runWindowStateChecks();
        });

        this.browserWindow.on("enter-full-screen", () => {
            runWindowStateChecks();
        });

        this.browserWindow.on("enter-full-screen", () => {
            runWindowStateChecks();
        });

        this.browserWindow.on("leave-full-screen", () => {
            runWindowStateChecks();
        });
    }

    /**
     * Get any module from CommonJS via Electron
     * @param name Name of the module
     */
    private getElectronModule(name: string): any {
        if (!window as any["require"]) {
            throw new Error("Failed to get Electron module because you are either not running in an Electron environment or node integrations is disabled in your window");
        }

        return (window as any).require(name);
    }

    /**
     * Check if the window is focused
     * @returns Is the window focused
     */
    public isFocused(): boolean {
        return this.focused;
    }

    /**
     * Get the window state
     * @returns The window state
     */
    public getWindowState(): "normal" | "maximized" | "minimized" | "fullScreen" {
        return this.state;
    }

    /**
     * Maximize the window
     */
    public maximize() {
        this.browserWindow.maximize();
    }

    /**
     * Minimize the window
     */
    public minimize() {
        this.browserWindow.minimize();
    }

    /**
     * Full screen the window
     */
    public fullScreen() {
        this.browserWindow.setFullScreen(true);
    }

    /**
     * Exit full screen for the window
     */
    public exitFullScreen() {
        this.browserWindow.setFullScreen(false);
    }

    /**
     * Restore the window
     */
    public restore() {
        this.browserWindow.restore();
    }

    /**
     * Close this window
     */
    public close() {
        this.browserWindow.close();
    }

    /**
     * Listen for window state changes
     * @param event Event name
     * @param listener Event callback
     */
    public on(event: "state", listener: () => void): void;

    /**
     * Listen for window focus state changes
     * @param event Event name
     * @param listener Event callback
     */
    public on(event: "focusChange", listener: () => void): void;

    public on(event: any, listener: any) {
        (this.events as any)[event].push(listener);
    }
} 
