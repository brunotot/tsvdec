/**
 * @packageDocumentation Configuration options for the library that can be globally interacted with by developers.
 */

import * as Decorators from "./decorators";
import * as LocalizationResolver from "./localization/resolver";
import * as Overrides from "./overrides";
import { Types } from "./utilities";
import * as TypeChecker from "./utilities/misc/TypeChecker";

export import Override = Types.Override;

/**
 * Exposes getter/setter methods for the global locale value.
 */
export namespace GlobalLocaleApi {
  export import Locale = LocalizationResolver.Locale;
  export import getGlobalLocale = LocalizationResolver.getGlobalLocale;
  export import setGlobalLocale = LocalizationResolver.setGlobalLocale;
}

/**
 * Exposes getter/setter methods for the message parser mechanism.
 */
export namespace DecoratorMessageApi {
  export import MessageParser = LocalizationResolver.MessageParser;
  export import DecoratorMessage = Decorators.DecoratorMessage;
  export import getMessageParser = LocalizationResolver.getMessageParser;
  export import setMessageParser = LocalizationResolver.setMessageParser;
  export import DecoratorMessageOverride = Overrides.DecoratorMessageOverride;
}

export namespace DecoratorArgsResolverApi {
  export import DecoratorArgs = Decorators.DecoratorArgs;
  export import DecoratorArgsResolver = Decorators.DecoratorArgsResolver;
  export import getGlobalArgsResolver = Decorators.getGlobalArgsResolver;
  export import setGlobalArgsResolver = Decorators.setGlobalArgsResolver;
  export import DecoratorArgsOverride = Overrides.DecoratorArgsOverride;
  export import getGlobalArgs = Decorators.getGlobalArgs;
}

export namespace PrimitiveUnionApi {
  export import PrimitiveUnion = Types.PrimitiveUnion;
  export import PrimitiveUnionOverride = Overrides.PrimitiveUnionOverride;
}

export namespace DecoratorGroupsApi {
  export import DecoratorGroup = Decorators.DecoratorGroup;
  export import DecoratorGroupOverride = Overrides.DecoratorGroupOverride;
}

/**
 * Exposes getter/setter methods for type predicate mechanism.
 * @hidden
 */
export namespace TypePredicateApi {
  export import TypePredicate = TypeChecker.TypePredicate;
  export import getTypePredicates = TypeChecker.getTypePredicates;
  export import setTypePredicate = TypeChecker.setTypePredicate;
}
