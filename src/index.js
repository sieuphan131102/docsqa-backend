const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/main");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3333;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api", express.static("uploads"));
app.use(bodyParser.json({ limit: "50mb" }));

routes(app);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected MongoDB successful!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("Express start on port " + port);
});
