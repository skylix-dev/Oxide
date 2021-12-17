import AppConfig from "./AppConfig";
import { UserConfig } from "vite";
import RendererConfig from "./RendererConfig";
import Dev from "./dev/Dev";
import vuePlugin from "@vitejs/plugin-vue";
import commonjsExternals from "vite-plugin-commonjs-externals";
import builtInModules from "builtin-modules";
import DevElectronSettings from "./dev/ElectronSettings";
import DevRendererSettings from "./dev/RendererSettings";
import DevErrors from "./dev/Errors";

/**
 * Add typing to your app"s config
 * @param config Your app config
 * @returns Your app config
 */
export function defineConfig(config: AppConfig): AppConfig {
	return config;
}

export function defineRendererConfig(config: RendererConfig): UserConfig {
	return {
		plugins: [
			vuePlugin(),
			commonjsExternals({
				externals: [
					"electron",
					"electron/main",
					"electron/common",
					"electron/renderer",
					"original-fs",
					...builtInModules,
				],
			}),
		],
		base: "./",
	};
}

export { Dev, DevErrors, DevRendererSettings, DevElectronSettings };
