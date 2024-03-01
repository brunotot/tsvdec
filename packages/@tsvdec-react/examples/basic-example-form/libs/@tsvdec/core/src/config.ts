/**
 * @packageDocumentation Configuration options for the library that can be globally interacted with by developers.
 */

import * as Decorators from "./decorators";
import * as LocalizationResolver from "./localization/resolver";

export namespace Configuration {
  let _decoratorArgsResolver: Decorators.DecoratorArgsResolver = () => ({});
  let _globalLocale: LocalizationResolver.Locale = "en";
  let _messageParser: LocalizationResolver.MessageParser = (_, message) => String(message);

  export function decoratorArgsResolver(
    value?: Decorators.DecoratorArgsResolver,
  ): Decorators.DecoratorArgsResolver {
    if (value) _decoratorArgsResolver = value;
    return _decoratorArgsResolver;
  }

  export function globalLocale(locale?: LocalizationResolver.Locale): LocalizationResolver.Locale {
    if (locale) _globalLocale = locale;
    return _globalLocale;
  }

  export function messageParser(
    messageParser?: LocalizationResolver.MessageParser,
  ): LocalizationResolver.MessageParser {
    if (messageParser) _messageParser = messageParser;
    return _messageParser;
  }
}
