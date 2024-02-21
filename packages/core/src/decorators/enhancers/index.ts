export * from "./attribute";
export * from "./foreach";
export * from "./validateClassIf";
export * from "./validateFieldIf";

import * as AttributeEnhancer from "./attribute";
import * as ForeachEnhancer from "./foreach";
import * as ValidateClassIfEnhancer from "./validateClassIf";
import * as ValidateFieldIfEnhancer from "./validateFieldIf";

export namespace DecoratorEnhancers {
  export import attribute = AttributeEnhancer.attribute;
  export import foreach = ForeachEnhancer.foreach;
  export import validateClassIf = ValidateClassIfEnhancer.validateClassIf;
  export import validateFieldIf = ValidateFieldIfEnhancer.validateFieldIf;
}
