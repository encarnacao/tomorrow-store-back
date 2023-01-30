import joi from "joi";

const orderSchema = joi.object({
	date: joi.string().required(),
	payMethod: joi.string().valid('debit','credit','crypto').required(),
	totalPrice: joi.number().required(),
	itemsList: joi
		.array()
		.items({
			name: joi.string().required(),
			price: joi.number().required(),
		})
		.required(),
});

export { orderSchema };
