import { Locale, getMessageParser } from "../../../localization";
import * as Overrides from "../../../overrides";
import { DecoratorOptions } from "../DecoratorOptions";

export import DecoratorMessage = Overrides.DecoratorMessageType;

function parseMessage(locale: Locale, message: string, args: Record<string, string> = {}): string {
  try {
    return getMessageParser()(locale, message, args);
  } catch (error) {
    const title = `An error occurred while resolving "${message}" for locale "${locale}".`;
    const descr =
      "To fix, check your Localization.configureParser() implementation or review stack-trace.";
    const stacktrace = `\n\n${String(error)}`;
    throw new Error(`${title} ${descr} ${stacktrace}`);
  }
}

/**
 * Retrieves the localized message based on the provided options, locale, and default message.
 * If the options contain a custom message, it will be resolved using the provided locale.
 * If no custom message is provided, the default message will be returned.
 *
 * @param options - The options object that may contain a custom message.
 * @param locale - The locale resolver used to resolve the custom message.
 * @param defaultMessage - The default message to be returned if no custom message is provided.
 * @returns The localized message.
 * @hidden
 */
export function buildMessageProp(
  options: DecoratorOptions | undefined,
  locale: Locale,
  defaultMessage: string = "",
  args: Record<string, string> = {},
): string {
  if (!options?.message) return defaultMessage ?? "";
  return parseMessage(locale, options.message, args);
}
