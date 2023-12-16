const UserRouter = require("./UserRouter");
const DocumentRouter = require("./DocumentRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/document", DocumentRouter);
};

module.exports = routes;
