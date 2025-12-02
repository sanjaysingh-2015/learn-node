const router = require("express").Router();
const {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
  getSalesByProduct
} = require("../controllers/sale.controller");

// CRUD Routes
router.post("/", createSale);
router.get("/", getAllSales);
router.get("/:id", getSaleById);
router.put("/:id", updateSale);
router.delete("/:id", deleteSale);

// Fetch sales for a specific product
router.get("/product/:productId", getSalesByProduct);

module.exports = router;
