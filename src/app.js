const express = require("express");
const app = express();

// Body parser
app.use(express.json());

// Routes
const productRoutes = require("./routes/product.routes");
app.use("/api/products", productRoutes);

// Routes
const saleRoutes = require("./routes/sale.routes");
app.use("/api/sales", saleRoutes);

const analyticsRoutes = require("./routes/analytics.routes");
app.use("/api/analytics", analyticsRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const { swaggerUi, swaggerSpec } = require("./swagger");
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
