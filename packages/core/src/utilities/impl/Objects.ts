import type * as Booleans from "./Booleans";
import { type Types } from "./Types";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Objects {
  /**
   * A type that represents an optional value.
   *
   * @typeParam T - The type of the optional value.
   */
  export type Optional<T = undefined> = T extends Types.FunctionType
    ? never
    : T extends undefined
      ? any
      : T | undefined | null;

  /**
   * A predicate function for filtering arrays.
   *
   * @typeParam T - The type of the array elements.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  export type ArrayPredicate<T> = ((value: T, index: number, array: T[]) => boolean) & {};

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
   * A type that excludes properties with values of type `TExclude` from `TParent`.
   *
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
   *
   * @typeParam T - The type to purify.
   */
  export type Purify<T> = Exclude<T, never>;

  /**
   * A type that extracts the values from the properties of an object type `T`.
   *
   * @typeParam T - An object type.
   */
  export type Values<T> = T[keyof T];

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
   * Removes duplicate elements from an array while preserving order.
   *
   * @typeParam T - The type of the elements in the array.
   */
  export function unique<T>(data: T[]): T[] {
    return [...new Set(data)];
  }

  /**
   * Calculates the difference between two objects.
   * @param obj1 - The first object to compare.
   * @param obj2 - The second object to compare.
   * @returns An object containing the differences between obj1 and obj2.
   */
  export function diff(obj1: any, obj2: any): any {
    const changedValues: any = {};
    const allKeys = Object.keys({ ...obj1, ...obj2 });
    for (const key of allKeys) {
      if (obj1[key] === obj2[key]) continue;
      if (
        typeof obj1[key] === "object" &&
        typeof obj2[key] === "object" &&
        obj1[key] != null &&
        obj2[key] != null
      ) {
        const deeperChanges = diff(obj1[key], obj2[key]);
        if (Object.keys(deeperChanges).length > 0) {
          changedValues[key] = deeperChanges;
        }
      } else if (!(key in obj1 && key in obj2 && deepEquals(obj1[key], obj2[key]))) {
        changedValues[key] = obj2[key];
      }
    }

    return changedValues;
  }

  /**
   * Recursively checks if two values are deep equal.
   */
  export function deepEquals(val1: any, val2: any): boolean {
    if (val1 === val2) {
      return true;
    } else if (typeof val1 !== typeof val2) {
      return false;
    } else if (Array.isArray(val1) && Array.isArray(val2)) {
      if (val1.length !== val2.length) {
        return false;
      }
      for (let i = 0; i < val1.length; i++) {
        if (!deepEquals(val1[i], val2[i])) {
          return false;
        }
      }
      return true;
    } else if (typeof val1 === "object" && val1 !== null && val2 !== null) {
      const keys1 = Object.keys(val1);
      const keys2 = Object.keys(val2);
      if (keys1.length !== keys2.length) {
        return false;
      }
      for (const key of keys1) {
        if (!deepEquals(val1[key], val2[key])) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  /**
   * Hashes a value of any type and returns a number.
   */
  export function hash(val: any): number {
    function stringHash(str: string): number {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash = hash & hash;
      }
      return hash;
    }

    function numberHash(num: number): number {
      return num
        .toString()
        .split("")
        .reduce((hash, ch) => {
          hash = (hash << 5) - hash + ch.charCodeAt(0);
          return hash & hash;
        }, 0);
    }

    function booleanHash(bool: boolean): number {
      return bool ? 1 : 0;
    }

    function nullHash(): number {
      return 0;
    }

    function undefinedHash(): number {
      return 0;
    }

    function arrayHash(arr: any[]): number {
      return arr.reduce((hash, val) => {
        hash = (hash << 5) - hash + hash(val);
        return hash & hash;
      }, 0);
    }

    function objectHash(obj: any): number {
      return Object.keys(obj)
        .sort()
        .reduce((hashValue, key) => {
          hashValue = (hashValue << 5) - hashValue + hash(obj[key]);
          return hashValue & hashValue;
        }, 0);
    }

    function defaultHash(val: any): number {
      return (val ?? "")
        .toString()
        .split("")
        .reduce((hash: number, ch: string) => {
          hash = (hash << 5) - hash + ch.charCodeAt(0);
          return hash & hash;
        }, 0);
    }

    if (typeof val === "string") {
      return stringHash(val);
    } else if (typeof val === "number") {
      return numberHash(val);
    } else if (typeof val === "boolean") {
      return booleanHash(val);
    } else if (val === null) {
      return nullHash();
    } else if (val === undefined) {
      return undefinedHash();
    } else if (Array.isArray(val)) {
      return arrayHash(val);
    } else if (typeof val === "object") {
      return objectHash(val);
    } else {
      return defaultHash(val);
    }
  }

  /**
   * Debounces a function.
   * @param fn - The function to debounce.
   * @param delay - The delay time in milliseconds.
   * @returns A debounced function.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  export function debounce(fn: Function, delay: number): Function {
    let timeoutID: any = null;
    return (...args: any[]) => {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
      timeoutID = setTimeout(() => fn(...args), delay);
    };
  }
}
