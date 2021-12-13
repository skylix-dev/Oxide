# Walk Through of a Basic Server

## Import Oxide
```ts
// TypeScript
import { Server } from "@illuxdev/oxide-websocket";
```

```js
// JavaScript
const { Server } = require("@illuxdev/oxide-websocket");
```

## Construct Server
```ts
// TypeScript
const server = new Server({
    port: 3549 // WebSocket server port
});
```

```js
// JavaScript
const server = new Server({
    port: 3549 // WebSocket server port
});
```

## Add Event Listeners
```ts
// TypeScript
server.on("connect", connection => {
    console.log("[SRV] New connection", "Total = " + server.totalConnections);

    connection.on("disconnect", code => {
        console.log("[SRV] Connection disconnected", "Total = " + server.totalConnections);
    });
});
```

```js
// JavaScript
server.on("connect", connection => {
    console.log("[SRV] New connection", "Total = " + server.totalConnections);

    connection.on("disconnect", code => {
        console.log("[SRV] Connection disconnected", "Total = " + server.totalConnections);
    });
});
```

## Run The Server
```ts
// TypeScript
server.run().then(() => {
    console.log("[SRV] The server is running at port 3549", "Local Address = ws://localhost:3549", "Public Address = ws://0.0.0.0:3549");
}).catch(errorCode => {
    console.log("[SRV] The server failed to start", "Error Code = " + errorCode);
});
```

```js
// JavaScript
server.run().then(() => {
    console.log("[SRV] The server is running at port 3549", "Local Address = ws://localhost:3549", "Public Address = ws://0.0.0.0:3549");
}).catch(errorCode => {
    console.log("[SRV] The server failed to start", "Error Code = " + errorCode);
});
```