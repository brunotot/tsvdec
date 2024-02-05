import { setMessageParser } from "@tsvdec/core";

// In this example we differentiate between two locales: English and Croatian.
type Locale = "en" | "hr";

// This is a simple type for defining the messages for each locale.
// In a real-world scenario, this would be a more complex type that would include
// all the possible messages grouped by their respective error types.
type Messages = {
  idRequired: string;
  descriptionRequired: string;
  creationDateRequired: string;
  deadlineDateRequired: string;
};

// Messages for Croatian locale.
const HrMessages: Messages = {
  idRequired: "Identifikator je obavezan",
  descriptionRequired: "Opis je obavezan",
  creationDateRequired: "Datum kreiranja je obavezan",
  deadlineDateRequired: "Rok je obavezan",
};

// Messages for English locale.
const EnMessages: Messages = {
  idRequired: "Id is required",
  descriptionRequired: "Description is required",
  creationDateRequired: "Creation date is required",
  deadlineDateRequired: "Deadline is required",
};

// Mapping locales to their respective messages for easy lookup.
const Translations: Record<Locale, Messages> = {
  en: EnMessages,
  hr: HrMessages,
};

// This section extends the `@tsvdec/core` module to incorporate a custom message
// type mechanism. It serves as a demonstration of augmenting the library to
// integrate a custom error message preprocessing functionality. By adopting this
// strategy, developers can specify custom message types for use within their
// decorators, ensuring type safety.
declare module "@tsvdec/core" {
  interface MessagePropOverride {
    type: keyof Messages;
  }
}

// Setting up the global message parser to utilize our translations
// This function demonstrates how to dynamically retrieve error messages based on
// the locale, leveraging the predefined message keys. It illustrates the
// library's capability to integrate with a global i18n system for handling
// error message translations.
setMessageParser((locale, message: keyof Messages) => {
  // @ts-expect-error Ignoring unimplemented locales (de, es, fr, it and nl)
  return Translations[locale]?.[message] ?? message;
});

// prettier-ignore
export const CodeText =
`import { setMessageParser } from "@tsvdec/core";

// In this example we differentiate between two locales: English and Croatian.
type Locale = "en" | "hr";

// This is a simple type for defining the messages for each locale.
// In a real-world scenario, this would be a more complex type that would include
// all the possible messages grouped by their respective error types.
type Messages = {
  idRequired: string;
  descriptionRequired: string;
  creationDateRequired: string;
  deadlineDateRequired: string;
};

// Messages for Croatian locale.
const HrMessages: Messages = {
  idRequired: "Identifikator je obavezan",
  descriptionRequired: "Opis je obavezan",
  creationDateRequired: "Datum kreiranja je obavezan",
  deadlineDateRequired: "Rok je obavezan",
};

// Messages for English locale.
const EnMessages: Messages = {
  idRequired: "Id is required",
  descriptionRequired: "Description is required",
  creationDateRequired: "Creation date is required",
  deadlineDateRequired: "Deadline is required",
};

// Mapping locales to their respective messages for easy lookup.
const Translations: Record<Locale, Messages> = {
  en: EnMessages,
  hr: HrMessages,
};

// This section extends the \`@tsvdec/core\` module to incorporate a custom message
// type mechanism. It serves as a demonstration of augmenting the library to
// integrate a custom error message preprocessing functionality. By adopting this
// strategy, developers can specify custom message types for use within their
// decorators, ensuring type safety.
declare module "@tsvdec/core" {
  interface MessagePropOverride {
    type: keyof Messages;
  }
}

// Setting up the global message parser to utilize our translations
// This function demonstrates how to dynamically retrieve error messages based on
// the locale, leveraging the predefined message keys. It illustrates the
// library's capability to integrate with a global i18n system for handling
// error message translations.
setMessageParser((locale, message: keyof Messages) => {
  // @ts-expect-error Ignoring unimplemented locales (de, es, fr, it and nl)
  return Translations[locale]?.[message] ?? message;
});
`;
