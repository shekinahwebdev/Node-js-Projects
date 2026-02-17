const http = require("node:http");
const app = require("./app");
require("dotenv").config({
  path: require("path").resolve(__dirname, "config/.env"),
});

const server = http.createServer(app);

// server.listen(process.env.PORT, () => {
//   console.log("Server is listening at port 5003");
// });

module.exports = server;
