import { createContext } from "react";
import { FormContextProps } from "./types";

/** Context for the FormProvider component. */
export const FormContext = createContext<Omit<FormContextProps, "children"> | undefined>(undefined);
