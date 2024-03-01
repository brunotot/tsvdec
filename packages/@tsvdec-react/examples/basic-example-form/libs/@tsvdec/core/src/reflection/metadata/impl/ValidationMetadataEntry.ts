import {
  DecoratorMeta,
  DecoratorValidationHandler,
  DecoratorValidationResult,
} from "../../../decorators";
import { EventHandlerData } from "../../../events";
import { EventEmitter } from "../../../events/models/EventEmitter";
import { Locale } from "../../../localization";
import { Types } from "../../../utilities";
import { MetadataEntry } from "../MetadataEntry";

/**
 * Represents metadata for a validation rule, including the associated validation groups and the evaluator function.
 * @typeParam Class - The type of the value being evaluated.
 * @typeParam Value - The type of the value being evaluated.
 */
export type ValidationMetadataEntryItem<Value> = {
  validate: DecoratorValidationHandler<Value>;
  meta: DecoratorMeta<any>;
};

/**
 * Manages a collection of validation rules for a specific field.
 * @typeParam Value - The type of the field.
 * @remarks
 * This class is responsible for storing and applying validation rules to a specific field.
 * It allows you to validate the field against a payload and a set of validation groups.
 */
export class ValidationMetadataEntry<Value = any> extends MetadataEntry<
  ValidationMetadataEntryItem<Value>
> {
  constructor(contents: ValidationMetadataEntryItem<Value>[] = []) {
    super(contents);
  }

  /**
   * Validates a field against a payload and a set of validation groups.
   *
   * @typeParam TBody - The type of the payload.
   *
   * @param value - The value of the field to validate.
   * @param payload - The payload to validate against.
   * @param groups - The validation groups to consider.
   *
   * @returns An array of `ValidationResult` containing the validation results.
   */
  validate<TBody>(
    value: Value,
    payload: Types.Payload<TBody>,
    groups: string[],
    locale: Locale,
    args?: Record<string, any>,
    emitter?: EventEmitter,
    field?: string,
  ): DecoratorValidationResult[] {
    function isPromise(value: any): value is Promise<any> {
      return Boolean(value && typeof value.then === "function");
    }

    const groupedValidators = this.#groupedValidators(this.contents, groups);
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    const results = groupedValidators
      .filter(({ meta }) => !meta.validateIf || meta.validateIf(payload))
      .map(({ validate }) => validate(value, { context: payload, locale, args: args ?? {} }));
    // eslint-disable-next-line @typescript-eslint/array-type
    const asyncResults = results.filter(v => isPromise(v)) as Promise<DecoratorValidationResult>[];
    this.#handleAsyncResults(asyncResults, emitter, field);
    const syncResults = results.filter(v => !isPromise(v)) as DecoratorValidationResult[];
    return syncResults.filter(({ valid }) => !valid);
  }

  #handleAsyncResults(
    asyncResults: Array<Promise<DecoratorValidationResult>>,
    emitter?: EventEmitter,
    field?: string,
  ): void {
    if (!emitter) return;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.all(asyncResults).then(results => {
      results.forEach(value => {
        emitter.emit(EventHandlerData.ASYNC_VALIDATION_COMPLETE, {
          key: field,
          value,
        });
      });
    });
  }

  /**
   * Filters validators based on the provided validation groups.
   * @typeParam TFieldType - The type of the field being validated.
   * @param data - The array of metadata for each validator.
   * @param groups - The validation groups to filter by.
   * @returns An array of filtered validators.
   */
  #groupedValidators(
    data: Array<ValidationMetadataEntryItem<Value>>,
    groups: string[],
  ): Array<ValidationMetadataEntryItem<Value>> {
    return data.filter((entry: ValidationMetadataEntryItem<Value>) => {
      return groups.length > 0
        ? entry.meta.groups?.some((o: any) => groups.includes(o))
        : entry.meta.groups?.length === 0;
    });
  }
}
