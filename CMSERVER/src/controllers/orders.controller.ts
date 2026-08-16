import {Request, Response} from 'express';
import Order from '../models/Orders';
import { addOrderToQueue} from '../services/queue.service';

export const createOrder = async (req: Request, res: Response)=>{
    try{
        // extract the validation details from the request
        const {name, title,delayMinutes, password} = req.body;
        
        if(!name || !title){
            res.status(400).json({error: 'Name and title are required'});
            return;
        }

        if(title == 'Boss'){
            if(password !== 'boss123'){
                res.status(401).json({error: 'Invalid boss password'});
                return;
            }
        }

        // create the order
        const newOrder = new Order({
            name,
            title,
            delayMinutes: delayMinutes||0
        });
        
        // save the order in DB
        await newOrder.save();

        //enter to the queue
        await addOrderToQueue(newOrder._id.toString(), newOrder.title,newOrder.delayMinutes);

        res.status(201).json({
            message: 'Order saved to database successfully!',
            order: newOrder
        });
    } catch(error){
        console.log(`[controller]: Error creating order - ${(error as Error).message}`);
        res.status(500).json({error: 'Server error while creating order'});
    }
};