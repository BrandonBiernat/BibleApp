import { asBookId, asChapterId, BookId, ChapterId } from "../../types/branded-types.js";
import { chapters } from "../../src/generated/prisma/client.js";

export interface IChapterRecord extends IChapterRecordProps {
    id: ChapterId;
    bookId: BookId;
}

export interface IChapterRecordProps {
    title: string;
    number: number;
}

export const toChapterRecord = (raw: chapters): IChapterRecord => ({
    ...raw,
    id: asChapterId(raw.id),
    bookId: asBookId(raw.bookId)
});