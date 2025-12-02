const express = require("express");
const router = express.Router();
const {
  getProducts, getProduct, createProduct, updateProduct, deleteProduct, searchProducts, getProductWithSales
} = require("../controllers/product.controller");

const auth = require("../middleware/auth")();
const adminOnly = require("../middleware/auth")(["admin"]);

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Get products (with pagination)
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: list of products
 */
router.get("/", getProducts);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get("/:id", adminOnly, getProduct);

/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - active
 *             properties:
 *               name:
 *                 type: string
 *                 example: Laptop
 *               price:
 *                 type: number
 *                 example: 749.99
 *               description:
 *                 type: string
 *                 example: "High performance laptop"
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", adminOnly, createProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     summary: Update product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - active
 *             properties:
 *               name:
 *                 type: string
 *                 example: Laptop
 *               price:
 *                 type: number
 *                 example: 749.99
 *               description:
 *                 type: string
 *                 example: "High performance laptop"
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", adminOnly, updateProduct);
router.delete("/:id", adminOnly, deleteProduct);
router.get("/search", adminOnly, searchProducts);
router.get("/with-sales", adminOnly, getProductWithSales);

module.exports = router;
