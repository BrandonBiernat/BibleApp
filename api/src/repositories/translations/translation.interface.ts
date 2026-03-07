import { TranslationId } from "../../types/branded-types.js";
import { ITranslationRecord, ITranslationRecordProps } from "./translation.model.js";

export interface ITranslationRepository {
    build(fn: (props: ITranslationRecordProps) => void): ITranslationRecord;

    readAll(): Promise<ITranslationRecord[]>;
    readByTranslationId(id: TranslationId): Promise<ITranslationRecord>;
    readByTranslationIds(ids: TranslationId[]): Promise<ITranslationRecord[]>;

    upsert(record: ITranslationRecord): Promise<null>;
    upsert(records: ITranslationRecord[]): Promise<null>;

    remove(id: TranslationId): Promise<null>;
    remove(ids: TranslationId[]): Promise<null>;
}