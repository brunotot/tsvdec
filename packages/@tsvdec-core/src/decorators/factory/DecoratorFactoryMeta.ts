import { DecoratorOptions } from "../options/DecoratorOptions";
import { DecoratorGroup, buildGroupsProp } from "../options/props/groups";
import { DecoratorValidateIf, buildValidateIfProp } from "../options/props/validateIf";

export type DecoratorMeta<Class> = {
  groups?: DecoratorGroup[];
  validateIf?: DecoratorValidateIf<Class>;
};

/** @hidden */
export const DEFAULT_DECORATOR_META: DecoratorMeta<any> = {
  groups: [],
  validateIf: () => true,
};

/** @hidden */
export function buildDecoratorMeta(options: DecoratorOptions | undefined): DecoratorMeta<any> {
  return {
    groups: buildGroupsProp(options),
    validateIf: buildValidateIfProp(options),
  };
}
