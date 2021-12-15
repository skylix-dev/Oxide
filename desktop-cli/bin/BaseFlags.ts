export default interface BaseFlags {
    /**
     * Should the app read for a config
     */
    readConfig?: boolean;

    /**
     * The location of the app config
     */
    config?: string;
}
