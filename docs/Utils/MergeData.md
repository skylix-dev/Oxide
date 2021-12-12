# MergeData: `function`
This function allows you to merge objects string and numbers.

# Usage Example
```ts
// TypeScript
import { mergeData } from "@illuxdev/oxide-utils";

const objectOne = {
    name: "initial"
}

console.log("Before Merge: " + objectOne.name);

const merged = mergeData(objectOne, {
    name: "Updated Name"
});

console.log("After Merge: " + objectOne.name);
```

```js
// JavaScript
const { mergeData } = require("@illuxdev/oxide-utils");

const objectOne = {
    name: "initial"
}

console.log("Before Merge: " + objectOne.name);

const merged = mergeData(objectOne, {
    name: "Updated Name"
});

console.log("After Merge: " + objectOne.name);
```
