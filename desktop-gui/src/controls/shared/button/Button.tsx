import React from "react";
import WindowsButton from "../../windows/button/Button"
import Props from "./Props";
import deepmerge from "deepmerge";

export default React.forwardRef((props: Props, ref) => {
    const defaultSettings = {
        accent: false,
        disabled: false,
        onClick: () => {}
    } as Props;

    const settings = deepmerge(defaultSettings, props);

    return (<WindowsButton {...settings} />);
});