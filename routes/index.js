const express = require("express");
const router = express.Router();
const Weight = require("../models/weights");
const User = require("../models/users");

router.get("/", async (req, res) => {
  res.render("landing");
});
router.get("/register", async (req, res) => {
  res.render("register");
});
router.post("/register", async (req, res) => {
  //res.render("hello world");
  res.redirect("/login");
});
router.get("/login", async (req, res) => {
  res.render("login");
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);
  res.redirect("/user/dashboard");
  //res.send("hello world");
});
router.post("/logout", async (req, res) => {
  //res.send("hello world");
});

module.exports = router;
