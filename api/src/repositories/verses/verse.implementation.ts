import { PrismaClient } from "@prisma/client";
import { AppError, DatabaseError } from "../../errors/AppError.js";
import { asVerseId, ChapterId, VerseId } from "../../types/branded-types.js";
import { IVerseRepository } from "./verse.interface.js";
import { IVerseRecord, IVerseRecordProps, toVerseRecord } from "./verse.model.js";

export const makeVerseRepository = (
    db: PrismaClient
): IVerseRepository => {
    const build = (
        chapterId: ChapterId,
        fn: (props: IVerseRecordProps) => void
    ): IVerseRecord => {
        const id = asVerseId(crypto.randomUUID().toString());
        const props: IVerseRecordProps = {
            type: '',
            number: 0,
            headingText: ''
        };
        fn(props);
        return { id, chapterId, ...props };
    };

    const readById = async (id: VerseId): Promise<IVerseRecord> => {
        try {
            const verse = await
                db.verses.findUniqueOrThrow({
                    where: { id }
                });
            return toVerseRecord(verse);
        } catch (e: unknown) {
            if(e instanceof AppError) throw e;
            throw new DatabaseError('Failed to fetch verse', { cause: e });
        }
    };

    const readByIds = async (ids: VerseId[]): Promise<IVerseRecord[]> => {
        try {
            const verses = await
                db.verses.findMany({
                    where: { id: { in: ids } }
                });
            return verses.map(toVerseRecord);
        } catch (e: unknown) {
            if(e instanceof AppError) throw e;
            throw new DatabaseError('Failed to fetch verse', { cause: e });
        }
    };

    const readByChapterId = async (id: ChapterId): Promise<IVerseRecord[]> => {
        try {
            const verses = await
                db.verses.findMany({
                    where: { chapterId: id }
                });
            return verses.map(toVerseRecord);
        } catch (e: unknown) {
            if(e instanceof AppError) throw e;
            throw new DatabaseError('Failed to fetch verses', { cause: e });
        }
    };

    const readByChapterIds = async (ids: ChapterId[]): Promise<IVerseRecord[]> => {
        try {
            const verses = await
                db.verses.findMany({
                    where: { chapterId: { in: ids } }
                });
            return verses.map(toVerseRecord);
        } catch (e: unknown) {
            if(e instanceof AppError) throw e;
            throw new DatabaseError('Failed to fetch verses', { cause: e });
        }
    };

    const upsert = async (record: IVerseRecord | IVerseRecord[]): Promise<null> => {
        try {
            const records = Array.isArray(record) ? record : [record];
            await Promise.all(
                records.map(r => 
                    db.verses.upsert({
                        where: { id: r.id },
                        update: { type: r.type, number: r.number, headingText: r.headingText },
                        create: { ...r }
                    })
                )
            );
            return null;
        } catch (e: unknown) {
            if(e instanceof AppError) throw e;
            throw new DatabaseError('Failed to upsert verses', { cause: e });
        }
    };

    const remove = async (id: VerseId | VerseId[]) => {
        try {
            if(Array.isArray(id)) {
                await db.verses.deleteMany({
                    where: { id: { in: id } }
                });
            } else {
                await db.verses.delete({
                    where: { id }
                });
            }
            return null;
        } catch (e: unknown) {
            if(e instanceof AppError) throw e;
            throw new DatabaseError('Failed to delete verses', { cause: e });
        }
    };

    return { build, readById, readByIds, readByChapterId, readByChapterIds, upsert, remove };
};