import { Types } from "../../utilities";

/**
 * A map of event names to their string representations.
 */
export const EventMap = {
  ASYNC_VALIDATION_COMPLETE: "asyncValidationComplete",
} as const;

/**
 * The names of the events that can be emitted.
 */
export type EventName = Types.Values<typeof EventMap>;
