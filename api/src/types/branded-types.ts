declare const brand: unique symbol;

export type Brand<T, TBrand> = T & { readonly [brand]: TBrand };

export function createBrander<T extends Brand<string, unknown>>() {
  function brander(value: string): T;
  function brander(value: string | null | undefined): T | null;
  function brander(value: string | null | undefined): T | null {
    return value == null ? null : value as T;
  }
  return brander;
}

export type TranslationId = Brand<string, 'TranslationId'>;
export type BookId = Brand<string, 'BookId'>;
export type ChapterId = Brand<string, 'ChapterId'>;
export type VerseId = Brand<string, 'VerseId'>;
export type VerseSegmentId = Brand<string, 'VerseSegmentId'>;

export const asTranslationId = createBrander<TranslationId>();
export const asBookId = createBrander<BookId>();
export const asChapterId = createBrander<ChapterId>();
export const asVerseId = createBrander<VerseId>();
export const asVerseSegmentId = createBrander<VerseSegmentId>();