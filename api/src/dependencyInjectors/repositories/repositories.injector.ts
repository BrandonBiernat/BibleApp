import prisma from "../../config/db.js";
import { makeBookRepository } from "../../repositories/books/index.js";
import { makeChapterRepository } from "../../repositories/chapters/index.js";
import { makeTranslationRepository } from "../../repositories/translations/index.js";
import { makeVerseRepository } from "../../repositories/verses/index.js";
import { IRepositoryInjector } from "./repositories.interface.js";

export const makeRepositoryInjector = (db = prisma): IRepositoryInjector => {
    const translationRepo = makeTranslationRepository(db);
    const bookRepo = makeBookRepository(db);
    const chapterRepo = makeChapterRepository(db);
    const verseRepo = makeVerseRepository(db);

    return { 
        translationRepo, 
        bookRepo, 
        chapterRepo, 
        verseRepo 
    };
}