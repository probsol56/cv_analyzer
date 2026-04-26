import { db } from '../lib/prisma';
import { config } from '../config';

const ONE_DAY_AGO = () => new Date(Date.now() - 24 * 60 * 60 * 1000);

export const usageService = {
  async getCount(params: { userId?: string; sessionId: string; tool: string }): Promise<number> {
    if (params.userId) {
      return db.usageLog.count({ where: { user_id: params.userId, tool: params.tool } });
    }
    return db.usageLog.count({ where: { session_id: params.sessionId, tool: params.tool } });
  },

  async isExhausted(params: {
    userId?: string;
    sessionId: string;
    ipFingerprint: string;
    tool: string;
  }): Promise<boolean> {
    if (params.userId) return false;

    const byCookie = await db.usageLog.count({
      where: { session_id: params.sessionId, tool: params.tool },
    });
    if (byCookie >= config.FREE_USES_PER_TOOL) return true;

    const byFingerprint = await db.usageLog.count({
      where: {
        ip_fingerprint: params.ipFingerprint,
        tool: params.tool,
        used_at: { gte: ONE_DAY_AGO() },
      },
    });
    return byFingerprint >= config.FREE_USES_PER_TOOL;
  },

  async increment(params: {
    userId?: string;
    sessionId: string;
    ipFingerprint: string;
    tool: string;
  }): Promise<void> {
    await db.usageLog.create({
      data: {
        user_id: params.userId ?? null,
        session_id: params.sessionId,
        ip_fingerprint: params.ipFingerprint,
        tool: params.tool,
      },
    });
  },

  async getUsageSummary(params: {
    userId?: string;
    sessionId: string;
    tool: string;
  }): Promise<{ used: number; limit: number; isExhausted: boolean }> {
    const used = await this.getCount(params);
    const limit = params.userId ? Infinity : config.FREE_USES_PER_TOOL;
    return {
      used,
      limit: params.userId ? -1 : config.FREE_USES_PER_TOOL,
      isExhausted: !params.userId && used >= config.FREE_USES_PER_TOOL,
    };
  },

  async backfillUserId(sessionId: string, userId: string): Promise<void> {
    await db.usageLog.updateMany({
      where: { session_id: sessionId, user_id: null },
      data: { user_id: userId },
    });
  },
};
