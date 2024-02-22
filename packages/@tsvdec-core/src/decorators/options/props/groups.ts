import { DecoratorOptions } from "..";
import { Objects, Types } from "../../..";
import { DecoratorGroupOverride } from "../../../overrides";

/**
 * Represents the type of a decorator `group` prop (defaulted to `string`).
 * @remarks
 * In your application, you'll likely encounter numerous instances where your form class model
 * is utilized for both creation and update actions. By employing the `DecoratorGroupOverride`,
 * you can clearly define the group type for all existing and subsequent decorators as either `"CREATE"`
 * or `"UPDATE"`. This approach ensures accuracy and prevents any potential errors.
 * @see {@link DecoratorGroupOverride}
 */
export type DecoratorGroup = Types.Override<
  DecoratorGroupOverride,
  string,
  "Invalid type for DecoratorGroupOverride! If you encounter this error, ensure that the DecoratorGroupOverride type is a string."
>;
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
