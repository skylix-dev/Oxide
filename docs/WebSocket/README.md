# WebSocket v1.0.0

Create fast, high-level WebSocket API servers.

# Basic Server

```ts
// TypeScript
import { Server } from "@illuxdev/oxide-websocket";

const server = new Server({
  port: 3549,
});

server
  .run()
  .then(() => {
    console.log(
      "The server is running at port 3549",
      "Address = ws://0.0.0.0:3549"
    );
  })
  .catch((error) => {
    console.log("The server failed to start", "Error = " + error);
  });
```

```js
// JavaScript
const { Server } = require("@illuxdev/oxide-websocket");

const server = new Server({
  port: 3549,
});

server
  .run()
  .then(() => {
    console.log(
      "The server is running at port 3549",
      "Address = ws://0.0.0.0:3549"
    );
  })
  .catch((error) => {
    console.log("The server failed to start", "Error = " + error);
  });
```

# You can also do this in Java! 😎

```xml
<!--Pom.xml-->
<dependency>
    <groupId>org.webjars.npm</groupId>
    <artifactId>@illuxdev/oxide-websocket</artifactId>
    <version>4.5.0</version>
</dependency>
```

```java
// Main.java
import javax.script.*;

public class Main {
	ScriptEngineManager factory = new ScriptEngineManager();
	ScriptEngine engine = factory.getEngineByName("nashorn");
	try {
            engine.eval(new java.io.FileReader("script.js"));
        } catch (final ScriptException se) { se.printStackTrace(); }
    }
}
```

```js
// script.js
const { Server } = require("@illuxdev/oxide-websocket");

const server = new Server({
  port: 3549,
});

server
  .run()
  .then(() => {
    console.log(
      "The server is running at port 3549",
      "Address = ws://0.0.0.0:3549"
    );
  })
  .catch((error) => {
    console.log("The server failed to start", "Error = " + error);
  });
```
