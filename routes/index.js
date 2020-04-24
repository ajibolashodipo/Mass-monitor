const express = require("express");
const router = express.Router();
const Weight = require("../models/weights");
const User = require("../models/users");
const bcrypt = require("bcryptjs");

//landing page
router.get("/", async (req, res) => {
  res.render("index/landing");
});

//register
router.get("/register", async (req, res) => {
  res.render("index/register");
});
router.post("/register", async (req, res) => {
  try {
    let { username, password, confirmPass } = req.body;

    //check for empty input fields
    if (!username || !password || !confirmPass) {
      console.log("User fields cannot be empty");
      return res.redirect("/register");
    }
    //check for equality between password fields
    if (password !== confirmPass) {
      console.log("Passwords do not match");
      return res.redirect("/register");
    }
    //check for password length
    if (password.length < 6) {
      console.log("Password too short");
      return res.redirect("/register");
    }

    //check if user doesnt exist in the db

    const user = await User.findOne({ username: req.body.username });
    if (user) {
      console.log("Account already exists");
      return res.redirect("/register");
    }
    //hash the password
    password = await bcrypt.hash(password, 8);

    //get details from register form
    const userDetail = { username, password };
    //make an instance of the user and save
    const newUser = new User(userDetail);
    await newUser.save();

    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.redirect("/register");
  }
});

//login
router.get("/login", async (req, res) => {
  res.render("index/login");
});
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    //check for empty input
    if (!username || !password) {
      console.log("User fields cannot be empty");
      return res.redirect("/login");
    }
    //check if user exists in the db
    const user = await User.findOne({ username: username });

    //console.log(user);
    if (!user) {
      console.log("Username or password is wrong");
      return res.redirect("/login");
    }
    //compare passwords using bcrypt
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      console.log("Username or password is wrong");
      return res.redirect("/login");
    }

    //we know at this point that the user is who they say they are

    //set session object
    let namedUser = user.username;
    let id = user._id;
    const sess = { namedUser, id };

    req.session.user = sess;
    req.session.isLoggedIn = true;
    await req.session.save();

    //console.log(req.session);
    res.redirect("/user/dashboard");

    //
  } catch (error) {
    console.log(error);
    res.redirect("/login");
  }
});
router.get("/logout", async (req, res) => {
  req.session.destroy(); //Destroys the session and logs out the user
  res.redirect("/login");
});

router.get("/bmi", async (req, res) => {
  res.render("bmi");
});

module.exports = router;
