/**
 * Removes duplicate elements from an array while preserving order.
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
