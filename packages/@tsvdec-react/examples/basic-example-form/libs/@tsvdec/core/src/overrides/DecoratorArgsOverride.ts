// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type DecoratorArgs } from "./../decorators";

/**
 * An overridable interface designed for specifying custom decorator args prop.
 *
 * [@Override]
 *
 * @example
 * Suppose your decorator fetches data from server (e.g. async validation)
 * and you need to pass API auth token to the decorator.
 * ```ts
 * class UserForm {
 *   \@UniqueUsername() // internally uses API auth token
 *   username: string;
 * }
 * ```
 * Function `createFieldValidator` exposes a callback with resolved decorator args as the last argument.
 * ```ts
 * import { createFieldValidator, DecoratorArgs } from "@tsvdec/core";
 *
 * function UniqueUsername<This, Value extends string>() {
 *   return createFieldValidator<This, Value>((value, context, locale, args: DecoratorArgs) => ({
 *     key: "UniqueUsername",
 *     valid: await isUsernameUnique(value, args.token),
 *     message: "Username already exists"
 *   }));
 * }
 * ```
 * You can override the default args type by augmenting
 * the `DecoratorArgsOverride` interface from `@tsvdec/core`
 * ```ts
 * declare module "@tsvdec/core" {
 *   interface DecoratorArgsOverride {
 *     type: {
 *       token: string;
 *     };
 *   }
 * }
 * ```
 * For token to be available in the decorator, you need to invoke `Configration.decoratorArgsResolver` function
 * by passing it your custom args resolver function.
 * ```ts
 * import { Configration } from "@tsvdec/core";
 *
 * const token = `Bearer ${localStorage.getItem("token")}`;
 * Configration.decoratorArgsResolver(() => ({ token }));
 * ```
 * Optionally, you can also pass other arguments with `resolveDecoratorArgs` prop with `Form` class.
 * ```ts
 * import { Form } from "@tsvdec/core";
 *
 * const someOtherProp = "Other prop";
 * const resolveDecoratorArgs = () => ({ someOtherProp });
 * const form = new Form(UserForm, { resolveDecoratorArgs });
 * ```
 * @see {@link DecoratorArgs}
 */
export interface DecoratorArgsOverride {}
