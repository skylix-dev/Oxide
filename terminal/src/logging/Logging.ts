import { animationColors } from "./../anime/Settings";
import cliColor from "cli-color";

/**
 * Log custom text with a custom prefix
 * @param text Text to log
 * @param color The color of the prefix
 */
export function custom(text: string, prefix: string, color: animationColors) {
	console.log(cliColor[color](" [ " + prefix + " ]") + " " + text);
}

/**
 * Log an info message
 * @param text Text to log
 */
export function info(text: string) {
	custom(text, "Info", "blackBright");
}

/**
 * Log a success message
 * @param text Text to log
 */
export function success(text: string) {
	custom(text, "Success", "green");
}

/**
 * Log a warning message
 * @param text Text to log
 */
export function warning(text: string) {
	custom(text, "Warning", "yellow");
}

/**
 * Log an error message
 * @param text Text to log
 */
export function error(text: string) {
	custom(text, "Error", "redBright");
}
