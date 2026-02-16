const rateLimitStore = {};

const WINDOW_SIZE = 60 * 1000;
const MAX_REQUESTS = 5;

const rateLimiter = (req, res, next) => {
  const ip = req.socket.remoteAddress;
  const now = Date.now();

  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = {
      count: 1,
      startTime: now,
    };
    return next();
  }

  const timePassed = now - rateLimitStore[ip].startTime;

  if (timePassed < WINDOW_SIZE) {
    rateLimitStore[ip].count++;

    if (rateLimitStore[ip].count > MAX_REQUESTS) {
      res.writeHead(429, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Too Many Requests" }));
    }
  } else {
    // Reset window
    rateLimitStore[ip] = {
      count: 1,
      startTime: now,
    };
  }

  next();
};

module.exports = rateLimiter;
