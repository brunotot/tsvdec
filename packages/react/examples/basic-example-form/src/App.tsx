import { Container } from "@mui/material";
import AsyncFieldValidationDemo from "./components/demo/AsyncFieldValidationDemo";
import ClassLevelFormValidationDemo from "./components/demo/ClassLevelFormValidationDemo";
import CompoundFieldsValidationDemo from "./components/demo/CompoundFieldsValidationDemo";
import ConditionalValidationDemo from "./components/demo/ConditionalValidationDemo";
import DecoratorExternalArgsDemo from "./components/demo/DecoratorExternalArgsDemo";
import DemoList from "./components/demo/DemoList";
import ErrorMessagesPreprocessorDemo from "./components/demo/ErrorMessagesPreprocessorDemo";
import ModifyingErrorMessagesLocaleDemo from "./components/demo/ModifyingErrorMessagesLocaleDemo";
import NestedFormValidationDemo from "./components/demo/NestedFormValidationDemo";
import ValidatorGroupsDemo from "./components/demo/ValidatorGroupsDemo";
//import ComplexFormValidationDemo from "./components/demo/ComplexFormValidationDemo";

function App() {
  return (
    <Container maxWidth="md">
      <DemoList
        data={[
          ConditionalValidationDemo,
          ErrorMessagesPreprocessorDemo,
          ClassLevelFormValidationDemo,
          CompoundFieldsValidationDemo,
          ModifyingErrorMessagesLocaleDemo,
          NestedFormValidationDemo,
          DecoratorExternalArgsDemo,
          AsyncFieldValidationDemo,
          ValidatorGroupsDemo,
        ]}
      />
    </Container>
  );
}

export default App;
