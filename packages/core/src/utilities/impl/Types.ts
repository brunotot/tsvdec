import * as Overrides from "../../overrides";
import * as Booleans from "./Booleans";

/**
 * A type that represents an optional value.
 * @typeParam T - The type of the optional value.
 */
export type Optional<T = undefined> = T extends FunctionType
  ? never
  : T extends undefined
    ? any
    : T | undefined | null;

/**
 * Filters out getters, functions and read-only properties from a type
 */
// prettier-ignore
export type Payload<T> = Purify<{
    [K in keyof T]: true extends Booleans.isAnyOf<true, [
      Booleans.isGetter<T, K>,
      Booleans.isFunction<T[K]>,
    ]>
      ? never
      : true extends Booleans.isArray<T[K]>
        ? T[K]
        : true extends Booleans.isPrimitive<T[K]>
          ? T[K]
          : Payload<T[K]>
  }>;

/**
 * A conditional type that checks if types `X` and `Y` are equal. It returns type `A` if they are equal, and type `B` if they are not.
 *
 * @typeParam X - The first type.
 * @typeParam Y - The second type.
 * @typeParam A - The type to return if `X` and `Y` are equal.
 * @typeParam B - The type to return if `X` and `Y` are not equal.
 */
export type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

/**
 * A type that extracts input properties from an object type `T`.
 * @typeParam T - The object type.
 */
export type Inputs<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>;
}[keyof T];

/**
 * A predicate function for filtering arrays.
 * @typeParam T - The type of the array elements.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type ArrayPredicate<T> = ((value: T, index: number, array: T[]) => boolean) & {};

/**
 * A type that extracts the values from the properties of an object type `T`.
 * @typeParam T - An object type.
 */
export type Values<T> = T[keyof T];

/**
 * A type that excludes properties with values of type `TExclude` from `TParent`.
 * @typeParam TParent - The parent type.
 * @typeParam TExclude - The type to exclude from `TParent`.
 */
export type Exclude<TParent, TExclude> = Pick<
  TParent,
  Values<{
    [Prop in keyof TParent]: [TParent[Prop]] extends [TExclude] ? never : Prop;
  }>
>;

/**
 * A type that removes properties with values of type `never` from `T`.
 * @typeParam T - The type to purify.
 */
export type Purify<T> = Exclude<T, never>;

/**
 * Represents a type override.
 * @typeParam Placeholder - The placeholder type.
 * @typeParam Constraint - The constraint type.
 * @typeParam Error - The error message type.
 * @typeParam Default - The default type.
 */
export type Override<
  Placeholder,
  Constraint = any,
  Error extends string = "",
  Default = Constraint,
> = Placeholder extends {
  type: infer T;
}
  ? T extends Constraint
    ? T
    : `${Error}`
  : Default;

export import PrimitiveUnion = Overrides.PrimitiveUnionType;

export type Object = Record<string | number | symbol, any>;

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * Represents the JavaScript `Function` type.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type FunctionType = ((...args: any[]) => any) & {};

/**
 * Represents the generic array type.
 */
export type ArrayType = any[];

export type UnpackArray<T> = T extends (infer U)[] ? U : never;

/**
 * Represents a class constructor that can create instances of type `T`.
 *
 * @typeParam T - The type to be instantiated by the class constructor.
 *
 * @example
 * ```typescript
 * class MyClass {
 *   constructor(arg1: string, arg2: number) {
 *     // ...
 *   }
 * }
 *
 * const myClassConstructor: Class<MyClass> = MyClass;
 * const instance = new myClassConstructor('hello', 42);
 * // Creates an instance of MyClass
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type Class<T = {}> = (new (...args: any[]) => T) & {};

/**
 * Unwraps a Promise type to its resolved value type.
 * @typeParam T - The type to unwrap.
 */
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

/**
 * Unwraps a Class type to its instance type.
 * @typeParam T - The type to unwrap.
 */
export type UnwrapClass<T> = T extends Class<infer U> ? U : never;

/**
 * Prettifies a type by retaining the same shape.
 * @typeParam T - The type to prettify.
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};
