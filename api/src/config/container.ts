import { makeTranslationController } from "../controllers/translation/translation.controller.js";
import { makeTranslationRepository } from "../repositories/translations/translation.implementation.js";
import { makeTranslationService } from "../services/translation/translation.service.js";
import { getDb } from "./db.js";

// --- Repositories ---
const translationRepo = makeTranslationRepository(getDb);

// --- Services ---
const translationService = makeTranslationService(translationRepo);

// --- Controllers ---
const translationController = makeTranslationController(translationService);

export const container = {
    translationController
} as const;