import {Router, Request,Response} from 'express';
import {createOrder} from '../controllers/orders.controller';

const router = Router();

// POST: new order
router.post('/',createOrder);

// GET: get all orders
router.get('/',(req: Request, res: Response)=>{
    res.status(200).json({message: 'List of all orders (placeholder)'});
});

export default router; 