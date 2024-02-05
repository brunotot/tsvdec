import * as MUI from "@mui/material";
import { Locale, getGlobalLocale, setGlobalLocale } from "@tsvdec/core";
import { useForm } from "@tsvdec/react";
import { useState } from "react";
import { ModelForm } from "./model";

/* Global locale configuration. */
setGlobalLocale("en");

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
  const globalLocale = getGlobalLocale();
  const [locale, setLocale] = useState<Locale>(globalLocale);
  const [form, setForm, { errors }] = useForm(ModelForm, { locale });
  const handleLocaleChange = (event: any) => setLocale(event.target.value);

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
      <MUI.Typography width="100%">
        Global locale is <code className="code">"{globalLocale}"</code>
      </MUI.Typography>
      <MUI.FormControl>
        <MUI.FormLabel>Locale</MUI.FormLabel>
        <MUI.RadioGroup row value={locale} onChange={handleLocaleChange}>
          {Object.keys(LANGUAGE_FLAG).map(locale => (
            <MUI.FormControlLabel
              key={locale}
              control={<MUI.Radio />}
              label={`${LANGUAGE_FLAG[locale]} ${locale}`}
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
import { Locale, getGlobalLocale, setGlobalLocale } from "@tsvdec/core";
import { useForm } from "@tsvdec/react";
import { useState } from "react";
import { ModelForm } from "./model";

/* Global locale configuration. */
setGlobalLocale("en");

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
  const globalLocale = getGlobalLocale();
  const [locale, setLocale] = useState<Locale>(globalLocale);
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
      <MUI.Typography width="100%">
        Global locale is <code className="code">"{globalLocale}"</code>
      </MUI.Typography>
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
}
`;
