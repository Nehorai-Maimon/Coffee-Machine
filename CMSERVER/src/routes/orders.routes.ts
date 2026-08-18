import {Router, Request,Response} from 'express';
import {createOrder, getOrders} from '../logics/orders.logic';

const router = Router();

// POST: new order
router.post('/',createOrder);

// GET: get all orders
router.get('/',getOrders);

export default router; 