const { Router } = require("express");
const productRouter = require("./product.routes");
const router = Router();

router.use("/product", productRouter);

module.exports = router;
