import { STATUS_CODE } from "../statusCodes.js";
import { orderSchema } from "../schemas/orderSchema.js";

async function validateOrder(req, res, next) {
    
    const {date, payMethod, itemsList, totalPrice} = req.body;
    console.log(itemsList[0].name);
    const isOrderValid = orderSchema.validate({
        date,
        payMethod,
        totalPrice,
        itemsList
    });

    if(isOrderValid.error){
        return res.status(STATUS_CODE.BAD_REQUEST).send(isOrderValid.error.details[0].message);
    }

    next();

}

export { validateOrder }