import { NotFoundError, ValidationError } from "../../errors/AppError.js";
import { ITranslationRepository } from "../../repositories/translations/translation.interface.js";
import { TranslationId } from "../../types/branded-types.js";
import { ITranslationService } from "./translation.interface.js";
import { ITranslationEntity, toTranslationEntity } from "./translation.model.js";

export const makeTranslationService = (
  translationRepository: ITranslationRepository
): ITranslationService => {
  const getAll = async (): Promise<ITranslationEntity[]> => {
    const translations = await 
      translationRepository.readAll();

    if (!translations.length) {
      return [];
    }

    return translations.map(toTranslationEntity);
  };
  
  const getTranslation = async (id: TranslationId): Promise<ITranslationEntity> => {
    if(!id) {
      throw new ValidationError('ID is required');
    }

    const translation = await 
      translationRepository.readByTranslationId(id);

    return toTranslationEntity(translation);
  };

  const getTranslations = async (ids: TranslationId[]): Promise<ITranslationEntity[]> => {
    if (!ids.length) {
      throw new ValidationError("At least one UUID is required");
    }

    const translations = await 
      translationRepository.readByTranslationIds(ids);

    if (!translations.length) {
      throw new NotFoundError("Translations");
    }

    return translations.map(toTranslationEntity);
  };

  return { getAll, getTranslation, getTranslations };
};