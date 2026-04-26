import { Router, Request } from 'express';
import { supabaseAdmin } from '../lib/supabase';
import { db } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { usageService } from '../services/usageService';

const router = Router();

router.get('/me', requireAuth, async (req: Request, res) => {
  const { data: { user } } = await supabaseAdmin.auth.getUser(
    req.headers.authorization!.replace('Bearer ', '')
  );
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const upserted = await db.user.upsert({
    where: { id: user.id },
    update: {
      name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? null,
      avatar_url: user.user_metadata?.avatar_url ?? null,
    },
    create: {
      id: user.id,
      email: user.email!,
      name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? null,
      avatar_url: user.user_metadata?.avatar_url ?? null,
      provider: user.app_metadata?.provider ?? 'unknown',
    },
  });

  await usageService.backfillUserId(req.sessionId, user.id);

  res.json(upserted);
});

export default router;
