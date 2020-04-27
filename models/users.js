const mongoose = require("mongoose");
const Weight = require("./weights");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  weights: [
    {
      type: mongoose.Schema.Types.ObjectId, //in the user schema there is a posts attribute and it is an array of ///object ids
      ref: "Weight",
    },
  ],
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
