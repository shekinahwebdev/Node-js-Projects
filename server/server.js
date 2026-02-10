const http = require("node:http");
const fs = require("node:fs");

const users = [];
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `https://${req.headers.host}`);

  if (req.method === "POST" && url.pathname === "/users") {
    let body = "";

    req.on("data", (chunk) => {
      chunk += body;
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        if (!data.name) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Name is required" }));
          return;
        }

        users.push(data);
        console.log(users);

        fs.writeFile("users.json", JSON.stringify(results, null, 2), (err) => {
          if (err) console.error("Write error:", err.message);
          else console.log("users.json created");
        });

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User added", users }));
      } catch (error) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid Json" }));
      }
    });
    return;
  }

  if (req.method === "GET" && url.pathname === "/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(3000, () => {
  console.log("Sever is running at port 7000....");
});
