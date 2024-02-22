import { Input } from "@mui/icons-material";
import { PropertyIOMarker } from "../../shared/PropertyIOMarker";
import { DemoCodeProps } from "../DemoList";
import { CodeText as ADDRESS_COMPONENT_CODE } from "./code/AddressComponent";
import { CodeText as ADDRESS_MODEL_CODE } from "./code/AddressForm";
import { UserComponent as Component, CodeText as COMPONENT_CODE } from "./code/UserComponent";
import { CodeText as MODEL_CODE } from "./code/UserForm";

const DemoProps = {
  title: (
    <PropertyIOMarker
      icon={<Input color="success" />}
      title="Configurable input param: onChange"
      name="onChange"
    />
  ),
  shortDescription: "Handler that is called when the form model changes.",
  description: <>TODO</>,
  relatedFAQ: ["TODO"],
  codeData: [
    { name: "user-model.ts", lang: "typescript", code: MODEL_CODE },
    { name: "user.tsx", lang: "typescript", code: COMPONENT_CODE },
    { name: "address-model.ts", lang: "typescript", code: ADDRESS_MODEL_CODE },
    { name: "address.tsx", lang: "typescript", code: ADDRESS_COMPONENT_CODE },
  ],
  children: <Component />,
} as DemoCodeProps;

export default DemoProps;
