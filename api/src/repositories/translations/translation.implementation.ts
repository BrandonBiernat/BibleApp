import { AppError, DatabaseError, NotFoundError } from "../../errors/AppError.js";
import { PrismaClient } from "../../src/generated/prisma/client.js";
import { asTranslationId, TranslationId } from "../../types/branded-types.js";
import { ITranslationRepository } from "./translation.interface.js";
import { ITranslationRecord, ITranslationRecordProps, toTranslationRecord } from "./translation.model.js";

export const makeTranslationRepository = (
    db: () => PrismaClient
): ITranslationRepository => {
  const build = (fn: (props: ITranslationRecordProps) => void): ITranslationRecord => {
    const id = asTranslationId(crypto.randomUUID().toString());
    const props: ITranslationRecordProps = {
      abbreviation: '',
      name: '',
      method: '',
      language: '',
      year: 0,
    };
    fn(props);
    return { id, ...props };
  }

  const readAll = async (): Promise<ITranslationRecord[]> => {
    try {
      const translations = await db().translations.findMany();

      if (!translations.length) {
        throw new NotFoundError('Translations');
      }

      return translations.map(toTranslationRecord);
    } catch (e: unknown) {
      if (e instanceof AppError) throw e;
      console.log(e);
      throw new DatabaseError('Failed to fetch translations', { cause: e });
    }
  };

  const readByTranslationIds = async (ids: TranslationId[]): Promise<ITranslationRecord[]> => {
    try {
      const translations = await db().translations.findMany({
        where: { id: { in: ids as string[] } }
      });

      if (!translations.length) {
        throw new NotFoundError('Translations');
      }

      return translations.map(toTranslationRecord);
    } catch (e: unknown) {
      if (e instanceof AppError) throw e;
      throw new DatabaseError('Failed to fetch translations', { cause: e });
    }
  };

  const readByTranslationId = async (id: TranslationId): Promise<ITranslationRecord> => {
    try {
      const translation = await db().translations.findUnique({
        where: { id: id as string }
      });

      if (!translation) {
        throw new NotFoundError('Translation');
      }

      return toTranslationRecord(translation);
    } catch (e: unknown) {
      if (e instanceof AppError) throw e;
      throw new DatabaseError('Failed to fetch translation', { cause: e });
    }
  };

  const upsert = async (record: ITranslationRecord | ITranslationRecord[]): Promise<null> => {
    try {
      const records = Array.isArray(record) ? record : [record];
            await Promise.all(
                records.map(r => 
                    db().translations.upsert({
                        where: { id: r.id },
                        update: { abbreviation: r.abbreviation, name: r.name, method: r.method, language: r.language, year: r.year },
                        create: { id: r.id, abbreviation: r.abbreviation, name: r.name, method: r.method, language: r.language, year: r.year },
                    })
                )
            );
      return null;
    } catch (e: unknown) {
      if (e instanceof AppError) throw e;
      throw new DatabaseError('Failed to upsert translation', { cause: e });
    }
  };

  const remove = async (id: TranslationId | TranslationId[]): Promise<null> => {
    try {
        if(Array.isArray(id)) {
            await db().translations.deleteMany({
                where: { id: { in: id } }
            });
        } else {
            await db().translations.delete({
                where: { id }
            });
        }
        return null;
    } catch (e: unknown) {
        if (e instanceof AppError) throw e;
        throw new DatabaseError('Failed to delete translation', { cause: e });
    }
  }

  return { build, readAll, readByTranslationIds, readByTranslationId, upsert, remove };
};