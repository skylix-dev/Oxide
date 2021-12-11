import { Server } from "../../src/Exports";

const webSocketServer = new Server({
    port: 7090
});

webSocketServer.on("connect", conn => {
    console.log("New connection");
    conn.on("message", "speak", message => {
        console.log("New message in: " + JSON.stringify(message));
    });

    conn.on("messageError", "", error => {
        console.log(error);
    });
});

webSocketServer.run().then(() => {
    console.log("The server is ready");
});
