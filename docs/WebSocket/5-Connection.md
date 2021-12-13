# Class: `Connection`
An instance of this class is received through the `connect` event from [Server](./3-Server.md).

  - Type Parameters
    - `CustomProperties` The data type for the custom connection properties.

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
