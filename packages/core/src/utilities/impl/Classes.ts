/**
 * @packageDocumentation Runtime utilities for working with **Class** evaluations.
 */

import { ReflectionInjectStrategy } from "../../reflection";
import * as Types from "../../utilities/impl/Types";

function getGetterKeys(instance: object): string[] {
  const proto = Object.getPrototypeOf(instance);
  return Object.getOwnPropertyNames(proto).filter(propertyName => {
    const descriptor = Object.getOwnPropertyDescriptor(proto, propertyName);
    return descriptor && typeof descriptor.get === "function";
  });
}

function getFieldKeys(instance: object): string[] {
  return Object.keys(instance);
}

/**
 * Retrieves the names of all fields in a class.
 * @param constructor - The class constructor.
 * @returns An array of field names.
 */
export function getFieldNames<TClass>(constructor: Types.Class<TClass>): string[] {
  const instance = new constructor() as object;
  return [...getFieldKeys(instance), ...getGetterKeys(instance)];
}

/**
 * Retrieves the property descriptor for a specific field in a class.
 * @param constructor - The class constructor.
 * @param name - The name of the field.
 * @returns The property descriptor for the field.
 */
export function getFieldDescriptor<TClass>(
  constructor: Types.Class<TClass>,
  name: keyof TClass,
): PropertyDescriptor | undefined {
  const instance = new constructor();
  const prototype = Object.getPrototypeOf(instance);
  return Object.getOwnPropertyDescriptor(prototype, name);
}

/**
 * Retrieves or initializes metadata for a given strategy.
 * @param classOrContext - The strategy to get metadata for.
 * @returns The metadata object.
 */
export function getMetadata(classOrContext: ReflectionInjectStrategy): DecoratorMetadataObject {
  if (isClass(classOrContext)) {
    (Symbol as any).metadata ??= Symbol("Symbol.metadata");
    classOrContext[Symbol.metadata] ??= {};
    return classOrContext[Symbol.metadata]!;
  }
  if (classOrContext && !classOrContext.metadata) {
    // @ts-expect-error This is a valid operation.
    classOrContext.metadata = {};
  }
  return classOrContext?.metadata ?? {};
}

/**
 * Checks if the value is a class.
 * @param value - The value to check.
 * @returns True if the value is a class, false otherwise.
 */
export function isClass(value: any): value is Types.Class<any> {
  return typeof value === "function";
}
