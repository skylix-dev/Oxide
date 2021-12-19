import { App, Button, dialog, Flex, Html, windowApi } from "../../../src/Exports";
import { useState } from 'react';

windowApi.setZoom(1);

export default function() {
	const [titleBarStyle, setTitleBarStyle] = useState<"default" | "hidden" | "overlay">("default");

	return (
		<App titleBarMode={titleBarStyle} titleSuffix="TEST" title="Oxide">
			<Html>
 				<Flex gap={10} direction="row">
					<Button onClick={() => dialog.show("No internet connection", "Please check your internet connection", [
						{
							label: "Ok",
							dismiss: true
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
					<option label="Hidden" value="hidden" />
					<option label="Overlay" value="overlay" />
					<option label="Default" value="default" />
				</select>
			</Html>
		</App>
	);
}
