const { productValidator } = require("../utils/validator");
const { productMaper } = require("../utils/mapper");

const { responseHandler } = require("../utils/handler");

const Product = require("../database/dal/product.dal");

module.exports.productTest = async (req, res) => {
	res.status(200).json({
		error: false,
		success: true,
		data: "OK",
	});
};

module.exports.createNewProduct = async (req, res) => {
	try {
		const inputsValidateError = productValidator.validatePoductInputRequiements(req.body);

		if (inputsValidateError.length !== 0)
			return res.status(400).json(responseHandler.handleErrorResponse(inputsValidateError));

		const product = productMaper.toPoductInput(req.body);
		console.log("CREATE PRODUCT ::", product);
		const newProduct = await Product.createProduct(product);
		console.log(newProduct);
		if (!newProduct)
			return res.status(500).json(responseHandler.handleErrorResponse("Something Went Wrong"));

		const responseProduct = productMaper.toProductOutput(newProduct);

		return res.status(200).json(responseHandler.handleSuccessResponse(responseProduct));
	} catch (error) {
		console.log(error);
		res.status(500).json(responseHandler.handleErrorResponse("Something Went Wrong"));
	}
};

module.exports.updateProduct = async (req, res) => {
	try {
		const productId = req.params.id;
		const productSlug = await Product.checkSlugExists(productId);

		const inputsValidateError = productValidator.validatePoductInputRequiements(req.body);
		if (inputsValidateError.length !== 0)
			return res.status(400).json(responseHandler.handleErrorResponse(inputsValidateError));

		const product = productMaper.toPoductInput(req.body);
		console.log(product);
		let updatedProduct;
		if (productSlug) {
			updatedProduct = await Product.updateProductWithSlug(productId, product);
		} else {
			updatedProduct = await Product.updateProduct(productId, product);
		}
		if (!updatedProduct) throw Error("Failed to update Product");
		const responseProduct = productMaper.toProductOutput(updatedProduct);
		return res.status(200).json(responseHandler.handleSuccessResponse(responseProduct));
	} catch (error) {
		console.log(error);
		res.status(500).json(responseHandler.handleErrorResponse(error));
	}
};

module.exports.getProductById = async (req, res) => {
	try {
		const productId = req.params.id;
		const productSlug = await Product.checkSlugExists(productId);
		let product;
		if (productSlug) {
			product = await Product.getbySlug(productId);
		} else {
			product = await Product.getbyId(productId);
		}
		if (!product)
			return res.status(404).json(responseHandler.handleErrorResponse("Product Dosen't Exists"));
		const responseProduct = productMaper.toProductOutput(product);
		return res.status(200).json(responseHandler.handleSuccessResponse(responseProduct));
	} catch (error) {
		console.log(error);
		res.status(500).json(responseHandler.handleErrorResponse(error));
	}
};

module.exports.getAllProduct = async (req, res) => {
	try {
		const productList = await Product.getAllProducts();
		if (!productList)
			return res.status(500).json(responseHandler.handleErrorResponse("Something Went Wrong"));
		const formatedPoduct = productList.map((product) => productMaper.toProductOutput(product));
		return res.status(200).json(responseHandler.handleSuccessResponse(formatedPoduct));
	} catch (error) {
		console.log(error);
		res.status(500).json(responseHandler.handleErrorResponse(error));
	}
};

module.exports.deleteProduct = async (req, res) => {
	try {
		const productId = req.params.id;
		const productSlug = await Product.checkSlugExists(productId);

		let product;
		if (productSlug) {
			product = await Product.deleteProductbySlug(productId);
		} else {
			product = await Product.deleteProductbyId(productId);
		}

		if (!product)
			return res.status(404).json(responseHandler.handleErrorResponse("Product Dosen't Exists"));

		return res.status(200).json(responseHandler.handleSuccessResponse("Product Deleted "));
	} catch (error) {
		console.log(error);
		res.status(500).json(responseHandler.handleErrorResponse(error));
	}
};
