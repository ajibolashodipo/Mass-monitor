const express = require("express");
const router = express.Router();
const Weight = require("../models/weights");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/dashboard", isLoggedIn, async (req, res) => {
  const foundUser = await User.findOne({ username: req.session.username })
    .populate({ path: "weights", options: { sort: { userDate: 1, time: 1 } } })
    .exec();
  const foundUserReverse = await User.findOne({
    username: req.session.username
  })
    .populate({
      path: "weights",
      options: { sort: { date: -1, time: -1 } }
    })
    .exec();

  res.render("user/dashboard", {
    foundUser: foundUser,
    foundUserReverse: foundUserReverse
  });
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
    bmi
  };
  const myWeight = new Weight(formDetail);

  try {
    await myWeight.save();
    //find associated user

    const user = await User.findOne({ username: req.session.username });
    user.weights.push(myWeight);
    await user.save();
    req.flash("success_msg", "Weight Data Added Successfully");
    res.redirect("/user/dashboard");
  } catch (e) {
    req.flash("error_msg", "An error occurred. Try Again");
    res.redirect("/user/dashboard");
  }
});

//render update form
router.get("/dashboard/:id/edit", isLoggedIn, async (req, res) => {
  let id = req.params.id;
  try {
    const updateData = await Weight.findOne({ _id: id });
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
    req.flash("success_msg", "Weight Data Updated Successfully");
    res.redirect("/user/dashboard");
  } catch (e) {
    req.flash("error_msg", "An error occurred. Try Again");
    res.redirect("/user/dashboard");
  }
});

router.delete("/dashboard/:id", isLoggedIn, async (req, res) => {
  let id = req.params.id;
  try {
    await Weight.findOneAndDelete({ _id: id });

    req.flash("success_msg", "Weight Data Deleted Successfully");
    res.redirect("/user/dashboard");
  } catch (error) {
    req.flash("error_msg", "An error occurred. Try Again");
    res.redirect("/user/dashboard");
  }
});

module.exports = router;
