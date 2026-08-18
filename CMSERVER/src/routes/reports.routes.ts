import { Router, Request, Response } from 'express';
import {getMonthlyReport} from '../controllers/reports.controller'

const router = Router();

// GET: munth report
router.get('/monthly', getMonthlyReport);

// GET: histogram data
router.get('/histogram', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Histogram data (placeholder)' });
});

export default router;