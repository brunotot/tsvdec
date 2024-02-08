import * as MUI from "@mui/material";
import { useForm } from "@tsvdec/react";
import { Code } from "../../../shared/Code";
import { AddressComponent } from "./AddressComponent";
import { UserForm } from "./UserForm";

export function UserComponent() {
  const [form, setForm, { errors }] = useForm(UserForm);

  const register = (field: Exclude<keyof UserForm, "addressForm">, type: string) => ({
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
    <MUI.Box>
      <Code
        showLineNumbers={false}
        style={{ marginBottom: 4 }}
        code={JSON.stringify(form, null, 2)}
      />

      <MUI.Box paddingBlock={2} display="flex" flexWrap="wrap" gap={2}>
        <MUI.Grid container spacing={2}>
          <MUI.Grid item xs={12} md={6}>
            <MUI.TextField {...register("firstName", "text")} />
          </MUI.Grid>
          <MUI.Grid item xs={12} md={6}>
            <MUI.TextField {...register("lastName", "text")} />
          </MUI.Grid>
        </MUI.Grid>
      </MUI.Box>

      <AddressComponent
        value={form.addressForm}
        onChange={addressForm => setForm(prev => ({ ...prev, addressForm }))}
      />
    </MUI.Box>
  );
}

// prettier-ignore
export const CodeText =
`import * as MUI from "@mui/material";
import { Locale } from "@tsvdec/core";
import { useForm } from "@tsvdec/react";
import { useState } from "react";
import { ModelForm } from "./model";

const LANGUAGE_FLAG: Record<string, string> = {
  en: "🇺🇸",
  hr: "🇭🇷",
  de: "🇩🇪",
  es: "🇪🇸",
  fr: "🇫🇷",
  it: "🇮🇹",
  nl: "🇳🇱",
};

export default function Component() {
  const [locale, setLocale] = useState<Locale>("en");
  const [form, setForm, { errors }] = useForm(ModelForm, { locale });
  const handleLocaleChange = (event: any) => setLocale(event.target.value);

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
      <MUI.FormControl>
        <MUI.FormLabel>Locale</MUI.FormLabel>
        <MUI.RadioGroup row value={locale} onChange={handleLocaleChange}>
          {Object.keys(LANGUAGE_FLAG).map(locale => (
            <MUI.FormControlLabel
              key={locale}
              control={<MUI.Radio />}
              label={\`\${LANGUAGE_FLAG[locale]} \${locale}\`}
              value={locale}
            />
          ))}
        </MUI.RadioGroup>
      </MUI.FormControl>

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
    </MUI.Box>
  );
}`;
