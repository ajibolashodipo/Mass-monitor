const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Weight = require("./models/weights");
const User = require("./models/users");
const indexRoute = require("./routes/index");
const userRoute = require("./routes/user");
const app = express();

let url = "mongodb://127.0.0.1/weight_app";
let port = 8080;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Mongo Connected");
  })
  .catch((e) => {
    console.log("An error occured");
  });

//middleware
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

//route middleware
app.use("/", indexRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server ti bere lori port ${port}`);
});
