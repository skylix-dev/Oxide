<!-- Change the github class URLs to be documented MD files -->
# Class: `Server`
Create powerful and fast WebSocket servers.

# `new Server(settings)`
  - `settings`
    - `port`: `number` The port of the server.
    - `host`: `string` (Optional) The host name for the server. Default: `"0.0.0.0"`.
    - `pendingLimit`: `number` (Optional) The limit of pending connections on the WebSocket server. Default: `10000`.
    - `ssl`: `object | false` (Optional) The SSL certificate for the server. Default: `false`.
        - False Value
            - Disable and don't use an SSL certificate.
        - Object Value
            - `certificate`: `string` (Optional) The SSL certificate in its raw format. Default: `""`.
            - `key`: `string` (Optional) The SSL certificate key in its raw format. Default: `""`.

# Event: `connect`
This event is fired when a new client connects to the WebSocket server.

  - Expected Return: `void`.
  - Parameters
    - `connection`: [`Connection`](https://github.com/IlluxDev/Oxide/blob/ceb3b4cace3e91908b48b4437d819d69bed4ee39/websocket/src/server/Connection.ts)`<CustomConnectionProperties /* Type Parameter */>` The connection object for the newly connected client.
  - Type Parameters
    `CustomConnectionProperties` The custom properties for the connection.

# Property: `totalConnected`
This is the number of connected and alive connections to this server.

 - Type: `number`.
 - Default: `0`.

# Method: `emit`
This method is used to send the same message to all connected and alive connections.

  - Parameters
    - `channel`: `string` The channel to send the messages to.
    - `message`: `MessageType /* Type Parameter */` (Optional) The actual message to send. Default: `{}`.
  - Type Parameters
    - `MessageType` The type for the message being sent.

# Method: `getConnection`
This method is used to get an alive and connected connection from this server.

  - Parameters
    - `identifier`: `string` The identifier for the connection.
  - Type Parameters
    - `ConnectionPropType` The types for the custom connection properties.
  - Return
    - Type: [`Connection`](https://github.com/IlluxDev/Oxide/blob/ceb3b4cace3e91908b48b4437d819d69bed4ee39/websocket/src/server/Connection.ts)`<ConnectionPropType /* Type Parameter */>` | `undefined`.

# Method: `getConnections`
This method is used to return all the currently alive connections to the server.

  - Type Parameters
    - `ConnectionPropType` The types for the custom connection properties.
  - Return
    - Type: [`Connection`](https://github.com/IlluxDev/Oxide/blob/ceb3b4cace3e91908b48b4437d819d69bed4ee39/websocket/src/server/Connection.ts)`<ConnectionPropType /* Type Parameter */>[]`.

# Method: `connectionExists`
This method is used to test and see if an alive connection with a specific identifier exists on this server.

  - Parameters
    - `identifier`: `string` The actual connection identifier.
  - Return
    - Type: `boolean` If the connection with that identifier actually exists.
    - Promise Error Argument: Error code from [Errors](./ServerErrors.md).

# Method `run`
This method is used to start a WebSocket server.

  - Return
    - Type: `Promise<void>` Promise for when the server is started.
    - Promise Error Argument: Error code from [Errors](./ServerErrors.md).

# Method `stop`
This method is used to stop a running server.

  - Return
    - Type: `Promise<void>` Promise for when the server has been fully stopped.
    - Promise Error Argument: Error code from [Errors](./ServerErrors.md).
