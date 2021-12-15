import AppConfig from "./AppConfig";
import { UserConfig } from "vite";
import RendererConfig from "./RendererConfig";
import Dev from "./dev/Dev";
import vuePlugin from "@vitejs/plugin-vue";
import commonjsExternals from "vite-plugin-commonjs-externals";

/**
 * Add typing to your app's config
 * @param config Your app config
 * @returns Your app config
 */
export function defineConfig(config: AppConfig): AppConfig {
    return config;
}

export function defineRendererConfig(config: RendererConfig): UserConfig {
    return {
        plugins: [ vuePlugin(), commonjsExternals({
            externals: [/^electron(\/.+)?$/]
        }) ],
        base: "./"
    }
}

export { Dev };
