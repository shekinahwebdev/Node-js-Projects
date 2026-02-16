const useRoute = require("../../Node.js API Engine (No Express)/routes/userRoute");

const router = (req, res) => {
  const pathUrl = new URL(req.url, `http://${req.headers.host}`);
  const path = pathUrl.pathname;
  const method = req.method;

  if (path === "/users" && method === "GET") {
    return useRoute.getAllUsers(req, res);
  }

  if (path.startsWith("/users/") && method === "GET") {
    const id = path.split("/")[2];
    return useRoute.getNewUser(req, res, id);
  }

  if (path === "/users" && method === "POST") {
    return useRoute.postNewUser(req, res);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
};

module.exports = router;
