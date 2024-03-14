import { Class } from "./Class";
import { ClassMetadata, ClassMetadataInjectType } from "./ClassMetadata";

export type ClassMetadataEntryInstance<T extends ClassMetadataEntryConstructor> =
  T extends ClassMetadataEntryConstructor<infer U> ? U : never;

export type ClassMetadataEntryConstructor<T = any> = Class<ClassMetadataEntry<T>>;

export abstract class ClassMetadataEntry<Value> {
  #metadata: ClassMetadata;
  #key: string;
  #initialState: () => Value;

  protected constructor(target: ClassMetadataInjectType, initialState: () => Value) {
    this.#initialState = initialState;
    this.#metadata = ClassMetadata.for(target);
    this.#key = this.constructor.name;
  }

  protected get value(): Value {
    if (!this.#metadata.hasKey(this.#key)) this.#metadata.setValue(this.#key, this.#initialState());
    return this.#metadata.getValue(this.#key);
  }
}
