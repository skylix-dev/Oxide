import React from "react";
import WindowsButton from "../../windows/button/Button"
import Props from "./Props";

export default React.forwardRef((props: Props, ref) => {
    return (<WindowsButton {...props} />);
});