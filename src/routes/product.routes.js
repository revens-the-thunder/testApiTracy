const { Router } = require("express");
const productController = require("../controller/product.controller");
const productRouter = Router();

productRouter.get("/", productController.getAllProduct); // get All Product List

productRouter.post("/", productController.createNewProduct); // Create New Product

productRouter.get("/:id", productController.getProductById); // get specific Product

productRouter.put("/:id", productController.updateProduct); // update product

productRouter.delete("/:id", productController.deleteProduct); // delete product

module.exports = productRouter;
