// src/controllers/verse.controller.ts
import { Request, Response, NextFunction } from 'express';
import { toTranslationViewModel } from './translation.model.js';
import { asTranslationId } from '../../types/branded-types.js';
import { IServicesInjector } from '../../dependencyInjectors/services/services.interface.js';

export const makeTranslationController = (
  servicesInjector: IServicesInjector
) => ({
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const translations = await 
        servicesInjector.translationService.getAll();
      const models = translations.map(toTranslationViewModel);
      res.status(200).json({ status: 'success', data: models });
    } catch (err) {
      next(err);
    }
  },
  async getTranslation(req: Request, res: Response, next: NextFunction) {
    try {
      const translationId = asTranslationId(req.params.translationId as string);
      const translation = await 
        servicesInjector.translationService.getTranslation(translationId);
      const model = toTranslationViewModel(translation);
      res.status(200).json({ status: 'success', data: model });
    } catch (err) {
      next(err);
    }
  }
});

export type TranslationController = ReturnType<typeof makeTranslationController>;