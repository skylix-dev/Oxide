import React from "react";
import Props from "../../shared/app/Props";
import style from "./App.module.scss";

export default React.forwardRef((props: Props, ref) => {
    return (
        <div className={style.root}>
            <div className={style.body}>{props.children}</div>

            <div className={style.titleBar}>
                <div className={style.titleBarButtons}>
                    <button></button>
                    <button></button>
                    <button></button>
                </div>

                <div className={style.titleBarTitleArea}>
                    <div className={style.titleBarTitleAreaIcon}>
                        <img draggable={false} src="https://raw.githubusercontent.com/IlluxDev/Illux/main/Logo.svg" />
                    </div>

                    <span className={style.titleBarTitleAreaText}>
                        {props.title}
                        { props.titleSuffix && <span>{props.titleSuffix}</span> }
                    </span>
                </div>

                <span />
            </div>
        </div>
    );
});  
