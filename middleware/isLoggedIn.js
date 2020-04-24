const Weight = require("../models/weights");
const User = require("../models/users");

function isLoggedIn(req, res, next) {
  if (req.session.isLoggedIn) {
    return next();
  }
  return res.redirect("/login");
}

module.exports = isLoggedIn;
