const jasonParser = require("../middlewares/jsonParser");
const logger = require("../middlewares/logger");
const rateLimiter = require("../middlewares/rateLimiter");

const finalHandler = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: "Request successfully handled!",
      method: req.method,
      url: req.url,
      body: req.body || null,
    }),
  );
};

const middlewares = [logger, rateLimiter, jasonParser];

const runMiddleWare = (req, res, middlewares, finalHandler) => {
  let index = 0;

  const next = () => {
    if (index < middlewares.length) {
      middlewares[index++](req, res, next);
    } else {
      finalHandler();
    }
  };
  next();
};

module.exports = { runMiddleWare, finalHandler, middlewares };
