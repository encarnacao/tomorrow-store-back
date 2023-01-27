import { getDatabase } from '../db/db.js';
import { STATUS_CODE } from '../statusCodes.js';

async function postOrder(req, res){

    const {orderId, date, paymethod, itemsList} = req.body;

    const { session } = res.locals;

    try{
        //insert order in the DB
        getDatabase.collection('orders').insertOne({
            orderId: orderId, 
            userId: session.userId, 
            date: date,
            paymethod: paymethod,
            //totalprice: totalprice, (coming from frontend or backend ??)
            itemsList: itemsList
        })
        return res.sendStatus(STATUS_CODE.CREATED);

    } catch(err) {
        console.log(err);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

async function getOrders(req, res){

    const { user } = res.locals;

    try{
        //Find all orders from that user
        const userOrders = await getDatabase.collection('orders').find({
            userId: user._id
        }).toArray();
        return res.send(userOrders);

    } catch(err) {
        console.log(err);
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);

    }
}

export { postOrder, getOrders }


