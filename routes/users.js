var express = require("express");
var router = express.Router();

const users = [
  { username: "tan", password: "12345678" },
  { username: "phet", password: "12345678" },
];

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

router.post("/login", function (req, res, next) {
  // Authen
  const username = req.body.username;
});

module.exports = router;
