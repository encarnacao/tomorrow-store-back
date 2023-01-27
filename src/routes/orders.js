import { Router } from 'express';
import { postOrder, getOrders } from '../controllers/orderControllers.js';
import { validateOrder } from '../middlewares/validateOrder.js';
import { authValidation } from '../middlewares/validateUser.js';

const router = Router();

router.post('/orders', authValidation, validateOrder, postOrder);
router.get('/orders', authValidation, getOrders);

export default router