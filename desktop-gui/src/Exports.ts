import { WinUiApp, WinUiButton } from "./resources/winui/WinUi";
import Manager from "./window/Manager";

const windowManager = new Manager();

export {
    WinUiButton as Button,
    WinUiApp as App,
    windowManager
};
