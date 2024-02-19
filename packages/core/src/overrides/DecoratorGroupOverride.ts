import { Types } from "../utilities";

/**
 * An overridable interface designed for specifying custom decorator group prop.
 *
 * [@Override]
 *
 * @example
 * You can override the default group type by augmenting
 * the `DecoratorGroupOverride` interface from `@tsvdec/core`
 * ```ts
 * declare module "@tsvdec/core" {
 *   interface DecoratorGroupOverride {
 *     type: "CREATE" | "UPDATE";
 *   }
 * }
 * ```
 * Group prop of decorators now accept only
 * "CREATE" or "UPDATE" instead of generic string
 * ```ts
 * class Consumer {
 *   \@Required({ groups: "CREATE" })
 *   field!: string;
 * }
 * ```
 * @see {@link DecoratorGroupType}
 */
export interface DecoratorGroupOverride {}

/**
 * Represents the type of a decorator `group` prop (defaulted to `string`).
 * @remarks
 * In your application, you'll likely encounter numerous instances where your form class model
 * is utilized for both creation and update actions. By employing the `DecoratorGroupOverride`,
 * you can clearly define the group type for all existing and subsequent decorators as either `"CREATE"`
 * or `"UPDATE"`. This approach ensures accuracy and prevents any potential errors.
 * @see {@link DecoratorGroupOverride}
 */
export type DecoratorGroupType = Types.Override<
  DecoratorGroupOverride,
  string,
  "Invalid type for DecoratorGroupOverride! If you encounter this error, ensure that the DecoratorGroupOverride type is a string."
>;
