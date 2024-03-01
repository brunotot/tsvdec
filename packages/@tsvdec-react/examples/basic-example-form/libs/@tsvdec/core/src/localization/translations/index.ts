// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Alpha } from "../../decorators";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DecoratorValidationKeys } from "../../decorators/validators/utilities/DecoratorValidationKeys";

import de from "./de";
import en from "./en";
import es from "./es";
import fr from "./fr";
import hr from "./hr";
import it from "./it";
import nl from "./nl";

export namespace Translations {
  /**
   * [@Translation]
   */
  export const English = en;
  /**
   * [@Translation]
   */
  export const German = de;
  /**
   * [@Translation]
   */
  export const Spanish = es;
  /**
   * [@Translation]
   */
  export const French = fr;
  /**
   * [@Translation]
   */
  export const Croatian = hr;
  /**
   * [@Translation]
   */
  export const Italian = it;
  /**
   * [@Translation]
   */
  export const Dutch = nl;
}

/**
 * Represents the union of all predefined validator decorator keys (and extras) which `@tsvdec/core` provides.
 * For example, {@link Alpha @Alpha\(\)} decorator has a key defined as {@link DecoratorValidationKeys.ALPHA ALPHA}.
 * @hidden
 */
export type TranslationKey = keyof typeof Translations.English;
