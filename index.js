const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const filecontroller = require("./controllers/fileController");
const app = express();

app.use("/public", express.static(__dirname + "/public"));
//set the template engine
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render(__dirname + "/views/index.ejs");
});

//middlewares
app.use("/", filecontroller);

//connect to db
mongoose
  .connect("mongodb://127.0.0.1:27017/csv", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

const port = 3001;
app.listen(port, () => {
  console.log("Server is up and running on port----------> " + port);
});
