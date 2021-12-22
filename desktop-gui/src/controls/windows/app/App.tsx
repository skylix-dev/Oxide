import React, { useEffect, useRef, useState } from "react";
import Props from "../../shared/app/Props";
import style from "./App.module.scss";
import { Icon } from "@iconify/react"
import dismiss16Regular from "@iconify/icons-fluent/dismiss-16-regular";
import restore16Regular from "@iconify/icons-fluent/restore-16-regular";
import maximize16Regular from "@iconify/icons-fluent/maximize-16-regular";
import subtract16Regular from "@iconify/icons-fluent/subtract-16-regular";
import fullScreenMinimize24Regular from "@iconify/icons-fluent/full-screen-minimize-24-regular";
import { Button, dialog, menu, MenuButton, windowApi } from "../../../Exports";
import DialogButton from './../../../api/dialog/Button';
import TitleBarMode from "../../shared/app/TitleBarMode";
import WindowState from './../../../api/window/WindowState';

let onStateChange: null | ((state: ReturnType<typeof windowApi.getWindowState>) => void) = null;
let onDialogClose: null | (() => void) = null;
let onDialogOpen: null | ((dialog: {
    title: string,
    body: string[] | string,
    buttons: DialogButton[]
}) => void) = null;
let onContextOpen: null | ((buttons: MenuButton[], position?: { left: number, top: number }) => void) = null;
let onContextClose: null | (() => void) = null;

export default React.forwardRef((props: Props, ref) => {
    const [isMaximized, setMaximized] = useState(windowApi.getWindowState() == WindowState.maximized);
    const [isFullscreen, setFullscreen] = useState(windowApi.getWindowState() == WindowState.fullScreened);
    const [sheetEnabled, setSheetEnabled] = useState(false);
    const [noSmoke, setNoSmoke] = useState(true);
    const [currentMenu, setCurrentMenu] = useState<MenuButton[] | null>();
    const [currentDialog, setCurrentDialog] = useState<{
        title: string,
        body: string[] | string,
        buttons: DialogButton[];
    } | null>(null);
    let itemsUsingSheet = 0;
    const [mouseOverContext, setMouseOverContext] = useState(false);
    const [mousePosition, setMousePosition] = useState({
        left: 0,
        top: 0
    });
    const [contextPosition, setContextPosition] = useState({
        left: 0,
        top: 0
    });

    document.title = props.title ?? "";

    if (!onStateChange) {
        windowApi.on("stateChange", newState => onStateChange && onStateChange(newState));
        dialog.on("close", () => onDialogClose && onDialogClose());
        dialog.on("open", dialog => onDialogOpen && onDialogOpen(dialog));
        menu.on("open", (buttons, position) => onContextOpen && onContextOpen(buttons, position));
        menu.on("close", () => onContextClose && onContextClose());
    }

    onDialogClose = () => {
        itemsUsingSheet--;
        setCurrentDialog(null);
        setNoSmoke(true);
        
        if (itemsUsingSheet <= 0) {
            setSheetEnabled(false);
        }
    }

    onDialogOpen = dialogInfo => {
        itemsUsingSheet++;
        setCurrentDialog(dialogInfo);

        setSheetEnabled(true);
        setNoSmoke(false);
    }

    onStateChange = state => {
        if (state == WindowState.fullScreened) {
            setFullscreen(true);
        } else {
            setFullscreen(false);

            if (state == WindowState.maximized) {
                setMaximized(true);
            } else {
                setMaximized(false);
            }
        }
    }

    onContextOpen = (buttons, position) => {
        setContextPosition(position ? position : mousePosition);
        setCurrentMenu(buttons);
    }

    onContextClose = () => {
        setCurrentMenu(null);
    }

    return (
        <div onMouseMove={(event) => {
            setMousePosition({
                left: event.pageX,
                top: event.pageY
            });
        }} onMouseDown={() => {
            if (!mouseOverContext) {
                setCurrentMenu(null);
            }
        }} className={style.root}>
            <div className={style.body + (props.titleBarMode != TitleBarMode.default ? " " + style.bodyNoTitleBarSpace : "")}>{props.children}</div>

            { props.titleBarMode != TitleBarMode.hidden && <div className={style.titleBar + (props.titleBarMode == TitleBarMode.overlay ? " " + style.titleBarOverlayMode : "")}>
                { props.titleBarMode != TitleBarMode.overlay ? <div className={style.titleBarTitleArea}>
                    <div className={style.titleBarTitleAreaIcon}>
                        <img draggable={false} src="https://raw.githubusercontent.com/IlluxDev/Illux/main/Logo.svg" />
                    </div>

                    { props.title && <span className={style.titleBarTitleAreaText}>
                        {props.title}
                        { props.titleSuffix && <span className={style.titleBarTitleAreaSuffix}>{props.titleSuffix.toUpperCase()}</span>}
                    </span> }
                </div> : <span></span> }

                <div className={style.titleBarButtonArea}>
                    <button onClick={() => {
                        menu.show([
                            {
                                label: "Save"
                            },
                            {
                                label: "Save All"
                            }
                        ], mousePosition);
                    }}>
                        CM
                    </button>
                    <button onClick={() => windowApi.setWindowState(WindowState.minimized)}>
                        <Icon className={style.titleBarButtonAreaMinimizeIcon} icon={subtract16Regular} />
                    </button>

                    { isFullscreen ? <button onClick={() => windowApi.setWindowState(WindowState.normal)}>
                        <Icon className={style.titleBarButtonAreaFullScreenMinimizeIcon} icon={fullScreenMinimize24Regular} />
                    </button> : (isMaximized ? <button onClick={() => windowApi.setWindowState(WindowState.normal)}>
                        <Icon className={style.titleBarButtonAreaRestoreIcon} icon={restore16Regular} />
                    </button> : <button onClick={() => windowApi.setWindowState(WindowState.maximized)}>
                        <Icon className={style.titleBarButtonAreaMaximizeIcon} icon={maximize16Regular} />
                    </button>) }

                    <button onClick={() => windowApi.exit()} className={style.titleBarButtonAreaClose}>
                        <Icon className={style.titleBarButtonAreaDismissIcon} icon={dismiss16Regular} />
                    </button>
                </div>
            </div> }

            <div className={style.coverSheet + (!sheetEnabled ? " " + style.coverSheetDisabled : "") + (noSmoke ? " " + style.coverSheetNoSmoke : "")} />

            <div className={style.dialogWindow + (currentDialog == null ? " " + style.dialogWindowClosed : "")}>
                <div className={style.dialogWindowBody}>
                    <h1>{currentDialog?.title}</h1>
                    
                    {typeof currentDialog?.body == "string" ? <p>{currentDialog.body}</p> : currentDialog?.body.map(line => {
                        return <p>{line}</p>
                    })}
                </div>

                <div className={style.dialogWindowFooter}>
                    {currentDialog?.buttons.map(button => {
                        return (
                            <div className={style.dialogWindowFooterButtonWrapper}>
                                <Button accent={button.accent} disabled={button.disabled} fluid onClick={() => {
                                    if (button.dismiss) {
                                        dialog.close();
                                    }

                                    button.action ? button.action() : null;
                                }}>{button.label}</Button>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div onMouseLeave={() => setMouseOverContext(false)} onMouseEnter={() => setMouseOverContext(true)} style={{
                display: currentMenu ? "flex" : "none",
                top: contextPosition.top + "px",
                left: contextPosition.left + "px"
            }} className={style.contextMenu}>
                <div className={style.contextMenuInner + (currentMenu ? " " + style.contextMenuInnerShown : "")}>
                    <div className={style.contextMenuRowList}>
                        <button>
                            <Icon icon="fluent:search-16-regular" />
                        </button>

                        <button>
                            <Icon icon="fluent:search-16-regular" />
                        </button>
                    </div>

                    <div className={style.contextMenuBody}>
                        {currentMenu?.map((menuBodyItem, index) => {
                            return (
                                <button key={"menu-item-" + menuBodyItem.label.split(" ").join("_") + "-" + index}>
                                    <div className={style.contextMenuBodyItemIcon}>
                                        <Icon icon="fluent:search-16-regular" />
                                    </div>

                                    <span>{menuBodyItem.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}); 
