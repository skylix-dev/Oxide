export default interface Props {
    /**
     * The buttons text
     */    
    children: string;

    /**
     * Disable the button
     */
    disabled?: boolean;

    /**
     * Make the button accent themed
     */
    accent?: boolean;

    /**
     * On click event
     */
    onClick?: () => void;
}
