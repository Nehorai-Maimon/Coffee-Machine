import {Worker, Job} from 'bullmq';
import IORedis from 'ioredis';
import Order from '../models/Orders';
import dotenv from 'dotenv';

dotenv.config();

// connect to Redis
const connection = new IORedis({
    host: 'localhost',
    port: 6379,
    maxRetriesPerRequest:null
});
    
export const coffeeWorker = new Worker(
    'coffeeQueue', //name
    async (job: Job)=>{
        const {orderId} = job.data;
        console.log(`[Worker]: Started processing order ${orderId}...`);

        try{
            await Order.findByIdAndUpdate(orderId,{
                done: true,
                status: 'ready'
            });

            console.log(`[Worker]: ✅ Coffee is ready for order ${orderId}! DB updated.`);        
        } catch(error){
            console.error(`[Worker]: ❌ Failed to process order ${orderId}`, error);
        }
    },
    {connection}
);

coffeeWorker.on('completed',(job)=>{
    console.log(`[Worker]: Job ${job.id} has completed successfully!`);
});

coffeeWorker.on('failed', (job, err) => {
  console.log(`[Worker]: Job ${job?.id} has failed with error: ${err.message}`);
});