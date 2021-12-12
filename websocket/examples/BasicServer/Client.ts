import { Client } from "../../src/Exports";

const client = new Client({
    port: 7090
});

client.on("disconnect", (code, reason) => {
    console.log("CODE = " + code + " REASON = " + reason);
});

client.run().then(() => {
    console.log("Connected to the server at " + client.serverAddress);

    setTimeout(() => {
        client.send("kill");
    });
});
