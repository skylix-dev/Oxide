import { getCurrentWindow, webFrame } from "../Electron";
import WindowPlatform from "./WindowPlatform";
import WindowState from "./WindowState";

let instanceCreated = false;

export default class Window {
    /**
     * The window's current state
     */
    private windowState: WindowState = WindowState.normal;
    
    /**
     * The current window
     */
    private window: any;

    /**
     * All event listeners
     */
    private events = {
        stateChange: [] as ((state: WindowState) => void)[]
    };

    /**
     * The current OS platform
     */
    private platform: WindowPlatform;

    /**
     * A class used to interact with the current BrowserWindow
     */
    public constructor() {
        if (process.platform == "win32") {
            this.platform = WindowPlatform.windows;
        } else if (process.platform == "linux") {
            this.platform = WindowPlatform.linux;
        } else if (process.platform == "darwin") {
            this.platform = WindowPlatform.mac;
        } else {
            this.platform = WindowPlatform.windows;
        }

        this.window = getCurrentWindow();

        const handleWindowState = () => {
            if (this.window.isFullScreen()) {
                this.windowState = WindowState.fullScreened;
            } else if (this.window.isMaximized()) {
                this.windowState = WindowState.maximized;
            } else if (this.window.isMinimized()) {
                this.windowState = WindowState.minimized;
            } else {
                this.windowState = WindowState.normal;
            }

            this.events.stateChange.forEach(event => event(this.windowState));
        }

        handleWindowState();

        this.window.on("enter-full-screen", () => handleWindowState());
        this.window.on("leave-full-screen", () => handleWindowState());
        this.window.on("un" + "maximize", () => handleWindowState());
        this.window.on("maximize", () => handleWindowState());
        this.window.on("minimize", () => handleWindowState());
        this.window.on("restore", () => handleWindowState());
    }

    /**
     * Set the zoom factor
     * @param factor Zoom factor
     */
    public setZoom(factor: number) {
        webFrame.setZoomFactor(factor);
    }

    /**
     * Get the window's current state
     * @returns Window's current state
     */
    public getWindowState(): WindowState {
        return this.windowState;
    }

    /**
     * The window's OS platform
     * @returns The window's platform
     */
    public getWindowPlatform(): WindowPlatform {
        instanceCreated = true;
        return this.platform;
    }

    /**
     * Set the state of the window
     * @param state The window's new state
     */
    public setWindowState(state: WindowState) {
        switch (state) {
            case WindowState.fullScreened:
                this.window.setFullScreen(true);
                break;

            case WindowState.maximized:
                this.window.maximize();
                break;

            case WindowState.minimized:
                this.window.minimize();
                break;

            case WindowState.normal:
                if (this.windowState == WindowState.fullScreened) {
                    this.window.setFullScreen(false);
                } else {
                    this.window.restore();
                }
                break;
        }
    }

    /**
     * Exit the current window
     */
    public exit() {
        this.window.close();
    }

    /**
     * Override the automatic OS detection
     * @param os The OS
     */
    public setOsPlatformOverride(os: WindowPlatform) {
        if (instanceCreated) {
            throw new Error("Window manager instance has already been created, please run this before rendering components for the react app");
        }

        this.platform = os;
    }

    /**
     * Listen for window state change events
     * @param event Event name
     * @param listener Event callback
     * @param nullValue This param should not be used
     */
    public on(event: "stateChange", listener: (state: WindowState) => void, nullValue?: null): void;

    public on(event: any, listenerOrChannel: any, nullOrListener?: any) {
        (this.events as any)[event].push(listenerOrChannel);
    }
}
