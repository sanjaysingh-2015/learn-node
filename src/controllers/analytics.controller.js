const { sequelize, Product, Sale } = require("../models");
const { QueryTypes } = require("sequelize");

exports.getOverview = async (req, res) => {
  try {
    // total revenue and total sales count
    const totals = await Sale.findAll({
      attributes: [
        [sequelize.fn("SUM", sequelize.col("amount")), "totalRevenue"],
        [sequelize.fn("COUNT", sequelize.col("id")), "totalSales"]
      ]
    });

    const { totalRevenue, totalSales } = totals[0].dataValues;

    res.json({
      totalRevenue: parseFloat(totalRevenue || 0),
      totalSales: parseInt(totalSales || 0)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.monthlyRevenue = async (req, res) => {
  try {
    // MySQL date functions: group by YEAR & MONTH
    const rows = await sequelize.query(
      `SELECT YEAR(createdAt) AS year, MONTH(createdAt) AS month, SUM(amount) AS revenue, COUNT(*) AS salesCount
       FROM Sales
       GROUP BY YEAR(createdAt), MONTH(createdAt)
       ORDER BY YEAR(createdAt) DESC, MONTH(createdAt) DESC
       LIMIT 12`,
      { type: QueryTypes.SELECT }
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.productWiseSales = async (req, res) => {
  try {
    // product-wise totals
    const rows = await sequelize.query(
      `SELECT p.id AS productId, p.name, SUM(s.amount) AS totalRevenue, SUM(s.quantity) AS totalQuantity
       FROM Sales s
       JOIN Products p ON p.id = s.productId
       GROUP BY p.id, p.name
       ORDER BY totalRevenue DESC
       LIMIT 50`,
      { type: QueryTypes.SELECT }
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
