# WebSocket v1.0.0
Create fast, high-level WebSocket API servers.

# Basic Server
```ts
// TypeScript
import { Server } from "@illuxdev/oxide-websocket";

const server = new Server({
    port: 3549
});

server.run().then(() => {
    console.log("The server is running at port 3549", "Address = ws://0.0.0.0:3549");
}).catch(error => {
    console.log("The server failed to start", "Error = " + error);
});
```

```js
// JavaScript
const { Server } = require("@illuxdev/oxide-websocket");

const server = new Server({
    port: 3549
});

server.run().then(() => {
    console.log("The server is running at port 3549", "Address = ws://0.0.0.0:3549");
}).catch(error => {
    console.log("The server failed to start", "Error = " + error);
});
```
