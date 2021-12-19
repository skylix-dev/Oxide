import React from "react";
import Props from "./Props";
import deepmerge from 'deepmerge';

export default React.forwardRef((props: Props, ref) => {
    const defaultSettings = {
        gap: 0,
        direction: "row"
    } as Props;

    const settings = deepmerge(defaultSettings, props);
    
    return (
        <div style={{
            gap: settings.gap + "px",
            display: "flex",
            flexDirection: settings.direction
        }}>{props.children}</div>
    );
});
