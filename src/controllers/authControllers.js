import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { getDatabase } from '../db/db.js';
import { STATUS_CODE } from '../statusCodes.js';

let db = getDatabase();

async function signUp(req, res){

    const newUser = res.locals.user;

    const cryptedPassword = bcrypt.hashSync(password, 10);

    try{

        await db.collection('users').insertOne(
            {...newUser, password: cryptedPassword}
        )

        return res.sendStatus(STATUS_CODE.CREATED);

    } catch (err) {
        console.log(err);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

async function signIn(req, res){

    const user = res.locals.user;

    const token = uuid();

    try{

        await db.collection('sessions').insertOne({
            userId: user._id,
            token: token
        })

        const returnData = {
            token,
            user
        }

        return res.sendStatus(returnData);

    } catch (err) {
        console.log(err);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

export { signUp, signIn };
