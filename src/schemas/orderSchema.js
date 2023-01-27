import joi from 'joi';

const orderSchema = joi.object({

    orderId: joi.number().required(),

    date: joi.string().required(),

    paymethod: joi.string().required(),

    itemsList: joi.array().items({
        name: joi.string().required,
        price: joi.number().required
    }).required()

});

export { orderSchema }