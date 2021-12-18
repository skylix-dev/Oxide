const getRequireModule = (module: string) => {
    return (window as any).require(module);
}

export { getRequireModule };

const BrowserWindow = getRequireModule("@electron/remote").BrowserWindow;
const webFrame = getRequireModule("electron").webFrame;
const getCurrentWindow = getRequireModule("@electron/remote").getCurrentWindow;

export { BrowserWindow, webFrame, getCurrentWindow };