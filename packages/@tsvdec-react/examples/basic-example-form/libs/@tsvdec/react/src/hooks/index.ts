export * from "./useChangeHandlers";
export * from "./useChangeHandlers/types";
export * from "./useCompare";
export * from "./useCompare/types";
export * from "./useEngine";
export * from "./useEngine/types";
export * from "./useErrors";
export * from "./useErrors/types";
export * from "./useEventfulErrors";
export * from "./useEventfulErrors/types";
export * from "./useForm";
export * from "./useForm/types";
export * from "./useListener";
export * from "./useListener/types";
export * from "./usePrevious";
export * from "./usePrevious/types";
export * from "./useReset";
export * from "./useReset/types";
export * from "./useValidation";
export * from "./useValidation/types";

import * as UseChangeHandlersHook from "./useChangeHandlers/index";
import * as UseChangeHandlersTypes from "./useChangeHandlers/types";
import * as UseCompareHook from "./useCompare/index";
import * as UseCompareTypes from "./useCompare/types";
import * as UseEngineHook from "./useEngine/index";
import * as UseEngineTypes from "./useEngine/types";
import * as UseErrorsHook from "./useErrors/index";
import * as UseErrorsTypes from "./useErrors/types";
import * as UseEventfulErrorsHook from "./useEventfulErrors/index";
import * as UseEventfulErrorsTypes from "./useEventfulErrors/types";
import * as UseFormHook from "./useForm/index";
import * as UseFormTypes from "./useForm/types";
import * as UseListenerHook from "./useListener/index";
import * as UseListenerTypes from "./useListener/types";
import * as UsePreviousHook from "./usePrevious/index";
import * as UsePreviousTypes from "./usePrevious/types";
import * as UseResetHook from "./useReset/index";
import * as UseResetTypes from "./useReset/types";
import * as UseValidationHook from "./useValidation/index";
import * as UseValidationTypes from "./useValidation/types";

export namespace Hooks {
  export namespace UseChangeHandlers {
    export import Types = UseChangeHandlersTypes;
    export import useChange = UseChangeHandlersHook.useChangeHandlers;
  }
  export namespace UseCompare {
    export import Types = UseCompareTypes;
    export import useCompare = UseCompareHook.useCompare;
  }
  export namespace UseEngine {
    export import Types = UseEngineTypes;
    export import useEngine = UseEngineHook.useEngine;
  }
  export namespace UseErrors {
    export import Types = UseErrorsTypes;
    export import useErrors = UseErrorsHook.useErrors;
  }
  export namespace UseEventfulErrors {
    export import Types = UseEventfulErrorsTypes;
    export import useEventfulErrors = UseEventfulErrorsHook.useEventfulErrors;
  }
  export namespace UseForm {
    export import Types = UseFormTypes;
    export import useForm = UseFormHook.useForm;
  }
  export namespace UseListener {
    export import Types = UseListenerTypes;
    export import useListener = UseListenerHook.useListener;
  }
  export namespace UsePrevious {
    export import Types = UsePreviousTypes;
    export import usePrevious = UsePreviousHook.usePrevious;
  }
  export namespace UseReset {
    export import Types = UseResetTypes;
    export import useReset = UseResetHook.useReset;
  }
  export namespace UseValidation {
    export import Types = UseValidationTypes;
    export import useValidation = UseValidationHook.useValidation;
  }
}
