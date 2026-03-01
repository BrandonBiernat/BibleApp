import { AppError, DatabaseError, NotFoundError } from "../../errors/AppError.js";
import { PrismaClient } from "../../src/generated/prisma/client.js";
import { TranslationId } from "../../types/branded-types.js";
import { ITranslationRecord, ITranslationRepository, toTranslationRecord } from "./translation.interface.js";

export class TranslationRepository implements ITranslationRepository {
    constructor(private db: () => PrismaClient) {};

    async getAll(): Promise<ITranslationRecord[]> {
        try {
            const translations = await this.db().translations.findMany();

            if (!translations.length) {
                throw new NotFoundError('Translations');
            }

            return translations.map(toTranslationRecord);
        } catch (e: unknown) {
            if(e instanceof AppError) throw e;
            console.log(e);
            throw new DatabaseError('Failed to fetch translations', { cause: e });
        }
    }

    async getTranslations(ids: TranslationId[]): Promise<ITranslationRecord[]> {
        try {
            const translations = await this.db().translations.findMany({
                where: { id: { in: ids as string[] }}
            });

            if (!translations.length) {
                throw new NotFoundError('Translations');
            }

            return translations.map(toTranslationRecord);
        } catch (e: unknown) {
            if(e instanceof AppError) throw e;
            throw new DatabaseError('Failed to fetch translations', { cause: e });
        }
    }

    async getTranslation(id: TranslationId): Promise<ITranslationRecord> {
        try {
            const translation = await this.db().translations.findUnique({
                where: { id: id as string }
            });
                
            if (!translation) {
                throw new NotFoundError('Translation');
            }

            return toTranslationRecord(translation);
        } catch(e: unknown) {
            if(e instanceof AppError) throw e;
            throw new DatabaseError('Failed to fetch translation', { cause: e });
        }
    }
}