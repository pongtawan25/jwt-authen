var express = require("express");
var router = express.Router();

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.post("/register", function (req, res, next) {
  const data = req.body;
  res.send(data);
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

module.exports = router;
