import { useEffect } from "react";
import { ValidationTrigger } from "../useEventfulErrors/types";

export function useListener(
  strategy: ValidationTrigger,
  events: ValidationTrigger[],
  handler: () => void,
  deps: any[],
) {
  useEffect(() => {
    if (!events.includes(strategy)) return;
    handler();
  }, [strategy, ...deps]);
}
