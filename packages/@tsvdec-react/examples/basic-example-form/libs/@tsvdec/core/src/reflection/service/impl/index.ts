import * as _ClassReflectionService from "./ClassReflectionService";
import * as _FieldReflectionService from "./FieldReflectionService";

export * from "./ClassReflectionService";
export * from "./FieldReflectionService";

export namespace ReflectionServices {
  export import ClassReflectionService = _ClassReflectionService.ClassReflectionService;
  export import FieldReflectionService = _FieldReflectionService.FieldReflectionService;
}
