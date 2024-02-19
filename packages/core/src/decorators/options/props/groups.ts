import { DecoratorOptions } from "..";
import { Objects } from "../../..";
import * as Overrides from "../../../overrides";

export import DecoratorGroup = Overrides.DecoratorGroupType;

/**
 * Retrieves the unique groups from the provided options or returns the default groups.
 * @param options - The options object.
 * @param defaultGroups - The default groups.
 * @returns An array of unique groups.
 * @hidden
 */
export function buildGroupsProp(
  options?: DecoratorOptions,
  defaultGroups: DecoratorGroup[] = [],
): DecoratorGroup[] {
  return Array.isArray(options?.groups)
    ? Objects.unique(options.groups)
    : Objects.unique(defaultGroups);
}
