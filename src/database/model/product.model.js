const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
	{
		type: {
			type: String,
		},
		value: { type: Number, default: 0 },
	},
	{
		timestamps: false,
		_id: false,
	}
);

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: [true, "Please Enter a Name"],
		},
		slug: {
			type: String,
			require: [true, "Please Enter a Name"],
			unique: true,
		},
		price: { type: Number, default: 0, require: [true, "Please Enter a Product Price"] },
		cost: { type: Number, default: 0, require: [true, "Please Enter a Product Cost"] },
		description: { type: String, required: false },
		shopId: {
			type: String,
			require: [true, "Please Enter a Shop Id"],
		},
		images: { type: Array, required: false },
		active: { type: Boolean, default: false, required: false },
		unit: unitSchema,
	},
	{ timestamps: true }
);

const Product = mongoose.model("product", productSchema);
module.exports = { Product, productSchema };
