export default interface Button {
    /**
     * The button label
     */
    label: string;

    /**
     * The button's click action
     */
    action: () => void;

    /**
     * Is the button and accent themed button
     */
    accent?: boolean;

    /**
     * Is the button disabled
     */
    disabled?: boolean;
}