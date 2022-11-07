const _ = require("lodash");

// function validateProductInputTypes(product) {
// 	try {
// 		let erorList = [];
// 		if (!_.isString(product.name))
// 			erorList.push(generateErrorMessage("name", "Product Name", "String"));

// 		if (!_.isNumber(product.price)) erorList.push(generateErrorMessage("Product Price", "Number"));
// 		///////////
// 		if (!_.isNumber(product.cost)) erorList.push(generateErrorMessage("Product Cost", "Number"));

// 		if (product.description)
// 			if (!_.isString(product.description))
// 				erorList.push(generateErrorMessage("Product Description", "String"));
// 		if (product.unit) {
// 			if (!_.isString(product.unit.type))
// 				erorList.push(generateErrorMessage("Product Unit Type", "String"));
// 			if (!_.isNumber(product.unit.value))
// 				erorList.push(generateErrorMessage("Product Unit Value", "Number"));
// 		}

// 		return erorList;
// 	} catch (error) {
// 		console.log("VALIDATOR", error);
// 	}
// }

function validatePoductInputRequiements(product) {
	try {
		let errorList = [];

		if (_.isEmpty(product)) {
			return errorList.push({
				identifier: "request body",
				message: `Empty Request`,
			});
		}

		if (!("productName" in product)) {
			errorList.push(generateRequiredErrorMessage("name"));
		} else {
			if (_.isEmpty(product.productName)) errorList.push(generateRequiredErrorMessage("name"));

			if (!_.isString(product.productName))
				errorList.push(generateErrorMessage("name", "Product Name", "String"));
		}

		if (!("shopId" in product)) {
			errorList.push(generateRequiredErrorMessage("shop_id"));
		} else {
			if (_.isEmpty(product.productName)) errorList.push(generateRequiredErrorMessage("shop_id"));

			if (!_.isString(product.productName))
				errorList.push(generateErrorMessage("shop_id", "Shop ID", ""));
		}

		if ("productSlug" in product) {
			if (_.isEmpty(product.productName)) errorList.push(generateRequiredErrorMessage("slug"));

			if (!_.isString(product.productName))
				errorList.push(generateErrorMessage("slug", "Product Slug", "String"));
		}

		if (!("productPrice" in product)) errorList.push(generateRequiredErrorMessage("price"));
		else {
			if (!_.isNumber(Number(product.productPrice)))
				errorList.push(generateErrorMessage("price", "Product Price", "Number"));
		}

		if (!("productCost" in product)) errorList.push(generateRequiredErrorMessage("cost"));
		else {
			if (!_.isNumber(Number(product.productCost)))
				errorList.push(generateErrorMessage("price", "Product Price", "Number"));
		}

		if ("description" in product) {
			if (!_.isString(product.description))
				errorList.push(generateErrorMessage("description", "Product Description", "String"));
		}

		if ("productImages" in product) {
			if (!_.isArray(product.productImages))
				errorList.push(generateErrorMessage("images", "Product Images", "Array"));
		}

		if ("productUnit" in product) {
			if (!_.isString(product.productUnit))
				errorList.push(generateErrorMessage("unit", "Product Unit", "String"));
		}

		if ("productUnitValue" in product) {
			if (!_.isNumber(Number(product.productUnitValue)))
				errorList.push(generateErrorMessage("unit_value", "Product Unit Value", "Number"));
		}

		return errorList;
	} catch (error) {
		throw new Error(error);
	}
}

function generateErrorMessage(identifier, message, type) {
	return {
		identifier: identifier,
		message: `Wrong Input Provided for ${message} , Must be of type ${type}`,
	};
}

function generateRequiredErrorMessage(identifier) {
	return {
		identifier: identifier,
		message: `Product ${identifier} Must be Provided`,
	};
}

module.exports = {
	validatePoductInputRequiements,
};
