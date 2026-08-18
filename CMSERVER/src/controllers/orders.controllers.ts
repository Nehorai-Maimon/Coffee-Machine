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

const readAll = async ()=> await Order.find().sort({createdAt: -1});

const readMonthReport = async (startDate: Date,endDate:Date)=>{
    return await Order.find({
                createdAt:{
                    $gte:startDate,
                    $lt: endDate
                }
            });
}

const readHistogramData = async ()=> {
    return await Order.aggregate([
            {
                $group:{
                    _id: '$name', //aggrigation by name filed
                    count: {$sum:1} // add 1 for every item
                }
            },
            {
                $sort: {count: -1} // from high to low
            }
        ]);
}

export {create, readAll,readMonthReport,readHistogramData};