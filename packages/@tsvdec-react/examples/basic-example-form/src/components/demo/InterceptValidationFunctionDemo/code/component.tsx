import * as MUI from "@mui/material";
import { useForm } from "@tsvdec/react";
import { ModelApi, ModelForm } from "./model";

export function Component() {
  const modelApi = new ModelApi();
  const [form, setForm, { errors, onSubmit }] = useForm(ModelForm, {
    trigger: "onSubmitOnce",
    onSubmit: () => {
      alert(form);
    },
  });
  modelApi.doPost(form);

  const register = (field: keyof ModelForm, type: string) => ({
    label: field,
    placeholder: `Enter ${field}`,
    value: form[field],
    helperText: errors[field]?.[0],
    error: errors?.[field]?.length > 0,
    fullWidth: true,
    type,
    InputLabelProps: { shrink: type === "text" ? undefined : true },
    onChange: (e: any) => {
      setForm({
        ...form,
        [field]: e.target.value,
        deadlineDate: field === "creationDate" ? e.target.value : form.deadlineDate,
      });
    },
  });

  return (
    <MUI.Box display="flex" flexWrap="wrap" gap={2}>
      <MUI.Box width="100%">
        <MUI.FormControlLabel
          label="validationEnabled"
          control={
            <MUI.Checkbox
              checked={form.validationEnabled}
              onChange={e => setForm({ ...form, validationEnabled: e.currentTarget.checked })}
            />
          }
        />
      </MUI.Box>

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

      <MUI.Button variant="contained" onClick={onSubmit}>
        Submit
      </MUI.Button>
    </MUI.Box>
  );
}

// prettier-ignore
export const CodeText =
`import * as MUI from "@mui/material";
import { useForm } from "@tsvdec/react";
import { ModelForm } from "./model";

export function Component() {
  const [form, setForm, { errors, onSubmit }] = useForm(ModelForm, {
    validationStrategy: "onSubmitOnce",
    onSubmit: () => {
      alert(form);
    },
  });

  const register = (field: keyof ModelForm, type: string) => ({
    label: field,
    placeholder: \`Enter \${field}\`,
    value: form[field],
    helperText: errors[field]?.[0],
    error: errors?.[field]?.length > 0,
    fullWidth: true,
    type,
    InputLabelProps: { shrink: type === "text" ? undefined : true },
    onChange: (e: any) => {
      setForm({
        ...form,
        [field]: e.target.value,
        deadlineDate: field === "creationDate" ? e.target.value : form.deadlineDate,
      });
    },
  });

  return (
    <MUI.Box display="flex" flexWrap="wrap" gap={2}>
      <MUI.Box width="100%">
        <MUI.FormControlLabel
          label="validationEnabled"
          control={
            <MUI.Checkbox
              checked={form.validationEnabled}
              onChange={e => setForm({ ...form, validationEnabled: e.currentTarget.checked })}
            />
          }
        />
      </MUI.Box>

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

      <MUI.Button variant="contained" onClick={onSubmit}>
        Submit
      </MUI.Button>
    </MUI.Box>
  );
}
`;
