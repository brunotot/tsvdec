import { DecoratorArgs, type DecoratorMessage } from "../../decorators";
import { type Locale } from "../../localization/resolver/LocaleResolver";

/**
 * Message parser definition.
 * @param {Locale} locale - Current locale
 * @param {DecoratorMessage} message - Message to parse
 * @param {DecoratorArgs} args - Arguments to parse message with
 */
export type MessageParser = (
  locale: Locale,
  message: DecoratorMessage,
  args: DecoratorArgs,
) => string;
