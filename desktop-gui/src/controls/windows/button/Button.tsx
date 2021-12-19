import React from "react";
import Props from "../../shared/button/Props";
import style from "./Button.module.scss";

export default React.forwardRef((props: Props, ref) => {
    return (
        <div className={style.root}>
            <div className={style.inner + (props.accent ? " " + style.accent : "") + (props.disabled ? " " + (props.accent ? style.accentDisabled : style.disabled) : "")}>{props.children}</div>
        </div>
    );
});