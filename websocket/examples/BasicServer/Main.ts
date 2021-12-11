import { Server } from "../../src/Exports";

const webSocketServer = new Server({
    port: 7090
});

webSocketServer;

webSocketServer.run().then(() => {
    console.log("The server is ready");
});
