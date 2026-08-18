import nodeReadline = require('node:readline');
import Order from '../models/Orders';
import {addOrderToQueue} from '../services/queue.service'

interface OrderData{
    name: string;
    title: string;
    delayMinutes: number;
}

//create new order
const create = async(orderData: OrderData)=>{
    // create in DB
    const newOrder = await Order.create(orderData);
    // push to the queue
    await addOrderToQueue(newOrder._id.toString(),newOrder.title, newOrder.delayMinutes);
    return newOrder;
} 

const readAll = async()=> await Order.find().sort({createdAt: -1});


export {create, readAll};