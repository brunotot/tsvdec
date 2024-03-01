import { Public } from "@mui/icons-material";
import { PropertyIOMarker } from "../../shared/PropertyIOMarker.js";
import { DemoCodeProps } from "../DemoList.js";
import { CodeText as COMPONENT_CODE, Component } from "./code/component.js";
import { CodeText as MODEL_CODE } from "./code/model.js";
import { CodeText as APP_CODE } from "./shared/app.js";

const DemoProps = {
  title: (
    <PropertyIOMarker
      icon={<Public color="secondary" />}
      title="Global configuration: decoratorArgsResolver"
      name="decoratorArgsResolver"
    />
  ),
  shortDescription: "Sets a handler to customize validation error message parsing.",
  description: <div>TODO</div>,
  relatedFAQ: ["TODO"],
  codeData: [
    { name: "model.ts", lang: "typescript", code: MODEL_CODE },
    { name: "component.tsx", lang: "typescript", code: COMPONENT_CODE },
    { name: "app.ts", lang: "typescript", code: APP_CODE },
  ],
  children: <Component />,
} as DemoCodeProps;

export default DemoProps;
