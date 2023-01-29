import { STATUS_CODE } from "../statusCodes.js";
import { orderSchema } from "../schemas/orderSchema.js";

async function validateOrder(req, res, next) {
    
    const {date, paymethod, itemsList} = req.body;
    console.log(itemsList[0].name);
    const isOrderValid = orderSchema.validate({
        date,
        paymethod,
        itemsList
    });

    if(isOrderValid.error){
        
        return res.status(STATUS_CODE.BAD_REQUEST).send(isOrderValid.error.details[0].message);
    }

    next();

}

export { validateOrder }

// axios.post('URL POST ORDER', postDataBody, headers token bearer);

// onde 

// postDataBody = {
//     userId: userId
//     orderId: orderId,
//     date: (DD/MM/AA: hh/mm),
//     payment-method: 'debitcard', 'creditcard' or 'cripto' // (examples)
//     itemsList[
//         {   
//             name: Fly
//             price: 5000
//             image: image
//         },
//         {   
//             name: telekinesis
//             price: 15000
//             image: image
//         }
//     ]
// }