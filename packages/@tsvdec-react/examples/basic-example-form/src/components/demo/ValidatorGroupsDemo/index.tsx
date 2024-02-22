import { AlternateEmail } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { PropertyIOMarker } from "../../shared/PropertyIOMarker";
import { DemoCodeProps } from "../DemoList";
import Component, { CodeText as COMPONENT_CODE } from "./code/component";
import { CodeText as MODEL_CODE } from "./code/model";
import { CodeText as GROUPS_CODE } from "./shared/groups";

const DemoProps = {
  title: (
    <PropertyIOMarker
      icon={<AlternateEmail color="warning" />}
      title="Configurable decorator setting: groups"
      name="groups"
    />
  ),
  shortDescription: "Filters validation by group for targeted field checks.",
  description: (
    <div>
      <Typography variant="body2" color="text.secondary" gutterBottom paddingBlock={1}>
        Validation groups allow you to define a subset of validators that should be used for
        validation. This is useful when you want to validate only a subset of fields. In the example
        below you can switch each validation group on and off by clicking the checkbox adjacent to
        the field. When checkbox is checked, all decorated validators associated with the validation
        group will get enabled and start validating.
      </Typography>
    </div>
  ),
  relatedFAQ: [
    "how to define custom validation groups?",
    "how to apply validation groups on validator decorators?",
    "how to specify which validationGroups should be used for validation during runtime?",
  ],
  codeData: [
    { name: "model.ts", lang: "typescript", code: MODEL_CODE },
    { name: "component.tsx", lang: "typescript", code: COMPONENT_CODE },
    { name: "groups.ts", lang: "typescript", code: GROUPS_CODE },
  ],
  children: <Component />,
} as DemoCodeProps;

export default DemoProps;
