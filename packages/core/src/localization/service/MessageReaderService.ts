import { getGlobalLocale, type Locale } from "../../localization/resolver/LocaleResolver";
import { TranslationKey, Translations } from "../translations";

/**
 * All translation json files content in map, grouped by {@link Locale `Locale`}.
 */
const MessageCollection = {
  hr: Translations.Croatian,
  de: Translations.German,
  en: Translations.English,
  es: Translations.Spanish,
  fr: Translations.French,
  it: Translations.Italian,
  nl: Translations.Dutch,
} as const;

/**
 * Returns localized message by key, allowing `locale` to be optional (defaults to global `locale`).
 * @param messageKey A key of any predefined decorator validator (or extras) from `@tsvdec/core`
 * @param locale Locale to translate by (`en`, `hr`, `de`, ...)
 * @returns Default translated message by message key
 * @see {@link TranslationKey}
 * @hidden
 */
export function readMessage(messageKey: TranslationKey, locale?: Locale | null): string {
  const computedLocale = locale ?? getGlobalLocale();
  const computedLocaleMessages = MessageCollection[computedLocale];
  const decoratorMessage = computedLocaleMessages[messageKey];
  return decoratorMessage;
}
