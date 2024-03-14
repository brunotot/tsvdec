import { Class } from "./Class";
import { ClassMetadataEntryConstructor, ClassMetadataEntryInstance } from "./ClassMetadataEntry";

export const METADATA_KEY: unique symbol = Symbol("Symbol.metadata");

// @ts-expect-error Stage 3 decorators polyfill.
Symbol.metadata ??= Symbol("Symbol.metadata");

declare global {
  interface Function {
    [METADATA_KEY]: DecoratorMetadataObject;
  }
}

export type ClassMetadataInjectType = Class | DecoratorContext;

export const NO_CLASS_FOUND_ERROR = Error("No class registered for ClassMetadata");

export const NO_CONTEXT_FOUND_ERROR = Error("No context registered for ClassMetadata");

export class ClassMetadata {
  public static for(target: ClassMetadataInjectType) {
    return new ClassMetadata(target);
  }

  #target: ClassMetadataInjectType;
  #metadataRef: DecoratorMetadataObject;
  #clazz?: Class;
  #context?: DecoratorContext;

  private constructor(target: ClassMetadataInjectType) {
    this.#target = target;
    this.#metadataRef = this.#getMetadataRef(this.#target);
    if (typeof target === "function") this.#clazz = target;
    else this.#context = target;
  }

  public get context(): DecoratorContext {
    if (!this.#context) throw NO_CONTEXT_FOUND_ERROR;
    return this.#context;
  }

  public get _class(): Class {
    if (!this.#clazz) throw NO_CLASS_FOUND_ERROR;
    return this.#clazz;
  }

  public get _target() {
    return this.#target;
  }

  public get _metadataRef() {
    return this.#metadataRef;
  }

  public hasKey(key: string) {
    return key in this.#metadataRef;
  }

  public getValue<T = any>(key: string): T {
    return this.#metadataRef[key] as T;
  }

  public setValue<T = any>(key: string, value: T) {
    this.#metadataRef[key] = value;
  }

  public setContext(context: DecoratorContext) {
    this.#context = context;
  }

  public getEntry<T extends ClassMetadataEntryConstructor>(
    constructor: T,
  ): ClassMetadataEntryInstance<T> {
    return this.getValue<ClassMetadataEntryInstance<T>>(constructor.name);
  }

  public _setClass(clazz: Class) {
    this.#clazz = clazz;
  }

  #getMetadataRef(target: ClassMetadataInjectType): DecoratorMetadataObject {
    if (typeof target === "function") {
      target[METADATA_KEY] ??= {};
      return target[METADATA_KEY];
    }
    // @ts-expect-error Stage 3 decorators polyfill.
    target.metadata ??= {};
    return target.metadata;
  }
}
