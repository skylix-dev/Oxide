import { Client, ClientErrors } from "../../src/Exports";

const client = new Client({
    port: 7090
});

client.on("disconnect", (code) => {
    console.log("CODE = " + code);
});

client.run().then(() => {
    console.log("Connected to the server at " + client.serverAddress);

    setTimeout(() => {
        client.send("reboot");
    });
}).catch(error => {
    switch (error) {
        case ClientErrors.connectionRefused: 
            console.log("Failed to connect because the connection refused");
            break;
    }
});
