import { DecoratorValidationResult } from "../decorators";
import { Booleans, Types } from "../utilities";
import {
  ObjectArrayStrategy,
  ObjectStrategy,
  PrimitiveArrayStrategy,
  PrimitiveStrategy,
  StrategyResolverData,
} from "./service";

/**
 * Evaluates a type, returning either an optional or mandatory evaluation based on the second type parameter.
 * @typeParam T - The type to evaluate.
 * @typeParam R - The result type. Determines if the evaluation is optional or mandatory.
 */
export type StrategyEvaluator<Class, Return = undefined> =
  true extends Booleans.isUndefined<Return>
    ? Types.Prettify<Types.Purify<{ [K in keyof Class]?: StrategyHandler<Class, K, Return> }>>
    : Types.Prettify<Types.Purify<{ [K in keyof Class]-?: StrategyHandler<Class, K, Return> }>>;

/**
 * Type for detailed errors during validation.
 * @typeParam T - The type being validated.
 */
export type StrategyDetailedErrorsResponse<T> = StrategyEvaluator<T, DecoratorValidationResult[]>;

/**
 * Type for basic errors during validation.
 * @typeParam T - The type being validated.
 */
export type StrategySimpleErrorsResponse<T> = StrategyEvaluator<T, string[]>;

export type StrategyKey = keyof typeof StrategyResolverData;

/**
 * Determines the evaluation strategy for a field in a type.
 * @typeParam T - The type containing the field.
 * @typeParam K - The key of the field.
 * @typeParam R - The result type.
 */
// prettier-ignore
export type StrategyHandler<Class, Key extends keyof Class, Return> =
    true extends PrimitiveArrayStrategy.matches<Class, Key>
    ? PrimitiveArrayStrategy.handler<Class, Key, Return>

    : true extends PrimitiveStrategy.matches<Class, Key>
    ? PrimitiveStrategy.handler<Class, Key, Return>

    : true extends ObjectArrayStrategy.matches<Class, Key>
    ? ObjectArrayStrategy.handler<Class, Key, Return>

    : true extends ObjectStrategy.matches<Class, Key>
    ? ObjectStrategy.handler<Class, Key, Return>
  : never;

/**
 * A type that maps field types to their respective validation strategy classes.
 * @typeParam Field - The type of the field being validated.
 */
// prettier-ignore
export type StrategyResolver<Class, Key extends keyof Class> =
  true extends PrimitiveArrayStrategy.matches<Class, Key>
  ? PrimitiveArrayStrategy.StrategyResolver<Class[Key]>

  : true extends PrimitiveStrategy.matches<Class, Key>
  ? PrimitiveStrategy.StrategyResolver<Class[Key]>

  : true extends ObjectArrayStrategy.matches<Class, Key>
  ? ObjectArrayStrategy.StrategyResolver<Class[Key]>

  : true extends ObjectStrategy.matches<Class, Key>
  ? ObjectStrategy.StrategyResolver<Class[Key]>
: never;

/**
 * A type that maps field types to their respective validation strategy results.
 * @typeParam Field - The type of the field being validated.
 */
export type StrategyErrors<Class, Key extends keyof Class> = ReturnType<
  StrategyResolver<Class, Key>["test"]
>;
