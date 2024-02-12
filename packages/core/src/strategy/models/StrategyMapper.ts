import * as Strategies from "../../strategy/service/impl";

/**
 * A mapping of reflection strategy types to their corresponding `ValidationStrategy` classes.
 * @remarks This object provides a way to look up the `ValidationStrategy` class that should be used for a given reflection strategy type.
 */
export const StrategyData = {
  unknown: (() => {}) as any,
  [Strategies.PrimitiveStrategy.Name]: Strategies.PrimitiveStrategy.StrategyResolver,
  [Strategies.ObjectStrategy.Name]: Strategies.ObjectStrategy.StrategyResolver,
  [Strategies.PrimitiveArrayStrategy.Name]: Strategies.PrimitiveArrayStrategy.StrategyResolver,
  [Strategies.ObjectArrayStrategy.Name]: Strategies.ObjectArrayStrategy.StrategyResolver,
  [Strategies.PrimitiveGetterStrategy.Name]: Strategies.PrimitiveGetterStrategy.StrategyResolver,
  [Strategies.ObjectGetterStrategy.Name]: Strategies.ObjectGetterStrategy.StrategyResolver,
  [Strategies.PrimitiveArrayGetterStrategy.Name]:
    Strategies.PrimitiveArrayGetterStrategy.StrategyResolver,
  [Strategies.ObjectArrayGetterStrategy.Name]:
    Strategies.ObjectArrayGetterStrategy.StrategyResolver,
} as const;

export type StrategyKey = keyof typeof StrategyData;
