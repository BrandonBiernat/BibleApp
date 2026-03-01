import { translations } from "../../src/generated/prisma/client.js";
import { asTranslationId, TranslationId } from "../../types/branded-types.js";

export interface ITranslationRepository {
    getAll(): Promise<ITranslationRecord[]>;
    getTranslations(ids: TranslationId[]): Promise<ITranslationRecord[]>;
    getTranslation(id: TranslationId): Promise<ITranslationRecord>;
}

export interface ITranslationRecord {
    id: TranslationId;
    abbreviation: string;
    name: string;
    method: string;
    language: string;
    year: number;
}

export function toTranslationRecord(raw: translations): ITranslationRecord {
    return {
        ...raw,
        id: asTranslationId(raw.id),
    };
}