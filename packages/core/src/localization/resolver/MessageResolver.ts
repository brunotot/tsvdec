import { type DecoratorMessage } from "../../decorators";
import { type Locale } from "../../localization/resolver/LocaleResolver";

/**
 * Message parser definition.
 * @param {Locale} locale - Current locale
 * @param {DecoratorMessage} message - Message to parse
 * @param {Record<string,string>} args - Arguments to parse message with
 */
export type MessageParser = ((
  locale: Locale,
  message: DecoratorMessage,
  args: Record<string, string>,
) => string) & {};
