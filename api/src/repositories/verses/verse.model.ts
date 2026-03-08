import { verses } from "@prisma/client";
import { asChapterId, asVerseId, ChapterId, VerseId } from "../../types/branded-types.js";

export interface IVerseRecord extends IVerseRecordProps {
    id: VerseId;
    chapterId: ChapterId;
}

export interface IVerseRecordProps {
    type: string;
    number: number;
    headingText: string;
}

export const toVerseRecord = (raw: verses) => ({
    ...raw,
    id: asVerseId(raw.id),
    chapterId: asChapterId(raw.chapterId)
});