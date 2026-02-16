const http = require("http");

const rateLimitStore = {};

const WINDOW_SIZE = 10 * 1000;
const MAX_REQUESTS = 5;

const server = http.createServer((req, res) => {
  const ip = req.socket.remoteAddress;
  console.log(ip);

  const currentTime = Date.now();
  //   console.log(currentTime);

  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = {
      count: 1,
      startTime: currentTime,
    };
  } else {
    const timePassed = currentTime - rateLimitStore[ip].startTime;
    // console.log(timePassed);

    if (timePassed < WINDOW_SIZE) {
      rateLimitStore[ip].count += 1;
    } else {
      // Reset window
      rateLimitStore[ip] = {
        count: 1,
        startTime: currentTime,
      };
    }
  }

  if (rateLimitStore[ip].count > MAX_REQUESTS) {
    res.statusCode = 429;
    res.end("Too Many Requests");
    return;
  }

  res.statusCode = 200;
  res.end("Request Successful");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
