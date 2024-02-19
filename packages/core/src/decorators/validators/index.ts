export * from "./any";
export * from "./array";
export * from "./boolean";
export * from "./date";
export * from "./number";
export * from "./string";
export * from "./utilities";

import * as AnyDecorators from "./any";
import * as ArrayDecorators from "./array";
import * as BooleanDecorators from "./boolean";
import * as DateDecorators from "./date";
import * as NumberDecorators from "./number";
import * as StringDecorators from "./string";

export namespace Validators {
  export import Anys = AnyDecorators;
  export import Arrays = ArrayDecorators;
  export import Booleans = BooleanDecorators;
  export import Dates = DateDecorators;
  export import Numbers = NumberDecorators;
  export import Strings = StringDecorators;
}
