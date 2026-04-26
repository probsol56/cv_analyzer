declare namespace Express {
  interface Request {
    sessionId: string;
    ipFingerprint: string;
    userId?: string;
  }
}
