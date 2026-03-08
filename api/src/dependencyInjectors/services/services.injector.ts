import { ITranslationService } from "../../services/translation/translation.interface.js";
import { makeTranslationService } from "../../services/translation/translation.service.js";
import { IRepositoryInjector } from "../repositories/repositories.interface.js";
import { IServicesInjector } from "./services.interface.js";

export const makeServicesInjector = (
    repositoryInjector: IRepositoryInjector
): IServicesInjector => {
    const translationService: ITranslationService = makeTranslationService(
        repositoryInjector.translationRepo
    );
    
    return {
        translationService
    };
};