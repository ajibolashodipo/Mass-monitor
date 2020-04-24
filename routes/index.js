const express = require("express");
const router = express.Router();
const Weight = require("../models/weights");
const User = require("../models/users");

router.get("/", async (req, res) => {
  res.render("index/landing");
});
router.get("/register", async (req, res) => {
  res.render("index/register");
});
router.post("/register", async (req, res) => {
  //res.render("hello world");
  res.redirect("index/login");
});
router.get("/login", async (req, res) => {
  res.render("index/login");
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  res.redirect("/user/dashboard");
  //res.send("hello world");
});
router.post("/logout", async (req, res) => {
  //res.send("hello world");
});

router.get("/bmi", async (req, res) => {
  res.render("bmi");
});

module.exports = router;
