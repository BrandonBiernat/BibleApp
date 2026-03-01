// src/routes/index.ts
import { Router } from 'express';
import translationRoutes from './translation.routes.js';

const router = Router();

router.use('/translation', translationRoutes);

export default router;