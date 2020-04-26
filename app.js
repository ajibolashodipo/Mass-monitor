const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const indexRoute = require("./routes/index");
const userRoute = require("./routes/user");
const flash = require("connect-flash");
const session = require("express-session");
// Package
// const MongoDBStore = require("connect-mongodb-session")(session);
const MongoStore = require("connect-mongo")(session);

const app = express();
require("dotenv").config();

const url = process.env.DATABASEURL;
const port = process.env.PORT || 8080;

console.log(url);
// const store = new MongoStore({
//   mongooseConnection: mongoose.connection,
//   collection: "mySessions",
// });

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
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

//express-session
app.use(
  session({
    secret: "This is a secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: "mySessions"
    }),
    resave: true,
    saveUninitialized: true
  })
);

console.log(mongoose.connection);
app.use(flash());

//global variables.

app.use((req, res, next) => {
  res.locals.currentUser = req.session.username;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  //res.locals.error = req.flash("error");
  next();
});

//route middleware
app.use("/", indexRoute);
app.use("/user", userRoute);
// app.get("/", (req, res) => {
//   res.send("hello");
// });

app.listen(port, () => {
  console.log(`Server ti bere lori port ${port}`);
});
