const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const ejs = require("ejs");
const Weight = require("./models/weights");
const User = require("./models/users");
const indexRoute = require("./routes/index");
const userRoute = require("./routes/user");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();
require("dotenv").config();

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

//method override
app.use(methodOverride("_method"));

//cookie parser
app.use(cookieParser("secret"));
//express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
    //cookie: { maxAge: 60000 },
  })
);

app.use(flash());

//global variables.

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  //res.locals.error = req.flash("error");
  next();
});

//route middleware
app.use("/", indexRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server ti bere lori port ${port}`);
});
