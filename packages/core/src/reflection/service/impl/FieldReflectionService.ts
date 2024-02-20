import { FieldDecoratorCtx } from "../../../decorators";
import {
  DecoratorMeta,
  DEFAULT_DECORATOR_META,
} from "../../../decorators/factory/DecoratorFactoryMeta";
import { EventEmitter } from "../../../events";
import { Classes, type Types } from "../../../utilities";
import type { ValidationEvaluator } from "../../../validation/types";
import { ReflectionDescriptor } from "../../models";
import type { ReflectionInjectStrategy } from "../../types";
import { AbstractReflectionService } from "../AbstractReflectionService";

/**
 * A configurer class which allows for easier manipulation of decorated fields and corresponding metadata
 * @remarks This class is responsible for managing metadata related to validation. It provides methods to add validators, get field names, and manage descriptors.
 */
export class FieldReflectionService extends AbstractReflectionService<
  Map<string, ReflectionDescriptor>
> {
  /**
   * Static method to create a new instance of FieldReflection.
   * @param strategy - The strategy to inject.
   * @returns A new instance of FieldReflection.
   */
  public static inject(
    strategy: ReflectionInjectStrategy,
    eventEmitter: EventEmitter,
  ): FieldReflectionService {
    return new FieldReflectionService(strategy, eventEmitter);
  }

  eventEmitter!: EventEmitter;
  #fields!: string[];

  private constructor(strategy: ReflectionInjectStrategy, eventEmitter: EventEmitter) {
    super(FieldReflectionService.name, strategy, () => new Map());
    this.eventEmitter = eventEmitter;
    Classes.isClass(strategy)
      ? this.#handleClassInit(strategy)
      : this.#handleContextInit(strategy as any);
  }

  /**
   * Adds a validator to a field.
   *
   * @param field - The name of the field.
   * @param validate - The validation function.
   * @param meta - Decorator meta.
   */
  addValidator(
    field: string,
    validate: ValidationEvaluator<any>,
    meta: DecoratorMeta<any> = DEFAULT_DECORATOR_META,
  ): void {
    this.getUntypedDescriptor(field).validations.root.add({ validate, meta });
  }

  /**
   * Gets the names of all fields present within given
   * reflection strategy (`Types.Class<T>` or `Decorator.Context`).
   *
   * @returns An array of field names.
   */
  getFields(): string[] {
    return this.#fields;
  }

  /**
   * Checks if a descriptor exists for a given name.
   *
   * @param name - The name of a field descriptor.
   * @returns `true` if the descriptor exists, `false` otherwise.
   */
  hasDescriptor(name: string): boolean {
    return this.value.has(name);
  }

  /**
   * Gets a typed descriptor for a given field name.
   *
   * @param thisName - The name of the field.
   * @returns The typed descriptor.
   */
  getTypedDescriptor<TClass, TName extends keyof TClass>(
    thisName: TName,
  ): ReflectionDescriptor<unknown, TClass, TName> {
    return this.getUntypedDescriptor(thisName as string) as ReflectionDescriptor<
      unknown,
      TClass,
      TName
    >;
  }

  /**
   * Gets an untyped descriptor for a given field key.
   *
   * @param fieldKey - The key of the field.
   * @returns The untyped descriptor.
   */
  getUntypedDescriptor(
    fieldKey: any,
    eventEmitter?: EventEmitter,
  ): ReflectionDescriptor<any, any, any> {
    this.eventEmitter = eventEmitter ?? this.eventEmitter;
    if (!this.hasDescriptor(fieldKey)) {
      const cfg = { thisName: fieldKey, eventEmitter: this.eventEmitter };
      const fieldValue = new ReflectionDescriptor(cfg);
      this.value.set(fieldKey, fieldValue);
    }
    const descriptor = this.value.get(fieldKey);
    if (!descriptor) throw new Error(`Descriptor "${fieldKey}" does not exist`);
    descriptor.hostClass = this.class ? this.class : descriptor.hostClass;
    descriptor.eventEmitter = this.eventEmitter;
    return descriptor;
  }

  /**
   * Initializes the class fields and descriptors when a class is provided as a strategy.
   *
   * @param clazz - The class to initialize.
   * @remarks
   * This method populates the `#fields` array with the names of the class fields.
   * It also ensures that untyped descriptors are created for each field.
   */
  #handleClassInit(clazz: Types.Class<any>): void {
    this.#fields = Classes.getFieldNames(clazz) as string[];
    this.#fields.forEach(name => this.getUntypedDescriptor(name));
  }

  /**
   * Initializes the class fields when a decorator context is provided as a strategy.
   *
   * @param _context - The decorator context.
   * @remarks
   * This method sets the `#fields` array to an empty array as no class fields are available.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  #handleContextInit(_context: FieldDecoratorCtx<any, any>): void {
    this.#fields = [];
  }
}
