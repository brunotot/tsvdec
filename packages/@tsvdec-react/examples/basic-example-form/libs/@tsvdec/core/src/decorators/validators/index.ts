import * as _DecoratorOptions from "./../options/DecoratorOptions";
import * as _DecoratorProps from "./../options/props";
import * as AnyDecorators from "./any";
import * as ArrayDecorators from "./array";
import * as BooleanDecorators from "./boolean";
import * as DateDecorators from "./date";
import * as NumberDecorators from "./number";
import * as StringDecorators from "./string";
import * as _DecoratorArgs from "./utilities/DecoratorArgs";
import * as _DecoratorValidationHandler from "./utilities/DecoratorValidationHandler";
import * as _DecoratorValidationKeys from "./utilities/DecoratorValidationKeys";
import * as _DecoratorValidationResult from "./utilities/DecoratorValidationResult";

export * from "./any";
export * from "./array";
export * from "./boolean";
export * from "./date";
export * from "./number";
export * from "./string";
export * from "./utilities";

export namespace DecoratorValidators {
  export import Anys = AnyDecorators;
  export import Arrays = ArrayDecorators;
  export import Booleans = BooleanDecorators;
  export import Dates = DateDecorators;
  export import Numbers = NumberDecorators;
  export import Strings = StringDecorators;
  export import DecoratorValidationKeys = _DecoratorValidationKeys.DecoratorValidationKeys;
}

export namespace DecoratorTypes {
  export import DecoratorArgs = _DecoratorArgs.DecoratorArgs;
  export import DecoratorArgsResolver = _DecoratorArgs.DecoratorArgsResolver;
  export import DecoratorGroup = _DecoratorProps.DecoratorGroup;
  export import DecoratorMessage = _DecoratorProps.DecoratorMessage;
  export import DecoratorValidateIf = _DecoratorProps.DecoratorValidateIf;
  export import DecoratorOptions = _DecoratorOptions.DecoratorOptions;
  export import DecoratorValidationHandler = _DecoratorValidationHandler.DecoratorValidationHandler;
  export import DecoratorValidationResult = _DecoratorValidationResult.DecoratorValidationResult;
}
