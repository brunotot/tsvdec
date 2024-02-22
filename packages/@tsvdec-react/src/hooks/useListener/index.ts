import { useEffect } from "react";
import { ValidationTrigger } from "../useEventfulErrors/types";

export function useListener(
  currentTrigger: ValidationTrigger,
  registerTriggers: ValidationTrigger[],
  triggerHandler: () => void,
  dependencies: any[],
) {
  useEffect(() => {
    if (!registerTriggers.includes(currentTrigger)) return;
    triggerHandler();
  }, [currentTrigger, ...dependencies]);
}
