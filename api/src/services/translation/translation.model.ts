import { ITranslationRecord } from "../../repositories/translations/translation.model.js";
import { TranslationId } from "../../types/branded-types.js";

export interface ITranslationEntity {
    id: TranslationId;
    abbreviation: string;
    name: string;
    method: string;
    language: string;
    year: number;
}

export function toTranslationEntity(record: ITranslationRecord): ITranslationEntity {
    return {
        ...record,
    };
}