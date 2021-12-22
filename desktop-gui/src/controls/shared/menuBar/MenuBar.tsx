import React from "react";
import OsSwitch from "../osSwitch/OsSwitch";
import WindowsMenuBar from "../../windows/menuBar/MenuBar";

export default React.forwardRef((props, ref) => {
    return (
        <OsSwitch component={{
            windows: WindowsMenuBar,
            linux: WindowsMenuBar,
            mac: WindowsMenuBar
        }} props={props} refPassThrough={ref} />
    )
});