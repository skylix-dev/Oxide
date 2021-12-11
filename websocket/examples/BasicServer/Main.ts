import { Server } from "../../src/Exports";

const webSocketServer = new Server({
    port: 7090
});


webSocketServer.run();
