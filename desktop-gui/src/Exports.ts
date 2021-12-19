import App from "./controls/shared/app/App";
import WindowApi from "./api/Window";
import Html from "./controls/shared/html/Html";
import * as electron from "./api/Electron";
import Button from "./controls/shared/button/Button";
import Flex from "./controls/shared/flex/Flex";
import Dialog from './api/dialog/Dialog';

const windowApi = new WindowApi();
const dialog = new Dialog();

export { windowApi, electron, dialog };
export { App, Html, Button, Flex };
