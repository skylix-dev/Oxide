import { Client } from "../../src/Exports";

const client = new Client({
    port: 7090
});

client.run().then(() => {
    console.log("Connected to the server at " + client.serverAddress);
});
