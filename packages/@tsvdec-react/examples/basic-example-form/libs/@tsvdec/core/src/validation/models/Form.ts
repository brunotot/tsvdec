import { Configuration } from "../../config";
import type { DecoratorValidationResult } from "../../decorators";
import { type DecoratorArgs } from "../../decorators";
import { EventEmitter } from "../../events";
import { EventHandlers, getRegisteredEventHandlers } from "../../events/handlers/impl/register";
import { type Locale } from "../../localization";
import { ClassReflectionService, FieldReflectionService } from "../../reflection";
import { ValidationMetadataEntry } from "../../reflection/metadata";
import {
  type StrategyDetailedErrorsResponse,
  type StrategyErrors,
  type StrategySimpleErrorsResponse,
} from "../../strategy";
import { type Types } from "../../utilities";
import { Cache } from "../../utilities/misc/Cache";
import { FormErrors, FormProps, FormValidationResponse } from "../../validation/types";

/**
 * Checks if an error object has errors.
 * @typeParam T - The type of the errors.
 * @hidden
 */
export function hasErrors<T>(data: StrategySimpleErrorsResponse<T>): boolean {
  const data0: any = data;
  if (Array.isArray(data0)) {
    return data0.some(item => hasErrors(item));
  } else if (typeof data0 === "object" && data0 !== null) {
    return Object.values(data0).some((value: any) => hasErrors(value));
  } else if (typeof data0 === "string") {
    return true;
  }
  return false;
}

/**
 * Transforms a plain object into an instance of the given class.
 * @param clazz - The class to transform the object into.
 * @param object - The object to transform.
 * @typeParam TClass - The type of the class.
 * @returns An instance of TClass.
 * @hidden
 */
export function toClass<const TClass extends Types.Class<any>>(
  clazz: TClass,
  object?: Types.Payload<Types.UnwrapClass<TClass>>,
): Types.UnwrapClass<TClass> {
  function _toClass<const TConstructor extends Types.Class<any>>(
    clazz: TConstructor,
    object?: Types.Payload<Types.UnwrapClass<TConstructor>> | Types.ArrayType,
  ): Types.UnwrapClass<TConstructor> {
    if (Array.isArray(object)) {
      return object.map(item => _toClass(clazz, item)) as Types.UnwrapClass<TConstructor>;
    }

    const entries = Object.entries<any>(object ?? {});
    const meta = FieldReflectionService.inject(clazz, EventEmitter.EMPTY);
    const data: any = {};
    for (const [key, value] of entries) {
      const descriptor = meta.getUntypedDescriptor(key);
      const { thisClass } = descriptor;
      if (thisClass) {
        if (Array.isArray(value)) {
          data[key] = value.map(item => _toClass(thisClass, item));
        } else {
          data[key] = toClass(thisClass, value);
        }
      } else {
        data[key] = value;
      }
    }

    const instance = new clazz();
    Object.entries(data).forEach(([k, v]) => (instance[k] = v));
    return instance;
  }
  return _toClass(clazz, object);
}

/**
 * A class responsible for processing and validating class instances through its decorated validators.
 * @typeParam TClass - The type of the class being processed.
 * @typeParam TBody - The type of the payload body. Defaults to `TClass`.
 * @remarks This class uses `Cache` class to store validation results for better performance. It also leverages `FieldValidatorMetaService` to retrieve metadata about the class being processed.
 */
export class Form<TClass> {
  readonly #classValidatorMetaService: ClassReflectionService<Types.Class<TClass>>;
  readonly #fieldValidatorMetaService: FieldReflectionService;
  readonly #groups: string[];
  readonly #defaultValue: Types.Payload<TClass>;
  readonly #cache: Cache<FormValidationResponse<TClass>, Types.Payload<TClass>>;
  readonly #hostClass: Types.Class<TClass>;
  /** @hidden */
  readonly #eventHandlers: EventHandlers<TClass>;
  readonly #eventEmitter: EventEmitter;
  locale: Locale;

  // TODO!!! - DecoratorMeta!!!

  public get cache() {
    return this.#cache;
  }

  /**
   * Gets the default host value.
   */
  public get defaultValue(): any {
    return this.#defaultValue;
  }

  /**
   * Constructs a new `ValidationEngine` instance.
   * @param clazz - The class type to be processed.
   * @param config - Optional configuration settings.
   */
  constructor(clazz: Types.Class<TClass>, config?: FormProps<TClass>) {
    this.#eventHandlers = getRegisteredEventHandlers<TClass>(this, config?.asyncDelay ?? 500);
    this.#eventEmitter = this.#eventHandlers.asyncValidationComplete.emitter;
    this.#hostClass = clazz;
    this.locale = config?.locale ?? Configuration.globalLocale();
    this.#groups = Array.from(new Set(config?.groups ?? []));
    this.#defaultValue = config?.defaultValue ?? (toClass(clazz) as Types.Payload<TClass>);
    this.#fieldValidatorMetaService = FieldReflectionService.inject(clazz, this.#eventEmitter);
    this.#classValidatorMetaService = ClassReflectionService.inject(clazz, this.#eventEmitter);
    this.#cache = new Cache((state: Types.Payload<TClass>, args: DecoratorArgs) =>
      this.validate.bind(this)(state, args),
    );
  }

  get #globalDecoratorArgs() {
    return Configuration.decoratorArgsResolver()();
  }

  /**
   * Checks if the given payload is valid.
   * @param payload - The payload to validate.
   * @returns `true` if valid, `false` otherwise.
   */
  public isValid(payload: Types.Payload<TClass>, args: DecoratorArgs = {}): boolean {
    return this.#cache.get("valid", payload, args);
  }

  /**
   * Retrieves detailed error messages for the given payload.
   * @param payload - The payload to validate.
   * @returns An object containing detailed error messages.
   */
  public getDetailedErrors(
    payload?: Types.Payload<TClass>,
    args: DecoratorArgs = {},
  ): StrategyDetailedErrorsResponse<TClass> {
    return this.#cache.get("detailedErrors", payload, args);
  }

  /**
   * Retrieves error messages for the given payload.
   * @param payload - The payload to validate.
   * @returns An object containing error messages.
   */
  public getErrors(
    payload?: Types.Payload<TClass>,
    args: DecoratorArgs = {},
  ): StrategySimpleErrorsResponse<TClass> {
    return this.#cache.get("errors", payload, args);
  }

  /**
   * Retrieves the global errors for the form.
   * @param payload - The payload object.
   * @param args - The decorator arguments.
   * @returns An array of ValidationResult objects representing the global errors.
   */
  public getGlobalErrors(
    payload?: Types.Payload<TClass>,
    args: DecoratorArgs = {},
  ): DecoratorValidationResult[] {
    return this.#cache.get("globalErrors", payload, args);
  }

  /**
   * Validates the given payload and updates the cache.
   *
   * @param payload - The payload to validate. If not provided, a new instance of the class will be used.
   *
   * @returns An object containing the validation result, which includes:
   * - `valid`: A boolean indicating the overall validity of the payload.
   * - `detailedErrors`: An object containing detailed error messages for each field.
   * - `errors`: An object containing simplified error messages for each field.
   *
   * @remarks
   * This function performs the following steps:
   * 1. Initializes an empty `Errors` and `DetailedErrors` object.
   * 2. Iterates through each field defined in the metadata of the class.
   * 3. Calls `validateField` for each field to get the validation result.
   * 4. Updates the `Errors` and `DetailedErrors` objects with the validation result.
   * 5. Determines the overall validity of the payload.
   * 6. Updates the cache with the new validation result.
   *
   * The actual field validation is delegated to the `ValidationStrategy` implementations, which are determined by the metadata service.
   *
   * @example
   * ```typescript
   * const engine = new ValidationEngine(MyClass);
   * const result = engine.validate(myPayload);
   * console.log(result.valid);  // Output: true or false
   * ```
   */
  public validate(
    payload?: Types.Payload<TClass>,
    decoratorArgs: Record<string, any> = {},
  ): FormValidationResponse<TClass> {
    const args = { ...this.#globalDecoratorArgs, ...decoratorArgs };
    // if (Objects.deepEquals(payload, this.#cache.payload)) return this.#cache.cache;

    const state: Types.Payload<TClass> = toClass(this.#hostClass, payload) as any;

    const errors: any = {};
    const detailedErrors: any = {};

    const classValidators = this.#classValidatorMetaService.validateIf(state)
      ? this.#classValidatorMetaService.value.contents
      : [];
    const classReflectionRule = new ValidationMetadataEntry(classValidators);
    const classValidationErrors = classReflectionRule.validate(
      state,
      state,
      this.#groups,
      this.locale,
      args,
      this.#eventEmitter,
    );

    this.#fieldValidatorMetaService.getFields().forEach(field => {
      const validation: any = this.validateField(field as keyof TClass, state, args);
      detailedErrors[field] = validation[0];
      errors[field] = validation[1];
    });

    return this.#cache.patch(
      {
        valid: !hasErrors(errors),
        detailedErrors,
        errors,
        globalErrors: classValidationErrors,
      },
      state,
    );
  }

  /**
   * Validates a single field within the entity.
   * @typeParam K - The key type of the field.
   * @param payload - The payload containing the field value.
   * @param fieldName - The name of the field to validate.
   * @returns An array containing the detailed error message and the error message.
   */
  validateField<K extends keyof TClass>(
    fieldName: K,
    payload: Types.Payload<TClass>,
    decoratorArgs: Record<string, any> = {},
  ): StrategyErrors<TClass, K> {
    const args = { ...this.#globalDecoratorArgs, ...decoratorArgs };
    const descriptor = this.#fieldValidatorMetaService.getUntypedDescriptor(
      fieldName,
      this.#eventEmitter,
    );
    const stratImpl = new descriptor.StrategyImpl(
      descriptor,
      this.#defaultValue,
      this.#groups,
      this.locale,
      this.#eventEmitter,
    );

    // @ts-expect-error Error!
    return stratImpl.test(payload[fieldName], payload, args);
  }

  public registerAsync(handler: (props: FormErrors<TClass>) => void): void {
    this.#eventHandlers.asyncValidationComplete.listen(handler);
  }

  public unregisterAsync(): void {
    this.#eventHandlers.asyncValidationComplete.dispose();
  }
}
