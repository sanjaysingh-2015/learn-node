module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Product", {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.STRING },
    active: { type: DataTypes.BOOLEAN, defaultValue: true }
  });
};

