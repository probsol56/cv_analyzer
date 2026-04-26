import { Router, Request, Response } from 'express';
import multer from 'multer';
import { optionalAuth } from '../middleware/auth';
import { usageService } from '../services/usageService';
import { difyService } from '../services/difyService';
import { config } from '../config';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

const checkGate = async (req: Request, res: Response, tool: string): Promise<boolean> => {
  const exhausted = await usageService.isExhausted({
    userId: req.userId,
    sessionId: req.sessionId,
    ipFingerprint: req.ipFingerprint,
    tool,
  });
  if (exhausted) {
    const used = await usageService.getCount({ sessionId: req.sessionId, tool });
    res.status(402).json({ error: 'limit_reached', used, limit: config.FREE_USES_PER_TOOL });
    return false;
  }
  return true;
};

const logUsage = (req: Request, tool: string) =>
  usageService.increment({
    userId: req.userId,
    sessionId: req.sessionId,
    ipFingerprint: req.ipFingerprint,
    tool,
  });

// CV Reviewer
router.post('/cv/upload', optionalAuth, upload.single('file'), async (req: Request, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file provided' });
  try {
    const result = await difyService.uploadCvFile(req.file.buffer, req.file.originalname, req.file.mimetype);
    res.json(result);
  } catch (err) {
    res.status(502).json({ error: 'File upload failed' });
  }
});

router.post('/cv/analyze', optionalAuth, async (req: Request, res) => {
  if (!await checkGate(req, res, 'cv-reviewer')) return;
  try {
    const userId = req.userId ?? req.sessionId;
    const result = await difyService.analyzeCV(req.body.inputs, userId);
    await logUsage(req, 'cv-reviewer');
    res.json(result);
  } catch (err) {
    res.status(502).json({ error: 'Analysis failed' });
  }
});

// HR Scanner
router.post('/hr/upload', optionalAuth, upload.single('file'), async (req: Request, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file provided' });
  try {
    const result = await difyService.uploadHrFile(req.file.buffer, req.file.originalname, req.file.mimetype);
    res.json(result);
  } catch (err) {
    res.status(502).json({ error: 'File upload failed' });
  }
});

router.post('/hr/scan', optionalAuth, async (req: Request, res) => {
  if (!await checkGate(req, res, 'hr-scanner')) return;
  try {
    const userId = req.userId ?? req.sessionId;
    const result = await difyService.runHrScan(req.body.inputs, userId);
    await logUsage(req, 'hr-scanner');
    res.json(result);
  } catch (err) {
    res.status(502).json({ error: 'Scan failed' });
  }
});

// LinkedIn Optimizer
router.post('/linkedin/optimize', optionalAuth, async (req: Request, res) => {
  if (!await checkGate(req, res, 'linkedin')) return;
  try {
    const userId = req.userId ?? req.sessionId;
    const result = await difyService.runLinkedinOptimize(req.body.inputs, userId);
    await logUsage(req, 'linkedin');
    res.json(result);
  } catch (err) {
    res.status(502).json({ error: 'Optimization failed' });
  }
});

export default router;
