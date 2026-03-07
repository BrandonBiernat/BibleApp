import { translations } from "../../src/generated/prisma/client.js";
import { asTranslationId, TranslationId } from "../../types/branded-types.js";

export interface ITranslationRecord extends ITranslationRecordProps {
    id: TranslationId;
}

export interface ITranslationRecordProps {
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