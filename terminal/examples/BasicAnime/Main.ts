import { anime } from "../../src/Exports";

anime.animate("This is the first anime spinner", "info");

setTimeout(() => {
    anime.animate("This is the second anime spinner", "success");
}, 2000);
