import { FactCheck, Save } from "@mui/icons-material";
import * as MUI from "@mui/material";
import { ValidationTrigger, useForm } from "@tsvdec/react";
import { TriggerModel } from "./TriggerModel";

export type TriggerDemoProps = {
  trigger: ValidationTrigger;
};

export function TriggerDemo({ trigger }: TriggerDemoProps) {
  const [form, setForm, { errors, onSubmit, validate }] = useForm(TriggerModel, {
    trigger,
    onSubmit: () => {
      alert(form);
    },
  });

  const register = (field: keyof TriggerModel, type: string) => ({
    label: field,
    placeholder: `Enter ${field}`,
    value: form[field],
    helperText: errors[field]?.[0],
    error: errors?.[field]?.length > 0,
    fullWidth: true,
    type,
    InputLabelProps: { shrink: type === "text" ? undefined : true },
    onChange: (e: any) => setForm({ ...form, [field]: e.target.value }),
  });

  return (
    <MUI.Box display="flex" flexWrap="wrap" gap={2}>
      <MUI.Button
        disabled={trigger !== "manual"}
        startIcon={<FactCheck />}
        sx={{ mb: 1 }}
        color="success"
        variant="contained"
        onClick={() => validate()}
      >
        Validate
      </MUI.Button>

      <MUI.Grid container spacing={2}>
        <MUI.Grid item xs={12} md={6}>
          <MUI.TextField {...register("id", "text")} />
        </MUI.Grid>
        <MUI.Grid item xs={12} md={6}>
          <MUI.TextField {...register("description", "text")} />
        </MUI.Grid>
        <MUI.Grid item xs={12} md={6}>
          <MUI.TextField {...register("creationDate", "date")} />
        </MUI.Grid>
        <MUI.Grid item xs={12} md={6}>
          <MUI.TextField {...register("deadlineDate", "date")} />
        </MUI.Grid>
      </MUI.Grid>

      <MUI.Button variant="contained" onClick={onSubmit} startIcon={<Save />}>
        Submit
      </MUI.Button>
    </MUI.Box>
  );
}

// prettier-ignore
export const CodeText =
`import { FactCheck, Save } from "@mui/icons-material";
import * as MUI from "@mui/material";
import { ValidationTrigger, useForm } from "@tsvdec/react";
import { TriggerModel } from "./TriggerModel";

export type TriggerDemoProps = {
  trigger: ValidationTrigger;
};

export function TriggerDemo({ trigger }: TriggerDemoProps) {
  const [form, setForm, { errors, onSubmit, validate }] = useForm(TriggerModel, {
    validationStrategy: trigger,
    onSubmit: () => {
      alert(form);
    },
  });

  const register = (field: keyof TriggerModel, type: string) => ({
    label: field,
    placeholder: \`Enter \${field}\`,
    value: form[field],
    helperText: errors[field]?.[0],
    error: errors?.[field]?.length > 0,
    fullWidth: true,
    type,
    InputLabelProps: { shrink: type === "text" ? undefined : true },
    onChange: (e: any) => setForm({ ...form, [field]: e.target.value }),
  });

  return (
    <MUI.Box display="flex" flexWrap="wrap" gap={2}>
      <MUI.Button
        disabled={trigger !== "manual"}
        startIcon={<FactCheck />}
        sx={{ mb: 1 }}
        color="success"
        variant="contained"
        onClick={() => validate()}
      >
        Validate
      </MUI.Button>

      <MUI.Grid container spacing={2}>
        <MUI.Grid item xs={12} md={6}>
          <MUI.TextField {...register("id", "text")} />
        </MUI.Grid>
        <MUI.Grid item xs={12} md={6}>
          <MUI.TextField {...register("description", "text")} />
        </MUI.Grid>
        <MUI.Grid item xs={12} md={6}>
          <MUI.TextField {...register("creationDate", "date")} />
        </MUI.Grid>
        <MUI.Grid item xs={12} md={6}>
          <MUI.TextField {...register("deadlineDate", "date")} />
        </MUI.Grid>
      </MUI.Grid>

      <MUI.Button variant="contained" onClick={onSubmit} startIcon={<Save />}>
        Submit
      </MUI.Button>
    </MUI.Box>
  );
}`;
