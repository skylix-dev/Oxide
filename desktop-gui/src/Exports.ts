import App from "./controls/windows/app/App";
import WindowApi from "./api/Window";
import Html from "./controls/shared/html/Html";
import * as electron from "./api/Electron";

const windowApi = new WindowApi();

export { windowApi, electron };

export { App, Html };
