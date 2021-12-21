import React from "react";
import Props from "../../shared/app/Props";
import TitleBarMode from "../../shared/app/TitleBarMode";
import style from "./App.module.scss";

export default React.forwardRef((props: Props, ref) => {
    return (
        <div className={style.root}>
            <div className={style.body}>{props.children}</div>

            { props.titleBarMode != TitleBarMode.hidden && <div className={style.titleBar + (props.titleBarMode == TitleBarMode.overlay ? " " + style.titleBarOverlayMode : "")}>
                <div className={style.titleBarButtons}>
                    <button></button>
                    <button></button>
                    <button></button>
                </div>

                { props.titleBarMode != TitleBarMode.overlay && <div className={style.titleBarTitleArea}>
                    <div className={style.titleBarTitleAreaIcon}>
                        <img draggable={false} src="https://raw.githubusercontent.com/IlluxDev/Illux/main/Logo.svg" />
                    </div>

                    <span className={style.titleBarTitleAreaText}>
                        {props.title}
                        { props.titleSuffix && <span>{props.titleSuffix}</span> }
                    </span>
                </div> }

                <span />
            </div> }
        </div>
    );
});  
