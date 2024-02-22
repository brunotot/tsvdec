import { Container } from "@mui/material";
import AsyncFieldValidationDemo from "./components/demo/AsyncFieldValidationDemo";
import ClassLevelFormValidationDemo from "./components/demo/ClassLevelFormValidationDemo";
import CompoundFieldsValidationDemo from "./components/demo/CompoundFieldsValidationDemo";
import ConditionalValidationDemo from "./components/demo/ConditionalValidationDemo";
import DecoratorArgsOverrideDemo from "./components/demo/DecoratorArgsOverrideDemo";
import DecoratorExternalArgsDemo from "./components/demo/DecoratorExternalArgsDemo";
import DemoList from "./components/demo/DemoList";
import ErrorMessagesPreprocessorDemo from "./components/demo/ErrorMessagesPreprocessorDemo";
import InnerFormOnChangeDemo from "./components/demo/InnerFormOnChangeDemo";
import ModifyingErrorMessagesLocaleDemo from "./components/demo/ModifyingErrorMessagesLocaleDemo";
import NestedFormValidationDemo from "./components/demo/NestedFormValidationDemo";
import ValidatorGroupsDemo from "./components/demo/ValidatorGroupsDemo";
import TriggerDemoList from "./components/demo/triggers";
//import ComplexFormValidationDemo from "./components/demo/ComplexFormValidationDemo";

function App() {
  return (
    <Container maxWidth="md">
      <DemoList
        data={[
          DecoratorArgsOverrideDemo,
          InnerFormOnChangeDemo,
          ModifyingErrorMessagesLocaleDemo,
          TriggerDemoList,
          DecoratorExternalArgsDemo,
          ClassLevelFormValidationDemo,
          ValidatorGroupsDemo,
          ConditionalValidationDemo,
          ErrorMessagesPreprocessorDemo,
          CompoundFieldsValidationDemo,
          NestedFormValidationDemo,
          AsyncFieldValidationDemo,
        ]}
      />
    </Container>
  );
}

export default App;
