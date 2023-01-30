import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { getDatabase } from '../db/db.js';
import { STATUS_CODE } from '../statusCodes.js';

async function signUp(req, res){

    const newUser = res.locals.user;

    const cryptedPassword = bcrypt.hashSync(newUser.password, 10);

    try{

        await getDatabase().collection('users').insertOne(
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
    delete user.password;

    const token = uuid();

    try{

        await getDatabase().collection('sessions').insertOne({
            userId: user._id,
            token: token
        })

        const returnData = {
            token,
            user
        }

        return res.send(returnData);

    } catch (err) {
        console.log(err);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

export { signUp, signIn };
