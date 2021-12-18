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

	/**
	 * Root dir of the project
	 */
	projectRoot: string;

	/**
	 * Other folders with changes happening with files or other sub-folders will cause an Electron reload
	 */
	otherElectronDirs: string[];
}
