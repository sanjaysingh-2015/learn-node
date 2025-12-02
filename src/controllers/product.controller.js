const { Product } = require("../models");

const { Op } = require("sequelize");

exports.getProducts = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const offset = (page - 1) * limit;

    // optional search q, and sort query like "price:asc" or "name:desc"
    const { q, sort } = req.query;
    const where = {};
    if (q) {
      where.name = { [Op.like]: `%${q}%` };
    }

    let order = [["id", "ASC"]];
    if (sort) {
      const [field, dir] = sort.split(":");
      if (field && dir && ["asc", "desc"].includes(dir.toLowerCase())) {
        order = [[field, dir.toUpperCase()]];
      }
    }

    const { count, rows } = await Product.findAndCountAll({
      where,
      order,
      limit,
      offset
    });

    res.json({
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createProduct = async (req, res) => {
  await Product.create(req.body);
  res.status(201).send("Product created");
};

exports.updateProduct = async (req, res) => {
  await Product.update(req.body, { where: { id: req.params.id } });
  res.send("Product updated");
};

exports.deleteProduct = async (req, res) => {
  await Product.destroy({ where: { id: req.params.id } });
  res.send("Product deleted");
};

exports.getProduct = async (req, res) => {
  const product = await Product.findAll({where: { id: req.params.id }});
  res.json(product);
};

exports.searchProducts = async (req, res) => {
  try {
    const { name, minPrice, maxPrice, category } = req.query;

    let conditions = {};

    // Name contains text (case insensitive)
    if (name) {
      conditions.name = { [require("sequelize").Op.like]: `%${name}%` };
    }

    // Price range
    if (minPrice || maxPrice) {
      conditions.price = {};
      if (minPrice) conditions.price[require("sequelize").Op.gte] = minPrice;
      if (maxPrice) conditions.price[require("sequelize").Op.lte] = maxPrice;
    }

    // Category filter
    if (category) {
      conditions.category = category;
    }

    const products = await Product.findAll({
      where: conditions
    });

    res.json(products);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProductWithSales = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Sale, as: "sales" }]
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};