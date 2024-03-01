import { DecoratorArgsOverride } from "../../../overrides";
import { Types } from "../../../utilities";

/**
 * Represents the type of a decorator `args` prop (defaulted to `Record<string, any>`).
 * @see {@link DecoratorArgsOverride}
 */
export type DecoratorArgs = Types.Override<
  DecoratorArgsOverride,
  Record<string, any>,
  "Invalid type for DecoratorArgsOverride! If you encounter this error, ensure that the DecoratorArgsOverride type is a Record<string,any>."
> &
  Record<string, any>;

export type DecoratorArgsResolver = () => DecoratorArgs;
