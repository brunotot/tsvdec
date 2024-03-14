import { Class } from "../shared/Class";
import { ClassMetadata } from "../shared/ClassMetadata";

export type ClassDecoratorSupplier<This extends Class> = (
  meta: ClassMetadata,
) => ReturnType<ClassDecoratorDef<This>>;

export type ClassDecoratorDef<This extends Class> = (
  constructor: This,
  context: ClassDecoratorContext,
) => void | undefined | This;

export function createClassDecorator<This extends Class>(
  supplier: ClassDecoratorSupplier<This>,
): ClassDecoratorDef<This> {
  return function (clazz: This, context: ClassDecoratorContext<This>) {
    const meta = ClassMetadata.for(context);
    meta._setClass(clazz);
    return supplier(meta);
  };
}
