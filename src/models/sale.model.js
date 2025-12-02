module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Sale", {
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false }
  });
};
