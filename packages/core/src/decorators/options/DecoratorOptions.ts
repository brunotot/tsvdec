/** Generic validator decorator configurable options. */

import { DecoratorGroup } from "./props/groups";
import { DecoratorKey } from "./props/key";
import { DecoratorMessage } from "./props/message";
import { DecoratorValidateIf } from "./props/validateIf";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type DecoratorOptions<This = any, _Value = any> = {
  /** Identifier of the validator decorator. */
  key?: DecoratorKey;
  /** Error message to be evaluated through a preprocessor, which can have a custom or default implementation based on library setup. */
  message?: DecoratorMessage;
  /** Unique list of groups for conditional validation. Validator triggers only if the form is applied on a listed group. */
  groups?: DecoratorGroup[];
  /** asdf */
  validateIf?: DecoratorValidateIf<This>;
};
