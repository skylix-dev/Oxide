import { ClientErrors, Server, ServerConnectionErrors } from "../../src/Exports";

const webSocketServer = new Server({
    port: 7090
});

interface CustomProps {
    name?: string;
}

interface SetNameMessage {
    name?: string;
}

webSocketServer.on<CustomProps>("connect", conn => {
    console.log("New connection", "Clients = " + webSocketServer.totalConnected);
    webSocketServer.emit("emit:dump", {
        acton: "New Join"
    });
    conn.on("message", "speak", message => {
        console.log("New message in: " + JSON.stringify(message));
    });

    conn.on("messageError", "", error => {
        console.log(error);
    });

    conn.on<SetNameMessage>("message", "set:name", message => {
        if (typeof message.name == "string" && message.name.length > 0) {
            conn.props.name = message.name;
            console.log("Connection name updated to \"" + conn.props.name + "\"");

            conn.send("set:name success", {
                name: conn.props.name
            }).catch(error => {
                if (error == ServerConnectionErrors.notAlive) {
                    console.log("Failed to send name update success message because the client has already disconnected");
                }
            });
        }
    });

    conn.on("message", "send+kill:1000", () => {
        conn.disconnect(undefined);

        setTimeout(() => {
            conn.send("test").then(() => {}).catch(error => {
                if (error == ServerConnectionErrors.notAlive) {
                    console.log("Failed to send message because the connection isn't alive");
                }
            });
        }, 1000);
    });

    conn.on("message", "reboot", () => {
        console.log("Restarting server");

        webSocketServer.stop().then(() => {
            webSocketServer.run().catch((err) => {
                console.log("Error occurred when starting the server, exit code " + err);
            });
        });
    });

    conn.on("message", "kill", () => {
        conn.disconnect(undefined);
    });

    conn.on("disconnect", (code) => {
        console.log("Connection disconnected, CODE = " + code, "Clients = " + webSocketServer.totalConnected);
    });
});

webSocketServer.run().then(() => {
    console.log("The server is ready");
});
