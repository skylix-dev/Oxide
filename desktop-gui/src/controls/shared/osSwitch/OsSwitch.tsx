import { windowApi } from "../../../Exports";
import Props from "./Props";
import WindowPlatform from './../../../api/WindowPlatform';
import React from "react";

export default React.forwardRef((props: Props, ref) => {
    const os = windowApi.getWindowPlatform();
    let Component: any;
    
    if (os == WindowPlatform.windows) {
        Component = props.component.windows;
    } else if (os == WindowPlatform.linux) {
        Component = props.component.linux;
    } else {
        Component = props.component.mac;
    }

    return React.createElement(Component, {
        ...props.props
    });
});