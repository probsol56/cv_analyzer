import { Router, Request } from 'express';
import { optionalAuth } from '../middleware/auth';
import { usageService } from '../services/usageService';

const router = Router();

router.get('/:tool', optionalAuth, async (req: Request, res) => {
  const tool = req.params['tool'] as string;
  const summary = await usageService.getUsageSummary({
    userId: req.userId,
    sessionId: req.sessionId,
    tool,
  });
  res.json(summary);
});

export default router;
