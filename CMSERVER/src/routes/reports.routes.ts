import { Router, Request, Response } from 'express';
import {getMonthlyReport,getHistogramData} from '../logics/reports.logic'

const router = Router();

// GET: munth report
router.get('/monthly', getMonthlyReport);

// GET: histogram data
router.get('/histogram', getHistogramData);

export default router;