import Button from './Button';

export default class Dialog {
    /**
     * Is the dialog open
     */
    private opened = false;

    /**
     * All event listeners
     */
    public events = {
        open: [] as ((dialog: {
            title: string,
            body: string,
            buttons: Button[]
        }) => void)[],
        close: [] as (() => void)[]
    };

    /**
     * Show a dialog modal
     * @param title Dialog title
     * @param body Dialog body text
     * @param buttons All dialog footer buttons
     */
    public show(title: string, body: string, buttons: Button[]) {
        this.events.open.forEach(event => event({ title, body, buttons }));
    }

    /**
     * Close the current open dialog
     */
    public close() {
        this.events.close.forEach(event => event());
    }

    /**
     * Check if the dialog is open
     * @returns Is the dialog open
     */
    public isOpen(): boolean {
        return this.opened;
    }

    /**
     * Listen for when the dialog is opened
     * @param event Event name
     * @param listener Event callback
     */
    public on(event: "open", listener: (dialog: {
        title: string,
        body: string,
        buttons: Button[]
    }) => void): void;

    /**
     * Listen for when the dialog is closed
     * @param event Event name
     * @param listener Event callback
     */
    public on(event: "close", listener: () => void): void;

    public on(event: any, listener: any) {
        (this.events as any)[event].push(listener);
    }
}