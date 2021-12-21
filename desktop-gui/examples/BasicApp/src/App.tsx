import { App, AppTitleBarMode, Button, dialog, Flex, Html, windowApi, WindowPlatform } from "../../../src/Exports";
import { useState } from 'react';

windowApi.setOsPlatformOverride(WindowPlatform.windows);
windowApi.setZoom(1);

export default function() {
	const [titleBarStyle, setTitleBarStyle] = useState<AppTitleBarMode>(AppTitleBarMode.default);
 
	return (
		<App titleBarMode={titleBarStyle} titleSuffix="TEST" title="Oxide">
			<Html>
 				<Flex gap={10} direction="row">
					<Button onClick={() => dialog.show("No internet connection", ["Please check your internet connection", "If you beleive this is a mistake, please open an issue in the oxide github repository at https://github.com/illuxdev/oxide, thanks!"], [
						{
							label: "Close",
							dismiss: true
						},
						{
							label: "Reload",
							accent: true,
							action() {
								location.reload();
							}
						}
					])}>Open WiFi dialog</Button>
					<Button accent>Pending Friend</Button>
					<Button disabled>Pending Friend</Button>
					<Button accent disabled>Pending Friend</Button>
				</Flex>

				<br />
				<h1>Title Bar Style</h1>

				<select style={{
					width: 200
				}} size={3} onInput={(e) => setTitleBarStyle((e as any).target.value)}>
					<option label="Hidden" value={AppTitleBarMode.hidden} />
					<option label="Overlay" value={AppTitleBarMode.overlay} />
					<option label="Default" value={AppTitleBarMode.default} />
				</select>
			</Html>
		</App>
	);
}
