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

const DEFAULT_MESSAGE_PARSER: MessageParser = (_, message) => String(message);

let messageParser: MessageParser = DEFAULT_MESSAGE_PARSER;

/** Returns the current global {@link MessageParser `MessageParser`} value. */
export function getMessageParser(): MessageParser {
  return messageParser;
}

/** Sets the global {@link MessageParser `MessageParser`} to the specified value (pass `undefined` to revert to default). */
export function setMessageParser(newMessageParser?: MessageParser): void {
  messageParser = newMessageParser ?? DEFAULT_MESSAGE_PARSER;
}
