import { Input } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { PropertyIOMarker } from "../../shared/PropertyIOMarker";
import { DemoCodeProps } from "../DemoList";
import Component, { CodeText as COMPONENT_CODE } from "./code/component";
import { CodeText as MODEL_CODE } from "./code/model";

const DemoProps = {
  title: (
    <PropertyIOMarker
      icon={<Input color="success" />}
      title="Configurable input param: locale"
      name="locale"
    />
  ),
  shortDescription: "Specifies the locale of error messages.",
  description: (
    <div>
      <Typography variant="body2" color="text.secondary" gutterBottom paddingBlock={1}>
        To modify error messages locale per individual form, you can supply{" "}
        <code className="code">useForm</code> with <strong>locale</strong> property. The library
        supports locales{" "}
        <code className="code">"en" | "hr" | "de" | "es" | "fr" | "it" | "nl"</code> . You can also
        globally define the locale. The example below showcases both types of supplying custom
        locale to <strong>@tsvdec/core</strong>.
      </Typography>
    </div>
  ),
  relatedFAQ: [
    "how to modify the language of validation errors per single Form instance?",
    "how to globally define the language of validation errors for all Form instances?",
  ],
  codeData: [
    { name: "model.ts", lang: "typescript", code: MODEL_CODE },
    { name: "component.tsx", lang: "typescript", code: COMPONENT_CODE },
  ],
  children: <Component />,
} as DemoCodeProps;

export default DemoProps;
