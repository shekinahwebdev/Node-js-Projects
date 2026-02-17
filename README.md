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

## WHY WORKING WITH ASYNC FS IS BETTER THAN SYNC FS

Working with asynchronous file system (FS) operations in Node.js is generally better than synchronous FS operations for several reasons:

1. Non-blocking: Asynchronous FS operations do not block the event loop, allowing other tasks to continue executing while waiting for the file system operation to complete. This can improve the overall performance and responsiveness of your application.
2. Scalability: Asynchronous FS operations can handle multiple requests simultaneously without blocking, making it more suitable for applications that require high concurrency and scalability.
3. Error handling: Asynchronous FS operations typically use callbacks or promises to handle errors, allowing for better error handling and more robust code. In contrast, synchronous FS operations can throw exceptions that may crash the application if not properly handled.
4. Resource management: Asynchronous FS operations can help manage resources more efficiently by allowing the application to perform other tasks while waiting for the file system operation to complete, reducing the likelihood of resource contention and improving overall performance.
5. User experience: Asynchronous FS operations can provide a better user experience by keeping the application responsive and preventing it from freezing or becoming unresponsive while performing file system operations.
   Overall, using asynchronous FS operations in Node.js can lead to better performance, scalability, and user experience compared to synchronous FS operations.

## Importing the HTTP module

const http = require("http");

Creating an HTTP server

const server = http.createServer((req, res) => {
// req → incoming request object
// res → response object
});

## Syntax breakdown:

http.createServer([requestListener])

requestListener → function with two parameters: (req, res)

req = request object (info about method, URL, headers, body)

res = response object (methods to send data back)

Returns a Server object → you can call server.listen() to start listening on a port.

Server listen method

server.listen(port, [hostname], [callback])

• port → number, e.g., 3000
• hostname → optional, default is "localhost"
• callback → function called when server starts

server.listen(3000, () => {
console.log("Server running on port 3000");
});

# Request object (req)

req.url : The URL of the request (e.g., /, /about)

req.method : HTTP method (GET, POST, etc.)

req.headers : Object containing request headers

req.on("data", callback) : Event: triggered for chunks of request body (POST data)

req.on("end", callback) : Event: triggered when request body is fully received

Response object (res)

## Method Description

res.writeHead(statusCode, headers) : Set HTTP status code & headers

res.write(data) : Write partial response (optional)

res.end([data]) : End response & optionally send final data

req.method tells your server what the client wants to do with a resource.

GET → read
POST → create
PUT → replace
PATCH → update
DELETE → remove

HTTP status codes are used in both HTTP and HTTPS protocols to indicate whether a specific request has been successfully completed

They are grouped into five classes based on their first digit.

Here is a list of the standard HTTP status codes, categorized by their class:

## 1xx Informational

The request has been received, and the process is continuing. Common codes include 100 Continue, 101 Switching Protocols, 102 Processing (WebDAV), and 103 Early Hints.

## 2xx Success

These codes indicate the request was successfully received and accepted. Common examples include:

200 OK: Request succeeded.

201 Created: Resource created.

202 Accepted: Request accepted for processing.

204 No Content: Request processed, but no content is returned.

206 Partial Content: Delivering a partial resource.

CLIENT → SERVER : stringify
SERVER → USE DATA : parse

SERVER → CLIENT : stringify
CLIENT → USE DATA : parse

so when making or sending a request to the server, the client data is in the form of an object, but the https can only send by string or bytes, so we need to use the JSON.stringify to convert the data into a string, now the server has receive the string, but the server must convert the string to an object using the JSON.parse to convert the string to object.

When the server is sending the response data to the client, we said that http can only send string / text so we need to stringify the response data, that’s converting the object to a string. Now when the client receives the response data, it need to then parse it to become and object.

## RATE LIMITER

A rate limiter is a mechanism that limits the number of requests a client can make to a server within a specified time frame. This is often used to prevent abuse and ensure fair usage of resources. A rate limiter can be implemented using various algorithms, such as token bucket or leaky bucket, and can be applied at different levels, such as per IP address, per user, or globally for all clients.

## I BUILT NODE.JS API ENGINE TO UNDERSTAND EXPRESS.JS BETTER

I built a simple Node.js API engine to understand how Express.js works under the hood. This API engine allows me to handle HTTP requests and responses, route requests to different endpoints, and manage middleware functions.

The API engine is built using the built-in `http` module in Node.js, and it provides a basic structure for handling incoming requests and sending responses. I implemented routing logic to direct requests to specific handlers based on the URL and HTTP method, and I also created a simple middleware system to allow for additional processing of requests before they reach the route handlers.

### Middleware

A middleware function is a function that runs the request and response objects, and can modify them or perform additional tasks before passing control to the next middleware function or route handler. Middleware functions are commonly used for tasks such as authentication, logging, and error handling.
Overall, building this API engine has given me a deeper understanding of how Express.js works and how it simplifies the process of building web applications in Node.js. It has also helped me appreciate the power and flexibility of Node.js for building server-side applications.
The middleware system works in the server

## Final Handler

The final handler is basically the last function that is called in the middleware chain. It is responsible for sending the final response back to the client after all middleware functions have been executed. The final handler typically checks if a response has already been sent by previous middleware functions, and if not, it sends a default response (e.g., 404 Not Found) to the client.

## next() function

The `next()` function is a callback function that is used in middleware functions to pass control to the next middleware function in the chain. When a middleware function is called, it can perform some operations on the request and response objects, and then call `next()` to indicate that it has finished processing and that the next middleware function should be executed. If a middleware function does not call `next()`, the request will be left hanging and the client will not receive a response.

## Features

• Pure http server
• Custom router
• Middleware system
• JSON parsing
• Error handling
• Logging
• Rate limiting
• Environment configs
• Tests

## MY MENTAL FLOW OF BUILDING THE API ENGINE

- Basic mental implementation:
  - When a client makes a request to the server, the server receives the request and processes it through a series of middleware functions. Each middleware function can perform specific tasks such as logging, authentication,rate limiting, etc. After processing the request through the middleware chain, the server sends a response back to the client.
  - So the client sends the request => the server receives the request => middleware functions are executed in order => router picks the correct route handler based on the request URL and method => the route handler processes the request and sends a response back to the client.

## Let’s Map Your Engine → Express

Your Engine Express. Equivalent

runMiddlewares() -app.use()

jsonParser -express.json()

router() -app.get() / app.post()

res.writeHead + res.end -res.status().json()

Rate limiter middleware. -app.use(rateLimiter)

http.createServer(app) -app.listen()

# Conclusion

Building a Node.js API engine from scratch has been an enlightening experience that has deepened my understanding of how Express.js works under the hood. By implementing features such as routing, middleware, JSON parsing, error handling, and rate limiting, I have gained valuable insights into the inner workings of a web server and how it processes incoming requests. This project has not only enhanced my knowledge of Node.js but also improved my ability to design and implement robust and efficient web applications. I now have a greater appreciation for the power and flexibility of Node.js and the convenience that Express.js provides for building web applications. Overall, this project has been a rewarding learning experience that has equipped me with the skills and knowledge to build my own web applications using Node.js and Express.js.
