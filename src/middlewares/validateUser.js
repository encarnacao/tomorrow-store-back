import { signUpSchema } from "../schemas/authSchemas.js";
import { STATUS_CODE } from "../statusCodes.js";
import { getDatabase } from "../db/db.js";
import bcrypt from 'bcrypt';

async function signUpBodyValidation(req, res, next){

    const user = req.body;

    const isValid = signUpSchema.validate(
        user,
        { abortEarly: false }
    )

    if(isValid.error){
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    }

    const userExists = await getDatabase().collection('users').findOne({
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

        const user = await getDatabase().collection('users').findOne({
            email: email
        });

        if(!user){
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if(!isPasswordCorrect){
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