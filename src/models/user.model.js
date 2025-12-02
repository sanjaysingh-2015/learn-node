module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "user" }
  }, {
    timestamps: true
  });
};
