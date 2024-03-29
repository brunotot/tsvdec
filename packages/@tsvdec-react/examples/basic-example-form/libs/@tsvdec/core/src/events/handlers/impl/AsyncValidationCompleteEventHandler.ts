import { DecoratorValidationResult } from "../../../decorators";
import { StrategyDetailedErrorsResponse, StrategySimpleErrorsResponse } from "../../../strategy";
import { Form, FormErrors } from "../../../validation";
import { EventHandlerData } from "../../handlers/impl/index";
import { AbstractEventHandler } from "../AbstractEventHandler";

/**
 * The request payload for the `ASYNC_VALIDATION_COMPLETE` event.
 */
export type AsyncValidationCompleteRequest<TClass> = {
  key: keyof TClass;
  value: DecoratorValidationResult;
};

/**
 * The response payload for the `ASYNC_VALIDATION_COMPLETE` event.
 */
export type AsyncValidationCompleteResponse<TClass> = {
  errors: StrategySimpleErrorsResponse<TClass>;
  detailedErrors: StrategyDetailedErrorsResponse<TClass>;
  globalErrors: DecoratorValidationResult[];
};

/**
 * An event handler that listens for the `ASYNC_VALIDATION_COMPLETE` event.
 */
export class AsyncValidationCompleteEventHandler<TClass> extends AbstractEventHandler<
  AsyncValidationCompleteRequest<TClass>,
  AsyncValidationCompleteResponse<TClass>
> {
  #form: Form<TClass>;

  constructor(form: Form<TClass>, delay: number = 500) {
    super(EventHandlerData.ASYNC_VALIDATION_COMPLETE, delay);
    this.#form = form;
  }

  protected register({ key, value }: AsyncValidationCompleteRequest<TClass>): FormErrors<TClass> {
    const { valid } = value;
    const currentErrors: any = this.#form.cache.get("errors");
    const currentDetailedErrors: any = this.#form.cache.get("detailedErrors");
    let currentGlobalErrors: any = this.#form.cache.get("globalErrors");

    if (key) {
      let simpleResults = currentErrors[key] as string[];
      let detailedResults = currentDetailedErrors[key] as DecoratorValidationResult[];

      if (valid) {
        detailedResults = detailedResults.filter(r => r.key !== value.key);
        simpleResults = simpleResults.filter(r => r !== value.message);
      } else {
        const existing = detailedResults.find(r => r.key === value.key);
        if (!existing) {
          detailedResults = [...detailedResults, value];
          simpleResults = [...simpleResults, value.message];
        }
      }

      currentErrors[key] = simpleResults;
      currentDetailedErrors[key] = detailedResults;
    } else {
      if (valid) {
        currentGlobalErrors = currentGlobalErrors.filter((r: any) => r.key !== value.key);
      } else {
        const existing = currentGlobalErrors.find((r: any) => r.key === value.key);
        if (!existing) {
          currentGlobalErrors = [...currentGlobalErrors, value];
        }
      }
    }

    const patched = this.#form.cache.patch({
      valid,
      detailedErrors: { ...currentDetailedErrors },
      errors: { ...currentErrors },
      globalErrors: [...currentGlobalErrors] as any,
    });

    return {
      errors: patched.errors,
      detailedErrors: patched.detailedErrors,
      globalErrors: patched.globalErrors,
    };
  }
}
