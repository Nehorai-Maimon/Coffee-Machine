import {Queue} from 'bullmq';
import IORedis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

// connect to Redis
const connection = new IORedis(process.env.REDIS_URI || 'redis://localhost:6379');

// create queue
export const coffeeQueue = new Queue('coffeeQueue',{connection});

// add order to the queue
export const addOrderToQueue = async (orderId: string, title: string, delayMinutes: number)=>{
    // Boss = 1, else = 2
    const priority = title === 'Boss' ? 1:2;
    
    // transform delay minutes to milisec
    const delay = delayMinutes * 60 * 1000;

    await coffeeQueue.add(
        'prepareCoffee', // task name
        {orderId},
        {
            priority,
            delay
        }
    );
    console.log(`[Queue]: Order ${orderId} added to queue. Priority: ${priority}, Delay: ${delay}ms`);
};