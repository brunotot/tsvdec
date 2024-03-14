import { ClassMetadata } from "../shared/ClassMetadata";

export type MethodDecoratorSupplier<This, Fn extends (...args: any[]) => any> = (
  meta: ClassMetadata,
) => ReturnType<MethodDecoratorDef<This, Fn>>;

export type MethodDecoratorDef<This, Fn extends (...args: any[]) => any> = (
  target: undefined,
  context: ClassMethodDecoratorContext<This, Fn>,
) => void | undefined | Fn;

export function createMethodDecorator<This, Fn extends (...args: any[]) => any>(
  supplier: MethodDecoratorSupplier<This, Fn>,
): MethodDecoratorDef<This, Fn> {
  return function (_target: undefined, context: ClassMethodDecoratorContext<This, Fn>) {
    const meta = ClassMetadata.for(context);
    return supplier(meta);
  };
}
