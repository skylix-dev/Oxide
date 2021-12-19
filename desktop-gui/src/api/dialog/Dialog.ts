import Button from './Button';

export default class Dialog {
    /**
     * All event listeners
     */
    public events = {
        open: [] as (() => void)[],
        close: [] as (() => void)[]
    };

    /**
     * Show a dialog modal
     * @param title Dialog title
     * @param body Dialog body text
     * @param buttons All dialog footer buttons
     */
    public show(title: string, body: string, buttons: Button[]) {

    }

    /**
     * Listen for when the dialog is opened
     * @param event Event name
     * @param listener Event callback
     */
    public on(event: "open", listener: () => void): void;

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