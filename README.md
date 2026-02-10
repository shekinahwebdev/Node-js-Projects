## NODE.JS

Node.js is a runtime for running javascript code.
It is built on top of the V8 engine, which is the same engine that powers Google Chrome. Node.js allows developers to run javascript code on the server side, which means that they can build web applications, APIs, and other types of server-side applications using javascript.

## PROCESS.ARGV

`process.argv` is an array that contains the command-line arguments passed to a Node.js script. The first element of the array is the path to the Node.js executable, and the second element is the path to the script being executed. Any additional command-line arguments are included in the array starting from index 2.

## WHY NODE.JS CAN ACCESS THE OS

Node.js can access the operating system because it is built on top of the V8 engine, which is a C++ library. This allows Node.js to interact with the underlying operating system and perform tasks such as reading and writing files, creating network connections, and executing system commands. Additionally, Node.js provides a set of built-in modules that allow developers to access various OS functionalities, such as the `fs` module for file system operations and the `os` module for accessing information about the operating system.

## Global Objects in Node.js and Browser

Global object in the browser is `window`, while in Node.js it is `global`. Both of these objects provide a global scope for variables and functions, allowing them to be accessed from anywhere in the code. However, the global object in Node.js does not have access to the DOM (Document Object Model) or other browser-specific features, while the global object in the browser does not have access to Node.js-specific features such as file system operations or network connections.

For example:
var x = 10;
console.log(global.x); // Output: undefined (in Node.js)
This is because in Node.js each file is treated as a separate module, and variables declared in one module are not automatically added to the global scope. To make a variable accessible globally in Node.js, you can explicitly attach it to the `global` object:

For example:
global.x = 10;
console.log(global.x); // Output: 10 (in Node.js)

## MODULE WRAPPER FUNCTION

function(exports, require, module, **filename, **dirname) {
// Module code goes here
}

The module wrapper function is a function that wraps the code of each module in Node.js. It provides a local scope for the module's variables and functions, preventing them from polluting the global scope. The wrapper function takes several parameters, including `exports`, `require`, `module`, `__filename`, and `__dirname`.
