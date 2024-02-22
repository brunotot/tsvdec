import { Booleans, type Form, type Types } from "@tsvdec/core";

export type UseResetConfig<TClass> = {
  engine: Form<TClass>;
  form: Types.Payload<TClass>;
  setForm: (v: Types.Payload<TClass>) => void;
  submitted: boolean;
  handleSetSubmitted: (v: boolean) => void;
};

export type UseResetReturn<TClass> = ((
  ...fieldPaths: Array<PayloadFieldPath<Types.Payload<TClass>>>
) => void) & {};

/**
 * A wrapper type for evaluation object paths as strings
 */
export type ObjectPathEvaluator<T, K extends string> = K extends keyof T
  ? K extends Types.Inputs<T>
    ? K | `${K}.${PayloadFieldPath<T[K]>}`
    : ""
  : never;

/**
 * A helper type for evaluation paths as strings representing JavaScript object selectors
 */
export type PayloadFieldPathEvaluator<T> = {
  [K in keyof T]-?: K extends string
    ? Booleans.isFunction<T[K]> extends true
      ? never
      : Booleans.isArray<T[K]> extends true
        ? K
        : Booleans.isObject<T[K]> extends true
          ? ObjectPathEvaluator<T, K>
          : K extends Types.Inputs<T>
            ? K
            : never
    : never;
};

/**
 * A central method for getting a union of all possible payload field paths
 */
export type PayloadFieldPath<T> =
  Booleans.isFunction<T> extends true
    ? ""
    : Booleans.isObject<T> extends true
      ? PayloadFieldPathEvaluator<T>[keyof T]
      : "";
