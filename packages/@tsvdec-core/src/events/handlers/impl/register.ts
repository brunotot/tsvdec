import { AsyncValidationCompleteEventHandler } from ".";
import { Form } from "../../../validation";
import { EventHandlerData } from "../../handlers/impl/index";
import { EventName } from "../../types";
import { AbstractEventHandler } from "../AbstractEventHandler";

/**
 * Retrieves the registered event handlers for a given form.
 * @param form The form instance.
 * @returns An object containing the registered event handlers.
 */
export function getRegisteredEventHandlers<TClass>(form: Form<TClass>, delay: number = 500) {
  return {
    [EventHandlerData.ASYNC_VALIDATION_COMPLETE]: new AsyncValidationCompleteEventHandler(
      form,
      delay,
    ),
  } as const satisfies Record<EventName, AbstractEventHandler>;
}

/**
 * The type of the event handlers for a given form.
 */
export type EventHandlers<TClass> = ReturnType<typeof getRegisteredEventHandlers<TClass>>;
