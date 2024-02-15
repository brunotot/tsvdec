/**
 * @packageDocumentation Configuration options for the library that can be globally interacted with by developers.
 */

import * as LocalizationResolver from "./localization/resolver";
import * as TypeChecker from "./utilities/misc/TypeChecker";

/**
 * Exposes getter/setter methods for the global locale value.
 */
export namespace LocaleApi {
  export import Locale = LocalizationResolver.Locale;
  export import getGlobalLocale = LocalizationResolver.getGlobalLocale;
  export import setGlobalLocale = LocalizationResolver.setGlobalLocale;
}

/**
 * Exposes getter/setter methods for the message parser mechanism.
 */
export namespace MessageParserApi {
  export import MessageParser = LocalizationResolver.MessageParser;
  export import getMessageParser = LocalizationResolver.getMessageParser;
  export import setMessageParser = LocalizationResolver.setMessageParser;
}

/**
 * Exposes getter/setter methods for type predicate mechanism.
 */
export namespace TypePredicateApi {
  export import TypePredicate = TypeChecker.TypePredicate;
  export import getTypePredicates = TypeChecker.getTypePredicates;
  export import setTypePredicate = TypeChecker.setTypePredicate;
}
