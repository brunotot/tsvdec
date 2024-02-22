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
        To modify error messages locale per individual form, you should supply the{" "}
        <strong>locale</strong> to <code className="code">useForm</code> hook. The example below
        showcases supplying custom locale via the languages radio buttons selection.
      </Typography>
    </div>
  ),
  relatedFAQ: ["how to modify the language of validation errors per single useForm hook?"],
  codeData: [
    { name: "model.ts", lang: "typescript", code: MODEL_CODE },
    { name: "component.tsx", lang: "typescript", code: COMPONENT_CODE },
  ],
  children: <Component />,
} as DemoCodeProps;

export default DemoProps;
