const express = require("express");
const router = express.Router();
const user = require("./models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sequelize = require("./db");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.json({
      message: "No token provided!",
    });
  }

  jwt.verify(token, "jwt-secret-key-naja", (err, user) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.user = user;
    next();
  });
};

const verifyAdminRole = (req, res, next) => {
  const { role } = req.user;
  if (role === "admin") {
    next();
  } else {
    res.json({
      message: "Require Admin Role!",
    });
  }
};

router.get("/", [verifyToken, verifyAdminRole], async (req, res) => {
  const result = await sequelize.query("SELECT username,name,role FROM users", {
    type: sequelize.QueryTypes.SELECT,
  });
  res.json(result);
});

router.get("/profile/:username", [verifyToken], async (req, res) => {
  const { username } = req.params;
  const result = await user.findByPk(username);
  res.json({ username: result.username, name: result.name, role: result.role });
});

router.post("/register", async (req, res) => {
  const { username, password, name, role } = req.body;
  const result = await user.findOne({ where: { username: username } });

  if (!result || result === null) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const result = await user.create({
      username,
      password: hashPassword,
      name,
      role,
    });
    res.json(result);
  }
  res.json({ message: "Username is already in use!" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let result = await user.findOne({ where: { username: username } });

  if (result !== null) {
    if (bcrypt.compareSync(password, result.password)) {
      const { username, name, role } = result;
      const token = await jwt.sign(
        { username, name, role },
        "jwt-secret-key-naja",
        { expiresIn: "1h" }
      );
      res.json({
        message: "Enjoy your token!",
        token,
      });
    } else {
      res.json({ message: "Incorrect username or password" });
    }
  } else {
    res.json({ message: "Incorrect username or password" });
  }
});

module.exports = router;
