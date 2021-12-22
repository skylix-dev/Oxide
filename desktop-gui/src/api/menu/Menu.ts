import Button from "./Button";

export default class Menu {
    /**
     * ALl event listeners
     */
    private events = {
        open: [] as ((buttons: Button[], position?: typeof this.position) => void)[],
        close: [] as (() => void)[]
    };

    /**
     * Context menu position
     */
    private position = {
        left: 0,
        top: 0
    };

    /**
     * Open a context menu
     * @param buttons All buttons
     */
    public show(buttons: Button[], position?: typeof this.position) {
        this.events.open.forEach(event => event(buttons, position ? position : undefined));
    }

    /**
     * Set the context menu position
     * @param position Position of the menu
     */
    public setPosition(position: typeof this.position) {
        this.position = {...position};
    }

    /**
     * Close the context menu
     */
    public close() {
        this.events.close.forEach(event => event());
    }

    /**
     * Listen for context menu open events
     * @param event Event name
     * @param listener Event callback
     */
    public on(event: "open", listener: (buttons: Button[], position?: typeof this.position) => void): void;

    /**
     * Listen for context menu close events
     * @param event Event name
     * @param listener Event callback
     */
    public on(event: "close", listener: () => void): void;

    public on(event: any, listener: any) {
        (this.events as any)[event].push(listener);
    }
} {}