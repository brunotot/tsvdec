import { ReactNode } from "react";

/** Represents the props which `FormProvider` component accepts. */
export type FormContextProps = {
  children: ReactNode;
  submitted: boolean;
  setSubmitted: (bool: boolean) => void;
  validateImmediately: boolean;
};
