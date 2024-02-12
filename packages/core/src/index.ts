/**
 * @packageDocumentation tsvdec - Core module
 */

import * as Resolvers from "./localization/resolver";
import * as TypeChecker from "./utilities/misc/TypeChecker";

export * from "./decorators";
export * from "./localization";
export * from "./overrides";
export * from "./reflection";
export * from "./strategy";
export * from "./utilities";
export * from "./validation";

export namespace Configuration {
  export import Locale = Resolvers.Locale;
  export import MessageParser = Resolvers.MessageParser;
  export import TypePredicate = TypeChecker.TypePredicate;
  export import getGlobalLocale = Resolvers.getGlobalLocale;
  export import setGlobalLocale = Resolvers.setGlobalLocale;
  export import getMessageParser = Resolvers.getMessageParser;
  export import setMessageParser = Resolvers.setMessageParser;
  export import getTypePredicates = TypeChecker.getTypePredicates;
  export import setTypePredicate = TypeChecker.setTypePredicate;
}

export * as Decorators from "./decorators";
export * as Overrides from "./overrides";
export * as Utilities from "./utilities";
