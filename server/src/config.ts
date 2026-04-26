import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  DATABASE_URL: z.string().min(1),
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  DIFY_API_URL: z.string().url(),
  DIFY_CV_KEY: z.string().min(1),
  DIFY_HR_KEY: z.string().min(1),
  DIFY_LINKEDIN_KEY: z.string().min(1),
  PORT: z.coerce.number().default(4000),
  FRONTEND_URL: z.string().url(),
  FREE_USES_PER_TOOL: z.coerce.number().default(3),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error('Missing or invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = parsed.data;
