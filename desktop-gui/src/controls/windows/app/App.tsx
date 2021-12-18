import React, { useState } from "react";
import Props from "../../shared/app/Props";
import style from "./App.module.scss";
import { Icon } from "@iconify/react"
import dismiss16Regular from "@iconify/icons-fluent/dismiss-16-regular";
import restore16Regular from "@iconify/icons-fluent/restore-16-regular";
import maximize16Regular from "@iconify/icons-fluent/maximize-16-regular";
import subtract16Regular from "@iconify/icons-fluent/subtract-16-regular";
import fullScreenMinimize24Regular from "@iconify/icons-fluent/full-screen-minimize-24-regular";
import { windowApi } from "../../../Exports";

let onStateChange: null | ((state: ReturnType<typeof windowApi.getWindowState>) => void) = null;

export default React.forwardRef((props: Props, ref) => {
    const [isMaximized, setMaximized] = useState(windowApi.getWindowState() == "maximized");
    const [isFullscreen, setFullscreen] = useState(windowApi.getWindowState() == "fullScreened");

    if (!onStateChange) {
        windowApi.on("stateChange", newState => onStateChange && onStateChange(newState));
    }

    onStateChange = state => {
        if (state == "fullScreened") {
            setFullscreen(true);
        } else {
            setFullscreen(false);

            if (state == "maximized") {
                setMaximized(true);
            } else {
                setMaximized(false);
            }
        }
    }

    return (
        <div className={style.root}>
            <div className={style.titleBar}>
                <div className={style.titleBarTitleArea}>
                    <div className={style.titleBarTitleAreaIcon}>
                        <img draggable={false} src="https://raw.githubusercontent.com/IlluxDev/Illux/main/Logo.svg" />
                    </div>

                    { props.title && <span className={style.titleBarTitleAreaText}>
                        {props.title}
                        { props.titleSuffix && <span className={style.titleBarTitleAreaSuffix}>{props.titleSuffix.toUpperCase()}</span>}
                    </span> }
                </div>

                <div className={style.titleBarButtonArea}>
                    <button onClick={() => windowApi.setWindowState("minimized")}>
                        <Icon className={style.titleBarButtonAreaMinimizeIcon} icon={subtract16Regular} />
                    </button>

                    { isFullscreen ? <button onClick={() => windowApi.setWindowState("normal")}>
                        <Icon className={style.titleBarButtonAreaFullScreenMinimizeIcon} icon={fullScreenMinimize24Regular} />
                    </button> : (isMaximized ? <button onClick={() => windowApi.setWindowState("normal")}>
                        <Icon className={style.titleBarButtonAreaRestoreIcon} icon={restore16Regular} />
                    </button> : <button onClick={() => windowApi.setWindowState("maximized")}>
                        <Icon className={style.titleBarButtonAreaMaximizeIcon} icon={maximize16Regular} />
                    </button>) }

                    <button onClick={() => windowApi.exit()} className={style.titleBarButtonAreaClose}>
                        <Icon className={style.titleBarButtonAreaDismissIcon} icon={dismiss16Regular} />
                    </button>
                </div>
            </div>

            <div className={style.body}>{props.children}</div>
        </div>
    );
});
