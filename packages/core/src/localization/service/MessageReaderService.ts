// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Decorators from "../../decorators";
import { getGlobalLocale, type Locale } from "../../localization/resolver/LocaleResolver";

import de from "../translations/de.json";
import en from "../translations/en.json";
import es from "../translations/es.json";
import fr from "../translations/fr.json";
import hr from "../translations/hr.json";
import it from "../translations/it.json";
import nl from "../translations/nl.json";

/** All translation json files content in map, grouped by {@link Locale `Locale`}. */
export const MessageCollection = { hr, de, en, es, fr, it, nl } as const;

/**
 * Represents the union of all predefined validator decorator keys (and extras) which `@tsvdec/core` provides.
 * For example, {@link Decorators.Alpha @Alpha\(\)} decorator has a key defined as {@link Decorators.DecoratorKeys.ALPHA ALPHA}.
 */
export type MessageKey = keyof typeof MessageCollection.en;

/**
 * Returns localized message by key, allowing `locale` to be optional (defaults to global `locale`).
 * @param messageKey A key of any predefined decorator validator (or extras) from `@tsvdec/core`
 * @param locale Locale to translate by (`en`, `hr`, `de`, ...)
 * @returns Default translated message by message key
 * @see {@link MessageKey}
 */
export function readMessage(messageKey: MessageKey, locale?: Locale | null): string {
  const computedLocale = locale ?? getGlobalLocale();
  const computedLocaleMessages = MessageCollection[computedLocale];
  const decoratorMessage = computedLocaleMessages[messageKey];
  return decoratorMessage;
}
