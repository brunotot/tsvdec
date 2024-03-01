/**
 * TypeScript native implementation of the EventEmitter pattern.
 * @remarks This class is used to create a simple event emitter that can be used to emit and listen to events.
 * @example
 * ```typescript
 * const emitter = new EventEmitter();
 * emitter.on("myEvent", data => console.log(data));
 * emitter.emit("myEvent", "Hello, world!");
 * ```
 */
export class EventEmitter {
  public static EMPTY = new EventEmitter();

  #delay: number;
  private readonly events: Map<string, Array<(data?: any) => void>>;
  private readonly handlersTimeout: Map<string, number>;

  constructor(delay: number = 500) {
    this.events = new Map();
    this.handlersTimeout = new Map();
    this.#delay = delay;
  }

  emit(event: string, data?: any): void {
    const handlers = this.events.get(event);
    if (handlers) {
      handlers.forEach(handler => {
        const handlerKey = `${event}-${handler.toString()}`;
        const existingTimeout = this.handlersTimeout.get(handlerKey);
        if (existingTimeout) {
          clearTimeout(existingTimeout);
        }
        const timeout = setTimeout(() => {
          handler(data);
        }, this.#delay);
        this.handlersTimeout.set(handlerKey, timeout as any);
      });
    }
  }

  on(event: string, handler: (data?: any) => void): void {
    const handlers = this.events.get(event) ?? [];
    handlers.push(handler);
    this.events.set(event, handlers);
  }

  off(event: string, handler: (data?: any) => void): void {
    const handlers = this.events.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
        const handlerKey = `${event}-${handler.toString()}`;
        const existingTimeout = this.handlersTimeout.get(handlerKey);
        if (existingTimeout) {
          clearTimeout(existingTimeout);
          this.handlersTimeout.delete(handlerKey);
        }
      }
      if (handlers.length === 0) {
        this.events.delete(event);
      } else {
        this.events.set(event, handlers);
      }
    }
  }
}
