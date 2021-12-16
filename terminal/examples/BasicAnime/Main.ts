import { anime } from "../../src/Exports";

anime.animate("This is the first anime spinner", "info");

setTimeout(() => {
	anime.animate(
		"This is the second anime spinner, lots of text, lots of text, lots of text, lots of text, lots of text, lots of text, lots of text, lots of text, lots of text, lots of text, lots of text, lots of text, lots of text, lots of text",
		"success",
		{
			fps: 20,
		}
	);

	setTimeout(() => {
		anime.updateText("The text and mode are different now", "info");

		setTimeout(() => {
			anime.updateText("Stopping anime in 2", "success");

			setTimeout(() => {
				anime.updateText("Stopping anime in 1", "warning");

				setTimeout(() => {
					anime.stop("Animation Stopped", "error");
				}, 1000);
			}, 1000);
		}, 2000);
	}, 2000);
}, 2000);
