import { AlternateEmail } from "@mui/icons-material";
import { PropertyIOMarker } from "../../shared/PropertyIOMarker";
import { DemoCodeProps } from "../DemoList";
import { CodeText as COMPONENT_CODE, Component } from "./code/component";
import { CodeText as MODEL_CODE } from "./code/model";

const DemoProps = {
  title: (
    <PropertyIOMarker
      icon={<AlternateEmail color="warning" />}
      title="Configurable decorator setting: validateIf"
      name="validateIf"
    />
  ),
  shortDescription: "Defines conditional field validation at the decorator level.",
  description: <div>TODO</div>,
  relatedFAQ: ["TODO"],
  codeData: [
    { name: "model.ts", lang: "typescript", code: MODEL_CODE },
    { name: "component.tsx", lang: "typescript", code: COMPONENT_CODE },
  ],
  children: <Component />,
} as DemoCodeProps;

export default DemoProps;
