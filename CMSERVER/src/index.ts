import express, {Request,Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import ordersRoutes from './routes/orders.routes';
import reportsRoutes from './routes/reports.routes';

import {connectDB} from './config/db';

// get the vars from env to the server
dotenv.config();

// connect to DB 
connectDB();

//create the server, listen to PORT || 3000 
const app = express();
const port = process.env.PORT || 3000;

// security and read json
app.use(cors());
app.use(express.json());

// routes
app.use('/orders',ordersRoutes);
app.use('/reports',reportsRoutes);

// return to every call
app.get('/',(req: Request,res:Response)=>{
    res.send('Coffee Machine Api is running!')
});

//turn on the server
app.listen(port, ()=>{
    console.log(`[server]: Server is running at http://localhost:${port}`);
});