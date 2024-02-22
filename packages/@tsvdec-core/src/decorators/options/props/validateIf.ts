import { DecoratorOptions } from "../DecoratorOptions";

export type DecoratorValidateIf<Class> = (context: Class) => boolean;

/** @hidden */
export function buildValidateIfProp(
  options: DecoratorOptions | undefined,
): (context: any) => boolean {
  return options?.validateIf ?? (() => true);
}
