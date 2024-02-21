export * from "./DecoratorFactoryMeta";
export * from "./forClass";
export * from "./forField";

import * as FactoryMeta from "./DecoratorFactoryMeta";
import * as ClassFactory from "./forClass";
import * as FieldFactory from "./forField";

export namespace DecoratorFactory {
  export import Class = ClassFactory;
  export import Field = FieldFactory;
  export import DecoratorFactoryMeta = FactoryMeta.DecoratorMeta;
}
