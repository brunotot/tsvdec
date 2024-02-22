import { type Types } from "../../utilities";
import {
  createClassDecorator,
  type ClassDecorator,
} from "../factory/forClass/createClassDecorator";
import { type DecoratorValidateIf } from "../options/props/validateIf";

/**
 * Creates a decorator which applies a validation condition to the class.
 * [@Enhancer]
 * @param validateIf - A function that returns a boolean indicating whether the class should be validated.
 * @returns A decorator function to use with class properties.
 */
export function validateClassIf<Class extends Types.Class>(
  validateIf: DecoratorValidateIf<Types.UnwrapClass<Class>>,
): ClassDecorator<Class> {
  return createClassDecorator<Class>(meta => {
    meta.validateIf = validateIf;
  });
}
