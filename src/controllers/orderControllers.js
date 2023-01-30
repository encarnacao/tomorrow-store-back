import { getDatabase } from "../db/db.js";
import { STATUS_CODE } from "../statusCodes.js";

async function postOrder(req, res) {
	const { date, payMethod, itemsList, totalPrice } = req.body;

	const { session } = res.locals;

	try {
		//Generate orderId
		const orderId = await getDatabase()
			.collection("orderId")
			.findOneAndUpdate(
				{
					name: "id",
				},
				{ $inc: { seq: 1 } },
				{ returnOriginal: false }
			);

		//insert order in the DB
		await getDatabase().collection("orders").insertOne({
			orderId: orderId.value.seq,
			userId: session.userId,
			date: date,
			payMethod: paymethod,
			totalPrice: totalprice,
			itemsList: itemsList,
		});
		return res.sendStatus(STATUS_CODE.CREATED);
	} catch (err) {
		console.log(err);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function getOrders(req, res) {
	const { user } = res.locals;

	try {
		//Find all orders from that user
		const userOrders = await getDatabase()
			.collection("orders")
			.find({
				userId: user._id,
			})
			.toArray();
		return res.send(userOrders);
	} catch (err) {
		console.log(err);
		return res.sendStatus(STATUS_CODE.BAD_REQUEST);
	}
}

export { postOrder, getOrders };
