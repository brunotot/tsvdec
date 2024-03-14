import { ClassMetadata } from "../shared/ClassMetadata";

export type FieldDecoratorSupplier<This, Value> = (
  meta: ClassMetadata,
) => ReturnType<FieldDecoratorDef<This, Value>>;

export type FieldDecoratorDef<This, Value> = (
  target: undefined,
  context: ClassFieldDecoratorContext<This, Value>,
) => void | undefined | (() => Value);

export function createFieldDecorator<This, Value>(
  supplier: FieldDecoratorSupplier<This, Value>,
): FieldDecoratorDef<This, Value> {
  return function (_target: undefined, context: ClassFieldDecoratorContext<This, Value>) {
    const meta = ClassMetadata.for(context);
    return supplier(meta);
  };
}
