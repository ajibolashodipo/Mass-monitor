const mongoose = require("mongoose");
const weightSchema = new mongoose.Schema({
  userDate: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  bmi: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Weight = new mongoose.model("Weight", weightSchema);

module.exports = Weight;
