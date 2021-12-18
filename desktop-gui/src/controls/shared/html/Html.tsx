import React from "react";
import WindowsHtml from "../../windows/html/Html";
import Props from "./Props";

export default React.forwardRef((props: Props, ref) => {
    return (
        <WindowsHtml {...props} />
    );
});