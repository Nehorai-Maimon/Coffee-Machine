import {Request,Response} from 'express';
import {readMonthReport,readHistogramData} from '../controllers/orders.controllers'

// GET monthly report
const getMonthlyReport = async (req:Request,res:Response)=>{
    try{
        const {month,year} = req.query;

        if(!month||!year)
            return res.status(400).json({error: 'Please provide both month and year'});

        const startDate = new Date(Number(year),Number(month)-1,1);
        const  endDate = new Date(Number(year),Number(month),1);
        
        const orders = await readMonthReport(startDate,endDate);

        res.status(200).json(orders);
    }catch(error){
        console.error(`[controller]: Error fetching monthly report - ${(error as Error).message}`);
        res.status(500).json({error: 'Server error while fetching monthly report'});
    }
};

// GET histogram data
const getHistogramData = async (req:Request, res:Response)=>{
    try{
        const aggregatedData = await readHistogramData();

        const labels = aggregatedData.map(item => item._id);
        const data = aggregatedData.map(item => item.count);

        res.status(200).json({labels,data});
    }catch(error){
        console.error(`[controller]: Error fetching histogram - ${(error as Error).message}`);
        res.status(500).json({error: 'Server error while fetching histogram'});
    }
};

export {getMonthlyReport,getHistogramData};