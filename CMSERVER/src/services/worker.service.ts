import {Worker, Job} from 'bullmq';
import IORedis from 'ioredis';
import dotenv from 'dotenv';
import {update} from '../controllers/orders.controllers';

dotenv.config();

// connect to Redis
const connection = new IORedis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    maxRetriesPerRequest: null
});
    
const sleep = (ms:number)=> new Promise(resolve=> setTimeout(resolve, ms));

export const coffeeWorker = new Worker(
    'coffeeQueue', //name
    async (job: Job)=>{
        const {orderId} = job.data;
        console.log(`[Worker]: Started processing order ${orderId}... wait 5 seconds`);

        try{
            //change status to 'preparing'
            await update(orderId,{status: 'preparing'});
            console.log(`[Worker]: status has been changed to preparing`);

            await sleep(5000);
            
            await update(orderId,{
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