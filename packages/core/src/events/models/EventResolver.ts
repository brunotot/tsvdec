/**
 * A function that resolves an event.
 */
export type EventResolver<TData> = (data: TData) => void | Promise<void>;
