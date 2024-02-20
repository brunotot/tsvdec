import { type DecoratorValidateIf } from "../../../decorators";
import {
  DecoratorMeta,
  DEFAULT_DECORATOR_META,
} from "../../../decorators/factory/DecoratorFactoryMeta";
import { EventEmitter } from "../../../events";
import { type Types } from "../../../utilities";
import { ValidationMetadata } from "../../../validation/models/ValidationMetadata";
import type { ValidationEvaluator } from "../../../validation/types";
import type { ReflectionInjectStrategy } from "../../types";
import { AbstractReflectionService } from "../AbstractReflectionService";

/**
 * A configurer class which allows for easier manipulation of decorated class validators and corresponding metadata
 * @remarks This class is responsible for managing metadata related to validation (at class level). It provides methods to add validators and read them.
 */
export class ClassReflectionService<
  TStrategy extends ReflectionInjectStrategy,
> extends AbstractReflectionService<ValidationMetadata> {
  eventEmitter!: EventEmitter;
  validateIf: DecoratorValidateIf<Types.UnwrapClass<Types.Class<any>>>;

  /**
   * Static method to create a new instance of ClassValidatorMetaService.
   * @param strategy - The strategy to inject.
   * @returns A new instance of ClassValidatorMetaService.
   */
  public static inject<TStrategy extends ReflectionInjectStrategy>(
    strategy: TStrategy,
    eventEmitter: EventEmitter,
  ): ClassReflectionService<TStrategy> {
    return new ClassReflectionService<TStrategy>(strategy, eventEmitter);
  }

  private constructor(strategy: ReflectionInjectStrategy, eventEmitter: EventEmitter) {
    super(ClassReflectionService.name, strategy, () => new ValidationMetadata());
    this.eventEmitter = eventEmitter;
    this.validateIf = () => true;
  }

  /**
   * Adds a class-level validator to the provided class.
   * @param validate - The validation function.
   * @param meta - Decorator meta
   */
  addValidator(
    validate: ValidationEvaluator<Types.UnwrapClass<TStrategy>>,
    meta: DecoratorMeta<any> = DEFAULT_DECORATOR_META,
  ): void {
    this.value.add({ validate, meta });
  }
}
