import { EventEmitter } from "../../events";
import { StrategyKey, StrategyResolverData } from "../../strategy";
import { AbstractStrategyResolver } from "../../strategy/service";
import * as Strategies from "../../strategy/service/impl";
import { Types } from "../../utilities";
import { ValidationMetadataEntry } from "../metadata";
import { FieldReflectionService } from "../service/";
import type {
  ReflectionDescriptorProps,
  ReflectionDescriptorType,
  ReflectionFieldValidation,
} from "../types";

/**
 * A class responsible for describing reflection metadata for a specific field within a class.
 * @typeParam This - The type of the current class.
 * @typeParam HostClass - The type of the host class.
 * @typeParam Name - The name of the descriptor within the host class.
 * @remarks This class is used to store metadata about a specific field, including its validation rules and default values.
 */
export class ReflectionDescriptor<
  This = unknown,
  HostClass = unknown,
  Name extends keyof HostClass | undefined = undefined,
> {
  hostClass?: Types.Class<HostClass>;
  hostDefault?: HostClass;
  thisClass?: Types.Class<This>;
  thisName?: Name;
  thisDefault?: ReflectionDescriptorType<HostClass, Name>;
  validations: ReflectionFieldValidation<ReflectionDescriptorType<HostClass, Name>>;
  eventEmitter: EventEmitter;
  validateIf: (clazz: HostClass) => boolean;

  constructor(props: ReflectionDescriptorProps<This, HostClass, Name>) {
    this.hostClass = props.hostClass;
    this.thisName = props.thisName;
    this.thisClass = props.thisClass;
    this.hostDefault = props.hostDefault ?? props.hostClass ? new props.hostClass!() : undefined;
    this.thisDefault = props.thisDefault;
    this.eventEmitter = props.eventEmitter;
    this.validateIf = () => true;
    this.validations = props.validations ?? {
      root: new ValidationMetadataEntry(),
      foreach: new ValidationMetadataEntry(),
    };
  }

  /**
   * Gets the implementation of the reflection strategy.
   * @throws {Error} If the strategy is not implemented.
   */
  public get StrategyImpl(): Types.Class<AbstractStrategyResolver> {
    const strategy = this.strategy;
    if (!(strategy in StrategyResolverData)) {
      const error = `Validation strategy not implemented for field type '${strategy}'`;
      throw new Error(error);
    }
    return StrategyResolverData[strategy];
  }

  /**
   * Determines the reflection strategy type for the descriptor.
   * @returns The type of the reflection strategy.
   * @remarks
   * This method performs the following steps:
   * 1. Checks if the host class is defined.
   * 2. Checks if the field name is defined.
   * 3. Determines the strategy based on the field type and its metadata.
   */
  public get strategy(): StrategyKey {
    if (!this.hostClass) return "UNKNOWN";
    if (!this.thisName) Strategies.ObjectStrategy.Name;
    const instance = new this.hostClass();
    const fieldName = this.thisName as keyof typeof instance;
    const value = instance[fieldName];
    const meta = FieldReflectionService.inject(this.hostClass!, this.eventEmitter);
    const descriptor = meta.getTypedDescriptor<HostClass, keyof HostClass>(this.thisName!);
    const isArray = Array.isArray(value);
    if (isArray && descriptor.thisClass) return Strategies.ObjectArrayStrategy.Name;
    if (isArray && !descriptor.thisClass) return Strategies.PrimitiveArrayStrategy.Name;
    if (!isArray && descriptor.thisClass) return Strategies.ObjectStrategy.Name;
    return Strategies.PrimitiveStrategy.Name;
  }
}
