import * as MUI from "@mui/material";
import { useForm } from "@tsvdec/react";
import { ModelForm } from "./model";

export function Component() {
  const [form, setForm, { errors }] = useForm(ModelForm);

  const register = (field: keyof ModelForm, type: string) => ({
    label: field,
    placeholder: `Enter ${field}`,
    value: form[field],
    onChange: (e: any) => setForm({ ...form, [field]: e.target.value }),
    helperText: errors[field][0],
    error: errors[field].length > 0,
    fullWidth: true,
    type,
    InputLabelProps: { shrink: type === "text" ? undefined : true },
  });

  return (
    <MUI.Box display="flex" flexWrap="wrap" gap={2}>
      <MUI.Grid container spacing={2}>
        <MUI.Grid item xs={12} md={6}>
          <MUI.TextField {...register("description", "text")} />
        </MUI.Grid>
      </MUI.Grid>
    </MUI.Box>
  );
}

// prettier-ignore
export const CodeText =
`import * as MUI from "@mui/material";
import { useForm } from "@tsvdec/react";
import { ModelForm } from "./model";

export function Component() {
  const [form, setForm, { errors }] = useForm(ModelForm);

  const register = (field: keyof ModelForm, type: string) => ({
    label: field,
    placeholder: \`Enter \${field}\`,
    value: form[field],
    onChange: (e: any) => setForm({ ...form, [field]: e.target.value }),
    helperText: errors[field][0],
    error: errors[field].length > 0,
    fullWidth: true,
    type,
    InputLabelProps: { shrink: type === "text" ? undefined : true },
  });

  return (
    <MUI.Box display="flex" flexWrap="wrap" gap={2}>
      <MUI.Grid container spacing={2}>
        <MUI.Grid item xs={12} md={6}>
          <MUI.TextField {...register("description", "text")} />
        </MUI.Grid>
      </MUI.Grid>
    </MUI.Box>
  );
}`;
