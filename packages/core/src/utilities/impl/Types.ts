import * as Overrides from "../../overrides";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Types {
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

  export type PrimitiveType = Overrides.PrimitiveType;

  export type PrimitiveUnion = UnpackArray<PrimitiveType>;

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
}
