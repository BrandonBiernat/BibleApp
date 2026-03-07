import { TranslationId } from "../../types/branded-types.js";
import { ITranslationEntity } from "./translation.model.js";

export interface ITranslationService {
    getAll(): Promise<ITranslationEntity[]>;
    getTranslation(id: TranslationId): Promise<ITranslationEntity>;
    getTranslations(ids: TranslationId[]): Promise<ITranslationEntity[]>;
}