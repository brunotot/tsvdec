import { Types } from "../utilities";
import { EventHandlerData } from "./handlers/";

/**
 * The names of the events that can be emitted.
 */
export type EventName = Types.Values<typeof EventHandlerData>;

/**
 * A function that resolves an event.
 */
export type EventResolver<TData> = (data: TData) => void | Promise<void>;
