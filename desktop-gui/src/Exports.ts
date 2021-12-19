import App from "./controls/shared/app/App";
import WindowApi from "./api/Window";
import Html from "./controls/shared/html/Html";
import * as electron from "./api/Electron";
import Button from "./controls/shared/button/Button";
import Flex from "./controls/shared/flex/Flex";

const windowApi = new WindowApi();

export { windowApi, electron };

export { App, Html, Button, Flex };
