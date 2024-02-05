import { DemoCodeProps } from "../DemoList";
import { CodeText as COMPONENT_CODE, Component } from "./code/component";
import { CodeText as MODEL_CODE } from "./code/model";
import { CodeText as APP_CODE } from "./shared/app";

const DemoProps = {
  title: "Error Messages Preprocessor Demo",
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
