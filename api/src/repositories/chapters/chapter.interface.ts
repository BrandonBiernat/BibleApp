import { BookId, ChapterId } from "../../types/branded-types.js";
import { IChapterRecord, IChapterRecordProps } from "./chapter.model.js";

export interface IChapterRepository {
    build(
        bookId: BookId,
        fn: (props: IChapterRecordProps) => void
    ): IChapterRecord;

    readByChapterId(id: ChapterId): Promise<IChapterRecord>;
    readByChapterIds(id: ChapterId[]): Promise<IChapterRecord[]>;
    readByBookId(id: BookId): Promise<IChapterRecord[]>;
    readByBookIds(ids: BookId[]): Promise<IChapterRecord[]>;

    upsert(record: IChapterRecord): Promise<null>;
    upsert(record: IChapterRecord[]): Promise<null>;

    remove(id: ChapterId): Promise<null>;
    remove(ids: ChapterId[]): Promise<null>;
}