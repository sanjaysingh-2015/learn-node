const { Sale, Product } = require("../models");
const { Op } = require("sequelize");

// CREATE SALE
exports.createSale = async (req, res) => {
  try {
    const { productId, quantity, amount } = req.body;

    // Validate product exists
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const sale = await Sale.create({ productId, quantity, amount });

    res.status(201).json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL SALES
exports.getAllSales = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const offset = (page - 1) * limit;
    const { productId, minAmount, maxAmount } = req.query;

    const where = {};
    if (productId) where.productId = productId;
    if (minAmount || maxAmount) {
      where.amount = {};
      if (minAmount) where.amount[Op.gte] = parseFloat(minAmount);
      if (maxAmount) where.amount[Op.lte] = parseFloat(maxAmount);
    }

    const { count, rows } = await Sale.findAndCountAll({
      where,
      include: [{ model: Product, as: "product" }],
      limit,
      offset,
      order: [["id", "DESC"]]
    });

    res.json({
      data: rows,
      meta: { total: count, page, limit, totalPages: Math.ceil(count / limit) }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET SALE BY ID
exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id, {
      include: [{ model: Product, as: "product" }],
    });

    if (!sale) return res.status(404).json({ message: "Sale not found" });

    res.json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE SALE
exports.updateSale = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ message: "Sale not found" });

    await sale.update(req.body);

    res.json({ message: "Sale updated", sale });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE SALE
exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ message: "Sale not found" });

    await sale.destroy();

    res.json({ message: "Sale deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL SALES OF A SPECIFIC PRODUCT
exports.getSalesByProduct = async (req, res) => {
  try {
    const sales = await Sale.findAll({
      where: { productId: req.params.productId },
      include: [{ model: Product, as: "product" }],
    });

    res.json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
