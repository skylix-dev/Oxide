type animationColors = "black"
| "red"
| "green"
| "yellow"
| "blue"
| "magenta"
| "cyan"
| "white"
| "bgBlack"
| "bgRed"
| "bgGreen"
| "bgYellow"
| "bgBlue"
| "bgMagenta"
| "bgCyan"
| "bgWhite"
| "blackBright"
| "redBright"
| "greenBright"
| "yellowBright"
| "blueBright"
| "magentaBright"
| "cyanBright"
| "whiteBright"
| "bgBlackBright"
| "bgRedBright"
| "bgGreenBright"
| "bgYellowBright"
| "bgBlueBright"
| "bgMagentaBright"
| "bgCyanBright"
| "bgWhiteBright";

export default interface Settings {
    /**
     * How many frames to render for the spinner every second
     */
    fps?: number;

    /**
     * All the frames for the spinner
     */
    frames?: string[];

    colors?: {
        success?: animationColors;
        warning?: animationColors;
        error?: animationColors;
        info?: animationColors;
    }
}
