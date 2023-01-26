import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { getDatabase } from '../db/db.js';
import { STATUS_CODE } from '../statusCodes.js';

let db = getDatabase();

async function signUp(req, res){

    //MIDDLEWARE VALIDATE JOI BEFORE HERE

    const { email, password, name, photoURL } = req.body;

    const cryptedPassword = bcrypt.hashSync(password, 10);

    try{

        db.collection('users').insertOne({
            email,
            password: cryptedPassword, 
            name, 
            photoURL
        })

        return res.sendStatus(STATUS_CODE.CREATED);

    } catch (err) {
        console.log(err);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

async function signIn(req, res){

    const { email, password } = req.body;

    try{

        const user = await db.collection('users').findOne({
            email: email
        });

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if(!user || !isPasswordCorrect){
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }

        const token = uuid();

        db.collection('sessions').insertOne({
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
