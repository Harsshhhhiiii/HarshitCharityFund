import express from 'express';
const router = express.Router();
import { createPayment ,paymentVerification } from './paymentController.js';

router.route('/checkout').post(createPayment);
router.route('/paymentverification').post(paymentVerification);

export default router;