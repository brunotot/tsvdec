import { Configuration } from "../../../config";
import { DecoratorArgs } from "../../../decorators";
import { Locale } from "../../../localization";
import * as Overrides from "../../../overrides";
import { Types } from "../../../utilities";
import { DecoratorOptions } from "../DecoratorOptions";

/**
 * Represents the type of the message prop used by decorators and localization service.
 * @see {@link Overrides.DecoratorMessageOverride}
 */
export type DecoratorMessage = Types.Override<
  Overrides.DecoratorMessageOverride,
  string,
  "Invalid type for DecoratorMessageOverride! If you encounter this error, ensure that the DecoratorMessageOverride type is a string."
>;

function parseMessage(locale: Locale, message: string, args: DecoratorArgs = {}): string {
  try {
    return Configuration.messageParser()(locale, message, args);
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
  args: DecoratorArgs = {},
): string {
  if (!options?.message) return defaultMessage ?? "";
  return parseMessage(locale, options.message, args);
}
