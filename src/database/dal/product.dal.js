const { Product } = require("../model/product.model");

module.exports.createProduct = async (product) => {
	try {
		const newProduct = new Product(product);
		const savedProduct = await newProduct.save();
		if (savedProduct) return savedProduct;
		else throw Error("Failed To create New Product");
	} catch (err) {
		console.log("Create Product :", err);
		throw Error(err);
	}
};

module.exports.updateProduct = async (id, product) => {
	try {
		console.log("In UPDATE", id);
		const updatedProduct = await Product.findByIdAndUpdate(
			id,
			{
				$set: product,
			},
			{ new: true }
		);
		console.log(updatedProduct);
		if (updatedProduct) return updatedProduct;
		else throw Error("Failed To Update Product");
	} catch (err) {
		console.log("Update Product :", err);
		throw Error(err);
	}
};

module.exports.updateProductWithSlug = async (slug, product) => {
	try {
		const updatedProduct = await Product.findOneAndUpdate(
			{ slug },
			{
				$set: product,
			},
			{ new: true }
		);

		if (updatedProduct) return updatedProduct;
		else throw Error("Failed To Update Product");
	} catch (err) {
		console.log("Update Product :", err);
		throw Error(err);
	}
};

module.exports.getbyId = async (id) => {
	try {
		const product = await Product.findById(id);
		if (product) return product;
		else throw Error("Failed To Get Product");
	} catch (err) {
		console.log("Create Product :", err);
		throw Error(err);
	}
};

module.exports.getbySlug = async (slug) => {
	try {
		console.log(slug);
		const product = await Product.findOne({ slug });
		if (product) return product;
		else throw Error("Failed To Get Product");
	} catch (err) {
		console.log("Create Product :", err);
		throw Error(err);
	}
};

module.exports.checkSlugExists = async (slug) => {
	try {
		const product = await Product.find({ slug });
		if (product.length === 0) {
			console.log("checkSlugExists ::", product);
			return false;
		}
		return true;
	} catch (err) {
		console.log("Create Product :", err);
		throw Error(err);
	}
};

module.exports.deleteProductbyId = async (id) => {
	try {
		const deletedProduct = await Product.findByIdAndDelete(id);
		if (deletedProduct) return deletedProduct;
		else throw Error("Failed To Delete Product");
	} catch (err) {
		console.log("Delete Product :", err);
		throw Error(err);
	}
};

module.exports.deleteProductbySlug = async (slug) => {
	try {
		const deletedProduct = await Product.findOneAndDelete({ slug });
		if (deletedProduct) return deletedProduct;
		else throw Error("Failed To Delete Product");
	} catch (err) {
		console.log("Delete Product :", err);
		throw Error(err);
	}
};

module.exports.getAllProducts = async () => {
	try {
		const products = await Product.find().sort({ createdAt: -1 });
		if (products) return products;
		else throw Error("Failed to Add product");
	} catch (error) {
		throw error;
	}
};
