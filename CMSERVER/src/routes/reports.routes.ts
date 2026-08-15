import { Router, Request, Response } from 'express';

const router = Router();

// GET: munth report
router.get('/monthly', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Monthly report data (placeholder)' });
});

// GET: histogram data
router.get('/histogram', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Histogram data (placeholder)' });
});

export default router;