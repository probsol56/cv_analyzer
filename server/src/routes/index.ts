import { Router } from 'express';
import authRouter from './auth';
import usageRouter from './usage';
import proxyRouter from './proxy';

const router = Router();

router.use('/auth', authRouter);
router.use('/usage', usageRouter);
router.use('/proxy', proxyRouter);

export { router };
