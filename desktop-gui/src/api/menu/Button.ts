export default interface Button {
    /**
     * Button label
     */
    label: string;

    /**
     * Button click action
     */
    action?: () => void;

    /**
     * Button icon
     */
    icon?: any;
}
