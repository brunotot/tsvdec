import { EventEmitter } from "../events";
import { Types } from "../utilities";
import { ValidationMetadata } from "../validation";

export type ReflectionInjectStrategy = Types.Class<any> | DecoratorContext;

export type ReflectionFieldValidation<FieldType> = {
  root: ValidationMetadata<FieldType>;
  foreach: ValidationMetadata<FieldType>;
};

/**
 * Properties for constructing a `ReflectionDescriptor`.
 * @typeParam This - The type of the current class.
 * @typeParam HostClass - The type of the host class.
 * @typeParam Name - The name of the descriptor within the host class.
 */
export type ReflectionDescriptorType<
  HostClass,
  Name extends keyof HostClass | undefined = undefined,
> = Name extends keyof HostClass ? HostClass[Name] : HostClass;

/**
 * Properties for constructing a `ReflectionDescriptor`.
 * @typeParam This - The type of the current class.
 * @typeParam HostClass - The type of the host class.
 * @typeParam Name - The name of the descriptor within the host class.
 */
export type ReflectionDescriptorProps<
  This,
  HostClass,
  Name extends keyof HostClass | undefined = undefined,
> = {
  hostClass?: Types.Class<HostClass>;
  hostDefault?: HostClass;
  thisClass?: Types.Class<This>;
  thisName?: Name;
  thisDefault?: ReflectionDescriptorType<HostClass, Name>;
  validations?: ReflectionFieldValidation<ReflectionDescriptorType<HostClass, Name>>;
  eventEmitter: EventEmitter;
};
