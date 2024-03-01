/**
 * Represents the result of a validation, including the key, message, and whether it's valid.
 */
export type DecoratorValidationResult = {
  key: string;
  message: string;
  valid: boolean;
};
