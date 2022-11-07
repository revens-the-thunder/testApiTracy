const { checkSlugExists } = require("../../database/dal/product.dal");
const _ = require("lodash");
function toPoductInput(product) {
	const productInput = { unit: {} };

	productInput.name = product.productName;
	productInput.shopId = product.shopId;
	if (product.productId) productInput._id = product.productId;
	productInput.cost = product.productCost;
	productInput.price = product.productPrice;

	if ("productImages" in product) productInput.images = product.productImages;

	if ("productSlug" in product) {
		if (!checkSlugExists(product.productSlug))
			productInput.slug = generateSlug(product.productName);
		else productInput.slug = product.productSlug;
	} else productInput.slug = generateSlug(product.productName);

	if ("description" in product) productInput.description = product.description;
	if ("productUnit" in product) productInput.unit.type = product.productUnit;
	if ("productUnitValue" in product) productInput.unit.value = product.productUnitValue;

	return productInput;
}

function toProductOutput(product) {
	const productOuput = {};
	productOuput.productId = product._id;
	productOuput.productName = product.name;
	productOuput.productSlug = product.slug;
	productOuput.description = product.description;
	productOuput.productPrice = product.price;
	productOuput.productCost = product.cost;
	productOuput.productImages = product.images;
	productOuput.productUnit = product.unit.type;
	productOuput.productUnitValue = product.unit.value;
	productOuput.shopId = product.shopId;

	return productOuput;
}

function generateSlug(payload) {
	console.log("GENERATE SLUG", payload);
	let slug = `${_.kebabCase(payload)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(
		1000 + Math.random() * 9000
	)}`;

	if (checkSlugExists(slug)) {
		slug = `${_.kebabCase(payload)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(
			1000 + Math.random() * 9000
		)}`;
	}

	return slug;
}

module.exports = {
	toPoductInput,
	toProductOutput,
};
