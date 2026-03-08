import { PrismaClient } from "@prisma/client";
import { AppError, DatabaseError } from "../../errors/AppError.js";
import { asChapterId, BookId, ChapterId } from "../../types/branded-types.js";
import { IChapterRepository } from "./chapter.interface.js";
import { IChapterRecord, IChapterRecordProps, toChapterRecord } from "./chapter.model.js";

export const makeChapterRepository = (
    db: PrismaClient
): IChapterRepository => {
    const build = (
        bookId: BookId,
        fn: (props: IChapterRecordProps) => void
    ): IChapterRecord => {
        const id = asChapterId(crypto.randomUUID().toString());
        const props: IChapterRecordProps = {
            title: '',
            number: 0
        };
        fn(props);
        return { id, bookId, ...props };
    };

    const readByChapterId = async (id: ChapterId) => {
        try {
            const row = await 
                db.chapters.findUniqueOrThrow({
                    where: { id } 
                });
            return toChapterRecord(row);
        } catch (e: unknown) {
            if (e instanceof AppError) throw e;
            throw new DatabaseError('Failed to fetch chapters', { cause: e });
        }
    };

    const readByChapterIds = async (ids: ChapterId[]): Promise<IChapterRecord[]> => {
        try {
            const rows = await 
                db.chapters.findMany({
                    where: { id: { in: ids } } 
                });
            return rows.map(toChapterRecord);
        } catch (e: unknown) {
            if (e instanceof AppError) throw e;
            throw new DatabaseError('Failed to fetch chapters', { cause: e });
        }
        
    };

    const readByBookId = async (id: BookId): Promise<IChapterRecord[]> => {
        try {
            const rows = await 
                db.chapters.findMany({ 
                    where: { bookId: id } 
                });
            return rows.map(toChapterRecord);
        } catch (e: unknown) {
            if (e instanceof AppError) throw e;
            throw new DatabaseError('Failed to fetch chapters', { cause: e });
        }
    };

    const readByBookIds = async (ids: BookId[]): Promise<IChapterRecord[]> => {
        try {
            const rows = await 
                db.chapters.findMany({
                    where: { bookId: { in: ids } } 
                });
            return rows.map(toChapterRecord);
        } catch (e: unknown) {
            if (e instanceof AppError) throw e;
            throw new DatabaseError('Failed to fetch chapters', { cause: e });
        }
    };

    const upsert = async (record: IChapterRecord | IChapterRecord[]): Promise<null> => {
        try {
            const records = Array.isArray(record) ? record : [record];
            await Promise.all(
                records.map(r => 
                    db.chapters.upsert({
                        where: { id: r.id },
                        update: { title: r.title, number: r.number },
                        create: { id: r.id, title: r.title, number: r.number, bookId: r.bookId },
                    })
                )
            );
            return null;
        } catch (e: unknown) {
            if (e instanceof AppError) throw e;
            throw new DatabaseError('Failed to upsert chapters', { cause: e });
        }
    };

    const remove = async (id: ChapterId | ChapterId[]): Promise<null> => {
        try {
            if(Array.isArray(id)) {
                await db.chapters.deleteMany({
                    where: { id: { in: id } }
                });
            } else {
                await db.chapters.delete({
                    where: { id }
                });
            }
            return null;
        } catch (e: unknown) {
            if (e instanceof AppError) throw e;
            throw new DatabaseError('Failed to upsert chapters', { cause: e });
        }
    };

    return { build, readByChapterId, readByChapterIds, readByBookId, readByBookIds, upsert, remove };
};