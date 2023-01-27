import { STATUS_CODE } from "../statusCodes.js";
import { orderSchema } from "../schemas/orderSchema.js";

async function validateOrder(req, res, next) {
    
    const {orderId, date, paymethod, itemsList} = req.body;

    const isOrderValid = orderSchema.validate({
        orderId,
        date,
        paymethod,
        itemsList
    });

    if(isOrderValid.error){
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    }

    if( 
        paymethod !== 'debit' && 
        paymethod !== 'credit' && 
        paymethod !== 'crypto'
    ){
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
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