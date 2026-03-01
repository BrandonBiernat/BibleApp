import { NotFoundError, ValidationError } from "../../errors/AppError.js";
import { ITranslationRepository } from "../../repositories/translation/translation.interface.js";
import { TranslationId } from "../../types/branded-types.js";
import { ITranslationEntity, toTranslationEntity } from "./translation.model.js";

export const makeTranslationService = (
  translationRepository: ITranslationRepository
) => ({
  async getAll(): Promise<ITranslationEntity[]> {
    const translations = await 
      translationRepository.getAll();

    if (!translations.length) {
      return [];
    }

    return translations.map(toTranslationEntity);
  },
  
  async getTranslation(id: TranslationId): Promise<ITranslationEntity> {
    if(!id) {
      throw new ValidationError('ID is required');
    }

    const translation = await 
      translationRepository.getTranslation(id);

    return toTranslationEntity(translation);
  },

  async getTranslations(id: TranslationId[]): Promise<ITranslationEntity[]>  {
    if (!id.length) {
      throw new ValidationError("At least one UUID is required");
    }

    const translations = await translationRepository.getTranslations(id);

    if (!translations.length) {
      throw new NotFoundError("Translations");
    }

    return translations.map(toTranslationEntity);
  },
});

export type TranslationService = ReturnType<typeof makeTranslationService>;