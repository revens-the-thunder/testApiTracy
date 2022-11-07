const mongoose = require("mongoose");
require("dotenv").config();

module.exports.connectDatabase = async () => {
	try {
		let dbURI = "";
		const nodeEnv = String(process.env.NODE_ENV);
		if (nodeEnv === "production") {
			dbURI = String(process.env.DB_URL);
		} else {
			dbURI = String(process.env.DB_TEST_URL);
		}
		mongoose
			.connect(dbURI)
			.then((result) => console.log("DATABASE CONNECTED"))
			.catch((err) => {
				console.log(err);
				process.exit(1);
			});
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
