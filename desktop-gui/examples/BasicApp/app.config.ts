import { defineConfig } from "@illuxdev/oxide-desktop-cli";

export default defineConfig({
    name: "Test",
    paths: {
        otherElectronDirs: [
            "../../../desktop-electron"
        ]
    }
});