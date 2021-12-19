import { App, Button, Flex, Html, windowApi } from "../../../src/Exports";

windowApi.setZoom(1);

export default function() {
	return (
		<App titleSuffix="TEST" title="Oxide">
			<Html>
				<h1>Hello</h1>
				<Flex gap={10}>
					<Button>Pending Friend</Button>
					<Button accent>Pending Friend</Button>
					<Button disabled>Pending Friend</Button>
					<Button accent disabled>Pending Friend</Button>
				</Flex>
				<h1>World</h1>
			</Html>
		</App>
	);
}
