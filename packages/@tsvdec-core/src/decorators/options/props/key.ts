import { DecoratorOptions } from "../DecoratorOptions";

/**
 * Returns the key based on the provided options or the default key.
 * @param options - The options object.
 * @param defaultKey - The default key.
 * @returns The key.
 * @hidden
 */
export function buildKeyProp(options: DecoratorOptions | undefined, defaultKey: string): string {
  return options?.key ?? defaultKey;
}
