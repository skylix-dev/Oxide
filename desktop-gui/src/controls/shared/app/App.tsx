import React from "react";
import Props from "./Props";
import WindowsApp from "../../windows/app/App";
import mergeDeep from "merge-deep";

export default React.forwardRef((props: Props, ref) => {
    const defaultSettings = {
        
    } as Props;

    const settings = mergeDeep(defaultSettings, props);
    
    return (
        <WindowsApp {...settings} />
    );
});