export * from "./AsyncValidationCompleteEventHandler";

import * as AsyncValidationCompleteEventHandler from "./AsyncValidationCompleteEventHandler";

export import ASYNC_VALIDATION_COMPLETE = AsyncValidationCompleteEventHandler;

/**
 * A map of event names to their string representations.
 */
export const EventHandlerData = {
  ASYNC_VALIDATION_COMPLETE: "asyncValidationComplete",
} as const;
