import { makeTranslationController } from "../controllers/translation/translation.controller.js";
import { makeRepositoryInjector } from "../dependencyInjectors/repositories/index.js";
import { makeServicesInjector } from "../dependencyInjectors/services/services.injector.js";

const repositoryInjector = makeRepositoryInjector();
const servicesInjector = makeServicesInjector(repositoryInjector);

const translationController = makeTranslationController(servicesInjector);

export const container = {
    translationController
} as const;