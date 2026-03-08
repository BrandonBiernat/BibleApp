import { IBookRepository } from "../../repositories/books/book.interface.js";
import { IChapterRepository } from "../../repositories/chapters/chapter.interface.js";
import { ITranslationRepository } from "../../repositories/translations/translation.interface.js";
import { IVerseRepository } from "../../repositories/verses/verse.interface.js";

export interface IRepositoryInjector {
    translationRepo: ITranslationRepository;
    bookRepo: IBookRepository;
    chapterRepo: IChapterRepository;
    verseRepo: IVerseRepository;
}