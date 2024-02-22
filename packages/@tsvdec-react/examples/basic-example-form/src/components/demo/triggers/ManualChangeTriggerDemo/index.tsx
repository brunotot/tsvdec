import { DemoCodeProps } from "../../DemoList";
import { CodeText as TRIGGER_DEMO_CODE } from "../TriggerDemo";
import { CodeText as MODEL_CODE } from "../TriggerModel";
import { CodeText as COMPONENT_CODE, Component } from "./code/component";

const DemoProps = {
  title: `"manual"`,
  description: <div>TODO</div>,
  relatedFAQ: ["TODO"],
  codeData: [
    { name: "component.tsx", lang: "typescript", code: COMPONENT_CODE },
    { name: "Trigger-Demo.ts", lang: "typescript", code: TRIGGER_DEMO_CODE },
    { name: "model.ts", lang: "typescript", code: MODEL_CODE },
  ],
  children: <Component />,
} as DemoCodeProps;

export default DemoProps;
