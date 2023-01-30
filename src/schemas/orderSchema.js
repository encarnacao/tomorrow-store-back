import joi from "joi";

const orderSchema = joi.object({
	date: joi.string().required(),
	paymethod: joi.string().valid('debit','credit','crypto').required(),
	totalprice: joi.number().required(),
	itemsList: joi
		.array()
		.items({
			name: joi.string().required(),
			price: joi.number().required(),
		})
		.required(),
});

export { orderSchema };
