import express from 'express';
import translationRoutes from './routes/translation.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());

app.use('/translation', translationRoutes);

// Must be last
app.use(errorMiddleware);

export default app;