import React from "react";
import Props from "./Props";
import WindowsApp from "../../windows/app/App";
import MacApp from "../../mac/app/App";
import deepmerge from "deepmerge";
import OsSwitch from "../osSwitch/OsSwitch";

export default React.forwardRef((props: Props, ref) => {
    const defaultSettings = {
        titleBarMode: "default"
    } as Props;

    const settings = deepmerge(defaultSettings, props);
    
    return <OsSwitch component={{
        windows: WindowsApp,
        mac: MacApp,
        linux: MacApp
    }} props={settings} refPassThrough={ref} />
});