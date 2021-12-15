export default interface ElectronSettings {
    /**
     * Port of the development server
     */
    port: number;

    /**
     * Location of the Electron entry script
     */
    electronMain: string;

    /**
     * Root directory for all the Electron files
     */
    electronRoot: string;
}
