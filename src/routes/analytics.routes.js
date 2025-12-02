const router = require("express").Router();
const analytics = require("../controllers/analytics.controller");

router.get("/overview", analytics.getOverview);
router.get("/monthly", analytics.monthlyRevenue);
router.get("/product-wise", analytics.productWiseSales);

module.exports = router;
