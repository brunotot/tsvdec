// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type DecoratorGroup } from "./../decorators";

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
 * @see {@link DecoratorGroup}
 */
export interface DecoratorGroupOverride {}
