import { App, windowApi } from "../../../src/Exports";

windowApi.setZoom(1);

export default function() {
	return (
		<App titleSuffix="PREVIEW" title="Kitten">
			<h1>Content</h1>
		</App>
	);
}
