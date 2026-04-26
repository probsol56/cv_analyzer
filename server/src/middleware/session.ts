import { Request, Response, NextFunction } from 'express';
import { createHash, randomUUID } from 'crypto';

export const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let sid = req.cookies?.['sid'] as string | undefined;
  if (!sid) {
    sid = randomUUID();
    res.cookie('sid', sid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
  }
  req.sessionId = sid;
  req.ipFingerprint = createHash('sha256')
    .update((req.ip ?? '') + (req.headers['user-agent'] ?? ''))
    .digest('hex');
  next();
};
