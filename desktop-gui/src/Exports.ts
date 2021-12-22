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
import MenuButton from "./api/menu/Button";
import Menu from "./api/menu/Menu";
import MenuBar from "./controls/shared/menuBar/MenuBar";

const windowApi = new WindowApi();
const dialog = new Dialog();
const menu = new Menu();

export { windowApi, electron, dialog, WindowPlatform, AppTitleBarMode, WindowState, menu };
export type { DialogButton, MenuButton };
export { App, Html, Button, Flex, OsSwitch, MenuBar };
