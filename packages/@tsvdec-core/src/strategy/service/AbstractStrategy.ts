import type { DecoratorValidationResult } from "../../decorators";
import { type DecoratorArgs } from "../../decorators";
import { type EventEmitter } from "../../events";
import { type Locale } from "../../localization";
import {
  ClassReflectionService,
  FieldReflectionService,
  type ReflectionDescriptor,
} from "../../reflection";
import { type ValidationMetadataEntry } from "../../reflection/metadata";
import { Form } from "../../validation/models/Form";
import { FormProps } from "../../validation/types";

/**
 * The `AbstractStrategyResolver` class serves as an abstract base class for implementing various validation strategies. It provides essential utility methods and properties to facilitate the validation process.
 * @typeParam TClass The type of the field being validated.
 * @typeParam TDetailedResult The detailed result of the validation.
 * @typeParam TSimpleResult A simplified version of the validation result.
 */
export abstract class AbstractStrategyResolver<
  TClass = any,
  TDetailedResult = any,
  TSimpleResult = any,
> {
  readonly #locale: Locale;
  readonly #groups: string[];
  readonly #engineCfg: FormProps<any>;
  readonly #classRules: ValidationMetadataEntry<TClass>;
  readonly #classDescriptor: ReflectionDescriptor<any, any>;
  readonly #defaultParent: TClass;
  #fieldDescriptor?: ReflectionDescriptor<TClass, any>;
  #eventEmitter: EventEmitter;

  /**
   * Initializes the `#descriptor` and `#defaultParent` fields.
   *
   * @param classDescriptor The reflection descriptor for the field.
   * @param defaultValue The default value for the parent object.
   */
  constructor(
    classDescriptor: ReflectionDescriptor<TClass, any>,
    defaultValue: TClass,
    groups: string[],
    locale: Locale,
    eventEmitter: EventEmitter,
    asyncDelay: number,
  ) {
    this.#eventEmitter = eventEmitter;
    this.#classDescriptor = classDescriptor;
    this.#defaultParent = defaultValue;
    this.#groups = groups;
    this.#locale = locale;
    this.#engineCfg = {
      defaultValue: this.defaultValue,
      groups: this.groups,
      asyncDelay,
    };
    this.#classRules = ClassReflectionService.inject(
      this.#classDescriptor.hostClass!,
      this.eventEmitter,
    ).value;
  }

  public set eventEmitter(v: EventEmitter) {
    this.#eventEmitter = v;
  }

  public get eventEmitter(): EventEmitter {
    return this.#eventEmitter;
  }

  protected get fieldEngine(): Form<TClass> {
    return new Form<TClass>(this.#classDescriptor.thisClass!, this.engineCfg);
  }

  protected get engineCfg(): FormProps<any> {
    return this.#engineCfg;
  }

  protected get classRules(): ValidationMetadataEntry<TClass> {
    return this.#classRules;
  }

  protected get groups(): string[] {
    return this.#groups;
  }

  protected get locale(): Locale {
    return this.#locale;
  }

  protected get fieldDescriptor(): ReflectionDescriptor<TClass, any, undefined> {
    if (this.#fieldDescriptor) return this.#fieldDescriptor;
    this.#fieldDescriptor = FieldReflectionService.inject(
      this.#classDescriptor.hostClass!,
      this.#eventEmitter,
    ).getUntypedDescriptor(this.fieldName, this.eventEmitter);
    return this.#fieldDescriptor;
  }

  /**
   * Gets the field name from the descriptor.
   *
   * @returns The name of the field.
   */
  protected get fieldName(): string {
    return this.#classDescriptor.thisName!;
  }

  /**
   * Gets the default value for the field.
   *
   * @returns The default value of the field.
   */
  protected get defaultValue(): any {
    return (this.#defaultParent as any)?.[this.fieldName];
  }

  protected getErrorMessages(validations: DecoratorValidationResult[] = []): string[] {
    const nonNullableValidations = validations ?? [];
    return Array.isArray(nonNullableValidations) ? nonNullableValidations.map(e => e.message) : [];
  }

  protected getClassErrors(fieldValue: any, parentValue: any): DecoratorValidationResult[] {
    if (!this.#classDescriptor.validateIf(parentValue)) return [];
    return this.classRules.validate(fieldValue, parentValue, this.groups, this.locale);
  }

  protected getRootErrors(
    fieldValue: any,
    parentValue: any,
    args: DecoratorArgs,
  ): DecoratorValidationResult[] {
    if (!this.fieldDescriptor.validateIf(parentValue)) return [];
    return this.fieldDescriptor.validations.root.validate(
      fieldValue,
      parentValue,
      this.groups,
      this.locale,
      args,
      this.#eventEmitter,
      this.fieldName,
    );
  }

  protected getArrayItemErrors(arrayItem: any, parentValue: any): DecoratorValidationResult[] {
    return this.fieldDescriptor.validations.foreach.validate(
      arrayItem,
      parentValue,
      this.groups,
      this.locale,
    );
  }

  /**
   * The `test` method is an abstract method that must be implemented by subclasses. It performs the actual validation logic for the field. The method takes in the value to be validated, the context, and optionally, the validation groups to consider.
   *
   * @param value The value to be validated.
   * @param context The context in which the validation is taking place.
   * @param args - Decorator arguments.
   *
   * @returns A tuple containing the detailed result (`TDetailedResult`) and the simplified result (`TSimpleResult`).
   *
   * @remarks
   * It returns a tuple where the first element is the detailed validation result and the second element is
   * the simplified validation result.
   */
  abstract test(value: any, context: any, args: DecoratorArgs): [TDetailedResult, TSimpleResult];
}
