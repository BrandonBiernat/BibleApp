import { ChapterId, VerseId } from "../../types/branded-types.js";
import { IVerseRecord, IVerseRecordProps } from "./verse.model.js";

export interface IVerseRepository {
    build(
        chapterId: ChapterId,
        fn: (props: IVerseRecordProps) => void
    ): IVerseRecord;

    readById(id: VerseId): Promise<IVerseRecord>;
    readByIds(ids: VerseId[]): Promise<IVerseRecord[]>;
    readByChapterId(id: ChapterId): Promise<IVerseRecord[]>;
    readByChapterIds(id: ChapterId[]): Promise<IVerseRecord[]>;

    upsert(record: IVerseRecord): Promise<null>;
    upsert(records: IVerseRecord[]): Promise<null>;

    remove(id: VerseId): Promise<null>;
    remove(ids: VerseId[]): Promise<null>;
}