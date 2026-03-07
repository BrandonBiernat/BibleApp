import { BookId, TranslationId } from "../../types/branded-types.js";
import { IBookRecord, IBookRecordProps } from "./book.model.js";

export interface IBookRepository {
    build(
        translationId: TranslationId,    
        fn: (props: IBookRecordProps) => void
    ): IBookRecord;

    readByBookId(bookId: BookId): Promise<IBookRecord>;
    readByBookIds(bookIds: BookId[]): Promise<IBookRecord[]>;
    readByTranslationId(translationId: TranslationId): Promise<IBookRecord[]>;

    upsert(record: IBookRecord): Promise<null>;
    upsert(records: IBookRecord[]): Promise<null>;

    remove(id: BookId): Promise<null>;
    remove(ids: BookId[]): Promise<null>;
}