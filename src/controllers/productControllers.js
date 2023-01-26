import { getDatabase } from "../db/db.js";

export async function getProducts(_, res) {
	try {
		const products = await getDatabase()
			.collection("products")
			.find({})
			.toArray();
		res.status(200).send(products);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
}