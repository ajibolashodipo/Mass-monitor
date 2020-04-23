const express = require("express");
const router = express.Router();
const Weight = require("../models/weights");
const User = require("../models/users");

router.get("/dashboard", async (req, res) => {
  const foundWeight = await Weight.find({})
    .sort({ userDate: 1, time: 1 })
    .exec();
  // res.send(foundWeight);

  res.render("dashboard", { foundWeight: foundWeight });
});

router.get("/dashboard/new", async (req, res) => {
  res.render("new");
});
router.post("/dashboard/new", async (req, res) => {
  const { date, time, weight } = req.body;
  //userDate comes from the mongoose schema btw

  const formDetail = { userDate: date, time, weight };
  // console.log(formDetail);
  const myWeight = new Weight(formDetail);

  try {
    await myWeight.save();
    res.redirect("/user/dashboard");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
