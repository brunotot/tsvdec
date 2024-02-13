import { EventEmitter } from "../models/EventEmitter";
import { EventName } from "../models/EventName";

/**
 * A function that resolves an event.
 */
export type EventResolver<TData> = (data: TData) => void | Promise<void>;

/**
 * A base class for event handlers.
 */
export abstract class AbstractEventHandler<TAccept = any, TReturn = any> {
  readonly #name: EventName;
  readonly #emitter: EventEmitter;
  #listener: EventResolver<TAccept>;

  constructor(name: EventName, delay: number = 500) {
    this.#name = name;
    this.#emitter = new EventEmitter(delay);
    this.#listener = () => {};
  }

  public get emitter(): EventEmitter {
    return this.#emitter;
  }

  public get name(): string {
    return this.#name;
  }

  protected abstract register(data: TAccept): TReturn;

  public emit(data: TAccept): void {
    this.#emitter.emit(this.name, data);
  }

  public listen(handler: EventResolver<TReturn>): void {
    this.dispose();
    this.#listener = (props: TAccept) => handler(this.register(props));
    this.#emitter.on(this.name, this.#listener);
  }

  public dispose(): void {
    if (this.#listener == null) return;
    this.#emitter.off(this.name, this.#listener);
  }
}
