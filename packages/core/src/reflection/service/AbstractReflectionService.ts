import { Classes, type Types } from "../../utilities";
import { ReflectionInjectStrategy } from "../types";

export abstract class AbstractReflectionService<TReflectedValue> {
  readonly #metadata: DecoratorMetadataObject;
  readonly #key: string;
  readonly #mapper: () => TReflectedValue;
  readonly class: Types.Class<any> | undefined;

  constructor(key: string, strategy: ReflectionInjectStrategy, mapper: () => TReflectedValue) {
    this.#metadata = Classes.getMetadata(strategy);
    this.#key = key;
    this.#mapper = mapper;
    this.class = Classes.isClass(strategy) ? strategy : undefined;
  }

  public get value(): TReflectedValue {
    const currentValue = this.#metadata[this.#key];
    if (currentValue) return currentValue as TReflectedValue;
    const defaultValue = this.#mapper();
    this.#metadata[this.#key] = defaultValue;
    return defaultValue;
  }
}
