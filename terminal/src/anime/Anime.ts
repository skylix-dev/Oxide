import Settings from "./Settings";
import mergeDeep from "merge-deep";
import cliColor from "cli-color";

let isRunning = false;
let animationText = "";
let animationMode: "success" | "warning" | "error" | "info" = "info";
let animationLoop: NodeJS.Timer | null = null;
let animationSettings: Settings;
let frameInterval = 0;
let currentFrame = 0;

/**
 * Create an animated spinner with text
 * @param text The text to show with the processing animation
 */
export async function animate(text: string, mode: "success" | "warning" | "error" | "info" = "info", settings: Settings = {}) {
    const runAnimation = () => {
        const defaultSettings = {
            fps: 15,
            frames: [ "   ", ".  ", ".. ", "...", " ..", "  .", "   " ],
            colors: {
                success: "greenBright",
                warning: "yellowBright",
                error: "redBright",
                info: "blueBright"
            }
        } as Settings;
    
        animationSettings = mergeDeep(defaultSettings, settings);
        frameInterval = 1000 / animationSettings.fps;
        animationText = text;
        animationMode = mode;
    
        animationLoop = setInterval(() => {
            isRunning = true;
            process.stdout.write("\r " + cliColor[animationSettings.colors[animationMode]](animationSettings.frames[currentFrame]) + " " + animationText);
    
            if (currentFrame >= animationSettings.frames.length - 1) {
                currentFrame = 0;
                return;
            }
    
            currentFrame++;
        }, frameInterval);
    }

    if (isRunning) {
        stop().then(() => {
            runAnimation();
        });
        
        return;
    }

    runAnimation();
}

/**
 * Stop the current running animation
 * @param mode The new state of the final animation frame
 * @param text The new text for the final animation frame
 */
export function stop(mode: "success" | "warning" | "error" | "info" = "info", text?: string): Promise<void> {
    return new Promise((resolve) => {
        let finalText = text;
    
        if (!finalText) {
            finalText = animationText;
        }

        if (mode) {
            animationMode = mode;
        }

        animationText = finalText;
        clearInterval(animationLoop);

        isRunning = false;
        process.stdout.write("\n");

        resolve();
    });
}
