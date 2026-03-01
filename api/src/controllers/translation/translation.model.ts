import { ITranslationEntity } from "../../services/translation/translation.model.js";

export interface TranslationViewModel {
    id: string;
    abbreviation: string;
    name: string;
    method: string;
    language: string;
    year: number;
}

export function toTranslationViewModel(translation: ITranslationEntity): TranslationViewModel {
    return {
        ...translation,
        id: translation.id as string,
    };
}