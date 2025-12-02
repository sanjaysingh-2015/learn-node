const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodeDb", "root", "RosesAreRed@c1312", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

module.exports = sequelize;
