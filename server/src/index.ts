import './config'; // validates env vars at startup
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import { sessionMiddleware } from './middleware/session';
import { errorHandler } from './middleware/errorHandler';
import { router } from './routes';

const app = express();

app.set('trust proxy', 1);

app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}));

app.use(sessionMiddleware);
app.use('/api', router);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
