// src/controllers/verse.controller.ts
import { Request, Response, NextFunction } from 'express';
import { TranslationService } from '../../services/translation/translation.service.js';
import { toTranslationViewModel } from './translation.model.js';
import { asTranslationId } from '../../types/branded-types.js';

export const makeTranslationController = (translationService: TranslationService) => ({
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const translations = await translationService.getAll();
      const models = translations.map(toTranslationViewModel);
      res.status(200).json({ status: 'success', data: models });
    } catch (err) {
      next(err);
    }
  },
  async getTranslation(req: Request, res: Response, next: NextFunction) {
    try {
      const translationId = asTranslationId(req.params.translationId as string);
      const translation = await translationService.getTranslation(translationId);
      const model = toTranslationViewModel(translation);
      res.status(200).json({ status: 'success', data: model });
    } catch (err) {
      next(err);
    }
  }
});

export type VerseController = ReturnType<typeof makeTranslationController>;