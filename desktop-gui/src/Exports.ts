import App from "./controls/shared/app/App";
import WindowApi from "./api/window/Window";
import Html from "./controls/shared/html/Html";
import * as electron from "./api/Electron";
import Button from "./controls/shared/button/Button";
import Flex from "./controls/shared/flex/Flex";
import Dialog from './api/dialog/Dialog';
import WindowPlatform from './api/window/WindowPlatform';
import DialogButton from './api/dialog/Button';
import OsSwitch from "./controls/shared/osSwitch/OsSwitch";
import AppTitleBarMode from "./controls/shared/app/TitleBarMode";
import WindowState from './api/window/WindowState';

const windowApi = new WindowApi();
const dialog = new Dialog();

export { windowApi, electron, dialog, WindowPlatform, AppTitleBarMode, WindowState };
export type { DialogButton };
export { App, Html, Button, Flex, OsSwitch };
