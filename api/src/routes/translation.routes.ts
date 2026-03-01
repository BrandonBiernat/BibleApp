import { Router } from 'express';
import { container } from '../config/container.js';

const router = Router();
const ctrl = container.translationController;

router.get('/',               ctrl.getAll);
router.get('/:translationId', ctrl.getTranslation);

export default router;