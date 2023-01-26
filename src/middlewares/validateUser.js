import { signUpSchema } from "../schemas/authSchemas";
import { STATUS_CODE } from "../statusCodes";
import { getDatabase } from "../db/db";
import bcrypt from 'bcrypt';

let db = getDatabase();

async function signUpBodyValidation(req, res, next){

    const user = req.body;

    const isValid = signUpSchema.validate(
        user,
        { abortEarly: false }
    )

    if(isValid.error){
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    }

    const userExists = await db.collection('users').findOne({
        email: user.email
    })

    if(userExists){
        return res.sendStatus(STATUS_CODE.CONFLICT);
    }

    res.locals.user = user;

    next();

}

async function signInBodyValidation(req, res, next){

    const { email, password } = req.body;

    try{

        const user = await db.collection('users').findOne({
            email: email
        });

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if(!user || !isPasswordCorrect){
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }

        res.locals.user = user;

    } catch (err) {
        console.log(err);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

    next();

}

export { signUpBodyValidation, signInBodyValidation }