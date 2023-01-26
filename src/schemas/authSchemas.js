import joi from 'joi';

const signUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    name: joi.string().required(),
    photoURL: joi.string().required()
});

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export { signUpSchema, signInSchema }