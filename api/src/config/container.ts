import { makeTranslationController } from "../controllers/translation/translation.controller.js";
import { makeBookRepository } from "../repositories/books/book.implementation.js";
import { makeChapterRepository } from "../repositories/chapters/chapter.implementation.js";
import { makeTranslationRepository } from "../repositories/translations/translation.implementation.js";
import { makeTranslationService } from "../services/translation/translation.service.js";
import { getDb } from "./db.js";

// --- Repositories ---
const translationRepo = makeTranslationRepository(getDb);
const bookRepo = makeBookRepository(getDb);
const chapterRepo = makeChapterRepository(getDb);

// --- Services ---
const translationService = makeTranslationService(translationRepo);

// --- Controllers ---
const translationController = makeTranslationController(translationService);

export const container = {
    translationController
} as const;