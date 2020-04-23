const express = require("express");
const router = express.Router();
const Weight = require("../models/weights");
const User = require("../models/users");

router.get("/dashboard", async (req, res) => {
  const foundWeight = await Weight.find({})
    .sort({ userDate: 1, time: 1 })
    .exec();
  // res.send(foundWeight);

  res.render("user/dashboard", { foundWeight: foundWeight });
});

router.get("/dashboard/new", async (req, res) => {
  res.render("user/new");
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

router.get("/dashboard/:id/edit", async (req, res) => {
  let id = req.params.id;
  try {
    const updateData = await Weight.findOne({ _id: id });
    // console.log(updateData);
    res.render("user/edit", { updateData });
  } catch (e) {
    res.send("an error occurred");
  }
});

router.put("/dashboard/:id", async (req, res) => {
  const { date, time, weight } = req.body;
  const formUpdate = { userDate: date, time, weight };

  try {
    const data = await Weight.findByIdAndUpdate(req.params.id, formUpdate);
    res.redirect("/user/dashboard");
  } catch (e) {
    res.send("an error occurred");
  }
});

router.delete("/dashboard/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const deleteWeight = await Weight.findOneAndDelete({ _id: id });
    console.log(deleteWeight);
    res.redirect("/user/dashboard");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
