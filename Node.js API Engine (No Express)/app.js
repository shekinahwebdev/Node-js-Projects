const {
  runMiddleWare,
  finalHandler,
  middlewares,
} = require("./core/middleware");
const router = require("./core/router");

const app = (req, res) => {
  runMiddleWare(req, res, middlewares, () => {
    router(req, res);
  });
};

module.exports = app;
