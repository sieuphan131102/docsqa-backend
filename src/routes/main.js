const UserRouter = require("./UserRouter");
const DocumentRouter = require("./DocumentRouter");
const ReviewRouter = require("./ReviewRouter");
const CategoryRouter = require("./CategoryRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/document", DocumentRouter);
  app.use("/api/review", ReviewRouter);
  app.use("/api/category", CategoryRouter);
};

module.exports = routes;
