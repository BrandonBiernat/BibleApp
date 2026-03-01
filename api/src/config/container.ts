import { makeTranslationController } from "../controllers/translation/translation.controller.js";
import { TranslationRepository } from "../repositories/translation/translation.implementation.js";
import { makeTranslationService } from "../services/translation/translation.service.js";
import { getDb } from "./db.js";

// --- Repositories ---
const translationRepo = new TranslationRepository(getDb);

// --- Services ---
const translationService = makeTranslationService(translationRepo);

// --- Controllers ---
const translationController = makeTranslationController(translationService);

export const container = {
    translationController
} as const;