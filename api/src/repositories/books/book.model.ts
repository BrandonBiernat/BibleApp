import { books } from "../../src/generated/prisma/client.js";
import { asBookId, asTranslationId, BookId, TranslationId } from "../../types/branded-types.js";

export interface IBookRecord extends IBookRecordProps {
    id: BookId;
    translationId: TranslationId;
}

export interface IBookRecordProps {
    title: string;
    number: number;
}

export const toBookRecord = (raw: books): IBookRecord => ({
    ...raw,
    id: asBookId(raw.id),
    translationId: asTranslationId(raw.translationId)
});