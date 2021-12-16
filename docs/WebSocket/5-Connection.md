# Class: `Connection`

An instance of this class is received through the `connect` event from [Server](./3-Server.md).

- Type Parameters
  - `CustomProperties` The data type for the custom connection properties.

# Property: `props`

These are the custom properties for the connection which can be changed or updated when ever with access to an instance of a valid connection.

- Type: `CustomProperties /* Type Parameter */`

# Event: `message`

This event is fired when a message is **successfully** received **and** processed.

- Type Parameters
  - `MessageType` The data type for the message.
- Parameters
  - `message`: `MessageType /* Type Parameter */` The actual message.
- Event parameters
  - `channel`: `string` The channel to listen for messages on.

# Event: `messageError`

This event is fired when a message was received but an error occurred when trying to process the data.

- Parameters
  - `error` The error code from the enum. [ConnectionErrors](./6-ConnectionErrors.md)

# Event: `disconnect`

This event is fired when this connection loses the connection or disconnects from the server.

- Parameters
  - `code` The closing code or reason.

# Method: `getIdentifier`

The identifier that the server assigns.

- Return
  - Type: `string` The server assigned connection identifier.

# Method: `send`

This method is used to send a message to the connection.

- Parameters
  - `channel`: `string` The channel to send the message in.
  - `message`: `MessageType /* TYpe Parameter */` (Optional) The actual message. Default: `{}`.
- Type Parameters
  - `MessageType` The data type for the message being sent.
- Return
  - Type: `Promise<void>` Promise for if the message was sent.
- Promise Error Argument: Error code from [ConnectionErrors](./6-ConnectionErrors.md).

# Method: `isAlive`

This method is used to check if the connection is still alive.

- Return
  - Type: `boolean` If the connection is still alive and open.

# Method: `disconnect`

This method is used to disconnect and close the connection between the client and server.

- Return
  - Type: `Promise<void>` Promise for if the connection was closed successfully.
  - Promise Error Argument: Error code from [ConnectionErrors](./6-ConnectionErrors.md)
