export * from "./ObjectArrayStrategy";
export * from "./ObjectStrategy";
export * from "./PrimitiveArrayStrategy";
export * from "./PrimitiveStrategy";

import { ObjectArrayStrategy } from "./ObjectArrayStrategy";
import { ObjectStrategy } from "./ObjectStrategy";
import { PrimitiveArrayStrategy } from "./PrimitiveArrayStrategy";
import { PrimitiveStrategy } from "./PrimitiveStrategy";

/**
 * A mapping of reflection strategy types to their corresponding `ValidationStrategy` classes.
 * @remarks This object provides a way to look up the `ValidationStrategy` class that should be used for a given reflection strategy type.
 */
export const StrategyData = {
  UNKNOWN: (() => {}) as any,
  [PrimitiveStrategy.Name]: PrimitiveStrategy.StrategyResolver,
  [ObjectStrategy.Name]: ObjectStrategy.StrategyResolver,
  [PrimitiveArrayStrategy.Name]: PrimitiveArrayStrategy.StrategyResolver,
  [ObjectArrayStrategy.Name]: ObjectArrayStrategy.StrategyResolver,
} as const;
