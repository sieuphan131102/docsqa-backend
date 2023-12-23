const UserRouter = require("./UserRouter");
const DocumentRouter = require("./DocumentRouter");
const ReviewRouter = require("./ReviewRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/document", DocumentRouter);
  app.use("/api/review", ReviewRouter);
};

module.exports = routes;
