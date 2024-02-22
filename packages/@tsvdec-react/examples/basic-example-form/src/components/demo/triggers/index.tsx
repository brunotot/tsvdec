import { Input } from "@mui/icons-material";
import { PropertyIOMarker } from "../../shared/PropertyIOMarker";
import { NestedDemoListProps } from "../DemoList";
import ManualChangeTriggerDemo from "./ManualChangeTriggerDemo";
import OnFieldChangeTriggerDemo from "./OnFieldChangeTriggerDemo";
import OnFormChangeTriggerDemo from "./OnFormChangeTriggerDemo";
import OnSubmitAndFormChangeTriggerDemo from "./OnSubmitAndFormChangeTriggerDemo";
import OnSubmitOnceTriggerDemo from "./OnSubmitOnceTriggerDemo";

const TriggerDemoList: NestedDemoListProps = {
  data: [
    ManualChangeTriggerDemo,
    OnSubmitAndFormChangeTriggerDemo,
    OnSubmitOnceTriggerDemo,
    OnFieldChangeTriggerDemo,
    OnFormChangeTriggerDemo,
  ],
  title: (
    <PropertyIOMarker
      icon={<Input color="success" />}
      title="Configurable input param: trigger"
      name="trigger"
    />
  ),
  description: "Triggers are used to control when the form should be validated",
  shortDescription: "Specifies how and when the form gets validated.",
};

export default TriggerDemoList;
