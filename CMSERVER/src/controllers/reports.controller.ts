import {Request,Response} from 'express';
import Order from '../models/Orders';

// GET orders by month
export const getMonthlyReport = async (req:Request,res:Response)=>{
    try{
        const {month,year} = req.query;

        if(!month||!year)
            return res.status(400).json({error: 'Please provide both month and year'});

        const startDate = new Date(Number(year),Number(month)-1,1);
        const  endDate = new Date(Number(year),Number(month),1);
        
        const orders = await Order.find({
            createdAt:{
                $gte:startDate,
                $lt: endDate
            }
        })

        res.status(200).json(orders);
    }catch(error){
        console.error(`[controller]: Error fetching monthly report - ${(error as Error).message}`);
        res.status(500).json({error: 'Server error while fetching monthly report'});
    }
};