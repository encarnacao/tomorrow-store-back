import { Router } from 'express';
import { signUp, signIn } from '../controllers/authControllers.js';
import { signUpBodyValidation, signInBodyValidation } from '../middlewares/validateUser.js';

const router = Router();

router.post('/sign-up', signUpBodyValidation, signUp);
router.post('/sign-in', signInBodyValidation, signIn);

export default router