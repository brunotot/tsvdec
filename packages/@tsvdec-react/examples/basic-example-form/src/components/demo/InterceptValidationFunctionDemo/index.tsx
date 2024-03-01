import { DemoCodeProps } from "../DemoList";
import { CodeText as COMPONENT_CODE, Component } from "./code/component";
import { CodeText as MODEL_CODE } from "./code/model";

const DemoProps = {
  title: "Intercept Validation Function Demo",
  shortDescription: "TODO.",
  description: <div>TODO</div>,
  relatedFAQ: ["TODO"],
  codeData: [
    { name: "model.ts", lang: "typescript", code: MODEL_CODE },
    { name: "component.tsx", lang: "typescript", code: COMPONENT_CODE },
  ],
  children: <Component />,
} as DemoCodeProps;

export default DemoProps;
