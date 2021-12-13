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
