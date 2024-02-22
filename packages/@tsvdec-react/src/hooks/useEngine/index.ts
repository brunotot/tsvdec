import { Form, FormProps, Types } from "@tsvdec/core";
import { useMemo } from "react";

/**
 * React hook which creates a memoized {@link Form} instance for a given class and configuration.
 * @typeParam TClass - The type of the model class.
 * @param {Types.Class<TClass>} Class - The model class to create the engine for.
 * @param {FormProps<TClass>} config - Optional configuration for the engine.
 * @returns {Form<TClass>} - The created engine instance.
 */
export function useEngine<TClass>(
  Class: Types.Class<TClass>,
  config?: FormProps<TClass>,
): Form<TClass> {
  return useMemo(() => {
    return new Form<TClass>(Class, config);
  }, [JSON.stringify(config)]);
}
