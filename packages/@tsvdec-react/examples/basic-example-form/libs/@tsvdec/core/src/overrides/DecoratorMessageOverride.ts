// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type DecoratorMessage } from "./../decorators";

/**
 * An overridable interface designed for specifying custom decorator message prop.
 *
 * [@Override]
 *
 * @example
 * 1: Basic usage
 * ```ts
 * // Suppose you have a JSON holding all messages of specific locale:
 * const Messages = {
 *   key1: "Localized message 1",
 *   key2: "Localized message 2",
 *   key3: "Localized message 3",
 * }
 *
 * // You can override the default message prop type by augmenting
 * // the `DecoratorMessageOverride` interface from `@tsvdec/core`
 * declare module "@tsvdec/core" {
 *   interface DecoratorMessageOverride {
 *     // Override the default message prop type with keyof typeof Messages
 *     type: keyof typeof Messages;
 *   }
 * }
 *
 * // 1. Message prop of decorators now accept
 * // only keys of Messages instead of generic string
 * class Consumer {
 *   // "message" prop is now of type: keyof typeof Messages
 *   // and will throw a type error if the key is not found in Messages
 *   \@Required({ message: "key1" })
 *   field!: string;
 * }
 *
 * // 2. Localization.configureParser() now requires
 * // the message prop to be of type MessagesKey
 * Localization.configureParser((locale, message) => {
 *   // message: keyof typeof Messages
 * }
 * ```
 * @see {@link DecoratorMessage}
 */
export interface DecoratorMessageOverride {}
