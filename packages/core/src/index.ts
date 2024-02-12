/**
 * @packageDocumentation tsvdec - Core module
 */

import * as LocalizationResolver from "./localization/resolver";
import * as TypeChecker from "./utilities/misc/TypeChecker";

export * from "./decorators";
export * from "./localization";
export * from "./overrides";
export * from "./reflection";
export * from "./strategy";
export * from "./utilities";
export * from "./validation";

export namespace Configuration {
  export import Locale = LocalizationResolver.Locale;
  export import MessageParser = LocalizationResolver.MessageParser;
  export import TypePredicate = TypeChecker.TypePredicate;
  export import getGlobalLocale = LocalizationResolver.getGlobalLocale;
  export import setGlobalLocale = LocalizationResolver.setGlobalLocale;
  export import getMessageParser = LocalizationResolver.getMessageParser;
  export import setMessageParser = LocalizationResolver.setMessageParser;
  export import getTypePredicates = TypeChecker.getTypePredicates;
  export import setTypePredicate = TypeChecker.setTypePredicate;
}

export * as Decorators from "./decorators";
export * as Localization from "./localization";
export * as Overrides from "./overrides";
export * as Reflection from "./reflection";
export * as Strategy from "./strategy";
export * as Utilities from "./utilities";
export * as Validation from "./validation";
