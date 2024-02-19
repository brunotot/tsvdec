import * as Overrides from "../../../overrides";

export import DecoratorArgs = Overrides.DecoratorArgsType;

export type DecoratorArgsResolver = () => DecoratorArgs;

let globalArgsResolver: DecoratorArgsResolver = () => ({});

export function setGlobalArgsResolver(resolver: DecoratorArgsResolver): void {
  globalArgsResolver = resolver;
}

export function getGlobalArgsResolver(): DecoratorArgsResolver {
  return globalArgsResolver;
}

export function getGlobalArgs(): DecoratorArgs {
  return globalArgsResolver();
}
