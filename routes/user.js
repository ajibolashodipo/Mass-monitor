const express = require("express");
const router = express.Router();
const Weight = require("../models/weights");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/dashboard", isLoggedIn, async (req, res) => {
  //let userNom= req.session.user.namedUser);
  // const foundWeight = await Weight.find({})
  //   .sort({ userDate: 1, time: 1 })
  //   .exec();

  const foundUser = await User.findOne({ username: req.session.user.namedUser })
    .populate({ path: "weights", options: { sort: { userDate: 1, time: 1 } } })
    .exec();

  res.render("user/dashboard", { foundUser: foundUser });
});

//render weight form
router.get("/dashboard/new", isLoggedIn, async (req, res) => {
  res.render("user/new");
});
router.post("/dashboard/new", isLoggedIn, async (req, res) => {
  //add weight data
  const { date, time, weight, bmi } = req.body;
  //userDate comes from the mongoose schema btw
  const formDetail = {
    userDate: date,
    time,
    weight,
    bmi,
  };
  const myWeight = new Weight(formDetail);

  try {
    await myWeight.save();
    //find associated user
    // let userNom= req.session.user.namedUser);
    const user = await User.findOne({ username: req.session.user.namedUser });
    user.weights.push(myWeight);
    await user.save();
    //console.log(user);
    res.redirect("/user/dashboard");
  } catch (e) {
    res.status(400).send(e);
  }
});

//render update form
router.get("/dashboard/:id/edit", isLoggedIn, async (req, res) => {
  let id = req.params.id;
  try {
    const updateData = await Weight.findOne({ _id: id });
    // console.log(updateData);
    res.render("user/edit", { updateData });
  } catch (e) {
    res.send("an error occurred");
  }
});

//update
router.put("/dashboard/:id", isLoggedIn, async (req, res) => {
  const { date, time, weight, bmi } = req.body;
  const formUpdate = { userDate: date, time, weight, bmi };

  try {
    const data = await Weight.findByIdAndUpdate(req.params.id, formUpdate);
    res.redirect("/user/dashboard");
  } catch (e) {
    res.send("an error occurred");
  }
});

router.delete("/dashboard/:id", isLoggedIn, async (req, res) => {
  let id = req.params.id;
  try {
    await Weight.findOneAndDelete({ _id: id });
    res.redirect("/user/dashboard");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
