const Sequelize = require("sequelize");
const sequelize = require("../db");

const user = sequelize.define(
  "users",
  {
    // attributes
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: "user",
    },
  },
  {
    //option
  }
);

(async () => {
  await user.sync({ force: false });
})();

module.exports = user;
