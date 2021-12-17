import { Settings } from './Settings';
import mergeDeep from "merge-deep";

export default class DesktopElectron {
	/**
	 * Settings for the instance
	 */
	private settings: Settings;

	/**
	 * Create a new Electron instance (This class must be used for oxide-desktop-gui to work correctly)
	 */
	public constructor(settings: Settings) {
		const defaultSettings = {} as Settings;

		this.settings = mergeDeep(defaultSettings, settings);
	}
}
