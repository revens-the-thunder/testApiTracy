// Modules
const express = require("express");
const database = require("./database/init");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

//Routers
const router = require("./routes");

//Initialize
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({ "Access-Control-Allow-Origin": "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DB(mongoose) Connect
// const dbURI = process.env.MONGO_URL;
// (async function () {
// 	await database.connectDatabase();
// })();
// mongoose
// 	.connect(dbURI)
// 	.then((result) => app.listen(PORT, console.log(`Server Started on ${PORT}`)))
// 	.catch((err) => console.log(err));
//Routes
let dbURI = "";
const nodeEnv = String(process.env.NODE_ENV);
if (nodeEnv === "production") {
	dbURI = String(process.env.DB_URL);
} else {
	dbURI = String(process.env.DB_TEST_URL);
}

mongoose
	.connect(
		"mongodb+srv://mashfiq_rayhan:openmongodb@cluster0.391da62.mongodb.net/testApiTracy?retryWrites=true&w=majority"
	)
	.then((result) => app.listen(PORT, console.log(`Server Started on ${PORT}`)))
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});
app.use("/api/v1", router);

app.get("/", (req, res) => {
	res.status(200).json({
		error: false,
		success: true,
		data: {
			message: "API End Points are available at => domain.com/api/v1/product",
			info: {
				post_request_example: {
					productName: "test_product",
					productPrice: 30,
					productCost: 20,
					description: "Test Product",
					productImages: ["image1", "image2"],
					productUnit: "kg",
					productUnitValue: 1000,
					shopId: "3",
				},
			},
		},
	});
});

//404
