import { AppError, DatabaseError } from "../../errors/AppError.js";
import { PrismaClient } from "../../src/generated/prisma/client.js";
import { asBookId, BookId, TranslationId } from "../../types/branded-types.js";
import { IBookRepository } from "./book.interface.js";
import { IBookRecord, IBookRecordProps, toBookRecord } from "./book.model.js";

export const makeBookRepository = (
    db: () => PrismaClient
): IBookRepository => {
    const build = (
        translationId: TranslationId,  
        fn: (props: IBookRecordProps) => void
    ): IBookRecord => {
        const id = asBookId(crypto.randomUUID().toString());
        const props: IBookRecordProps = {
            title: '',
            number: 0,
        };
        fn(props);
        return { id, translationId, ...props }
    };

    const readByBookId = async (id: BookId): Promise<IBookRecord> => {
        try {
            const book = await
                db().books.findFirstOrThrow({
                    where: { id }
                });
            return toBookRecord(book);
        } catch (e: unknown) {
            if (e instanceof AppError) throw e;
            throw new DatabaseError('Failed to fetch book', { cause: e });
        }
    };

    const readByBookIds = async (ids: BookId[]): Promise<IBookRecord[]> => {
        try {
            const books = await
                db().books.findMany({
                    where: { id: { in: ids } }
                });
            return books.map(toBookRecord);
        } catch (e: unknown) {
            if (e instanceof AppError) throw e;
            throw new DatabaseError('Failed to fetch books', { cause: e });
        }
    };

    const readByTranslationId = async (translationId: TranslationId): Promise<IBookRecord[]> => {
        try {
            const books = await
                db().books.findMany({
                    where: { translationId }
                });
            return books.map(toBookRecord);
        } catch (e: unknown) {
            if (e instanceof AppError) throw e;
            throw new DatabaseError('Failed to fetch books', { cause: e });
        }
    };

    const upsert = async (record: IBookRecord | IBookRecord[]): Promise<null> => {
        try {
            const records = Array.isArray(record) ? record : [record];
            await Promise.all(
                records.map(r => 
                    db().books.upsert({
                        where: { id: r.id },
                        update: { title: r.title, number: r.number },
                        create: { id: r.id, translationId: r.translationId, title: r.title, number: r.number }
                    })
                )
            );
            return null;
        } catch (e: unknown) {
            if (e instanceof AppError) throw e;
            throw new DatabaseError('Failed to fetch books', { cause: e });
        }
    };

    const remove = async (id: BookId | BookId[]): Promise<null> => {
        try {
            if(Array.isArray(id)) {
                await db().books.deleteMany({
                    where: { id: { in: id } }
                });
            } else {
                await db().books.delete({
                    where: { id }
                });
            }
            return null;
        } catch (e: unknown) {
            if (e instanceof AppError) throw e;
            throw new DatabaseError('Failed to fetch books', { cause: e });
        }
    }

    return { build, readByBookId, readByBookIds, readByTranslationId, upsert, remove };
}