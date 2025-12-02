const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("nodeDb", "root", "RosesAreRed@c1312", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

// Load models
const Product = require("./product.model")(sequelize, DataTypes);
const Sale = require("./sale.model")(sequelize, DataTypes);
const User = require("./user.model")(sequelize, DataTypes);

// Associations
Product.hasMany(Sale, {
  foreignKey: "productId",
  as: "sales"
});

Sale.belongsTo(Product, {
  foreignKey: "productId",
  as: "product"
});

// Sync models
sequelize.sync({ alter: true });

module.exports = { sequelize, Product, Sale, User };
