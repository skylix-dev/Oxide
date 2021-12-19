import React from "react";
import Props from "../../shared/html/Props";
import style from "./Html.module.scss";

export default React.forwardRef((props: Props, refs) => {
    return (
        <div className={style.root}>
            <div>{props.children}</div>
        </div>
    );
});