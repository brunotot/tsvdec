import * as MUI from "@mui/material";
import { useForm } from "@tsvdec/react";
import { useState } from "react";
import { ModelForm } from "./model";

const LANGUAGE_FLAG = {
  en: "🇺🇸",
  hr: "🇭🇷",
} as const;

type LANG_KEY = keyof typeof LANGUAGE_FLAG;

export function Component() {
  const [locale, setLocale] = useState<LANG_KEY>("en");
  const [form, setForm, { errors }] = useForm(ModelForm, { locale });

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

  const handleLocaleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setLocale(e.target.value as LANG_KEY);
  };

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

      <MUI.FormControl>
        <MUI.FormLabel>Locale</MUI.FormLabel>
        <MUI.RadioGroup row value={locale} onChange={handleLocaleChange}>
          {Object.keys(LANGUAGE_FLAG).map(locale => (
            <MUI.FormControlLabel
              key={locale}
              control={<MUI.Radio />}
              label={`${LANGUAGE_FLAG[locale as LANG_KEY]} ${locale}`}
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
}

// prettier-ignore
export const CodeText =
`import * as MUI from "@mui/material";
import { useForm } from "@tsvdec/react";
import { useState } from "react";
import { ModelForm } from "./model";

const LANGUAGE_FLAG = {
  en: "🇺🇸",
  hr: "🇭🇷",
} as const;

type LANG_KEY = keyof typeof LANGUAGE_FLAG;

export function Component() {
  const [locale, setLocale] = useState<LANG_KEY>("en");
  const [form, setForm, { errors }] = useForm(ModelForm, { locale });

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

  const handleLocaleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setLocale(e.target.value as LANG_KEY);
  };

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

      <MUI.FormControl>
        <MUI.FormLabel>Locale</MUI.FormLabel>
        <MUI.RadioGroup row value={locale} onChange={handleLocaleChange}>
          {Object.keys(LANGUAGE_FLAG).map(locale => (
            <MUI.FormControlLabel
              key={locale}
              control={<MUI.Radio />}
              label={\`\${LANGUAGE_FLAG[locale as LANG_KEY]} \${locale}\`}
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
}
`;
