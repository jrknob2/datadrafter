# Dynamic Form Renderer

This module provides a schema-driven dynamic form renderer designed to handle both object model editing and structured data entry. It supports read, edit, and create modes and integrates seamlessly with enriched model structures.

---

## 🧱 Architecture Overview

The Dynamic Form Renderer includes:

- **DynamicFormComponent** – the main form container
- **Field Templates** – mapped directly in the HTML with `ngSwitchCase`
- **Custom Field Components** – one per supported field type (all implement `ControlValueAccessorBase`)
- **Schema Enrichment Logic** – enriches base fields using a static schema
- **Render Model** – a clone of the model used purely for rendering and editing

---

## 🔄 Data Flow

1. **Model Loading**
   - Loaded from backend using route params (e.g., `?uuid=...&mode=edit`)
   - Flat fields (e.g., `uuid`, `name`) are enriched using `record-header.schema.json`

2. **Schema Enrichment**
   - Enriched attributes are stored as `recordHeaderAttributes`
   - Combined with `staticAttributes` and `dynamicAttributes` to form the UI schema

3. **Render Model**
   - A cloned object (`renderModel`) holds all enriched fields
   - The original model (`model`) remains clean and untouched for persistence

---

## ✅ Features

- Supports: `text`, `textarea`, `number`, `float`, `money`, `checkbox`, `radio`, `select`, `date`
- Fully two-way bound using `[(ngModel)]` via `ControlValueAccessorBase`
- Consistent rendering using `fieldTemplates` + `ngSwitchCase`
- Runtime schema-driven rendering
- Field labels fallback to `field.name` if `field.label` is missing
- Route-based model loading using `ActivatedRoute`

---

## 📦 File Structure

```
app/
├── view-map.ts
├── dynamic-forms/
│     └── components/
│           ├── dynamic-form/
│           │     ├── dynamic-form.component.ts
│           │     ├── dynamic-form.component.html
│           │     └── dynamic-form.component.scss
│           └── dynamic-fields/
│                  ├── text-field/
│                  │     ├── text-field.component.ts
│                  │     ├── text-field.component.html
│                  │     ├── text-field.component.scss
│                  ├── textarea-field/
│                  ├── number-field/
│                  ├── .../
└── schemas/
      └── record-header.schema.json
```
---

## 📌 Usage in `view-map.ts`

```ts
'object-types-form': {
  context: { component: ObjectTypesListComponent },
  workspace: { component: DynamicFormComponent }
}
```

This is used by `ElasticLayoutComponent` via route param: `?view=object-types-form&uuid=...`

---

## 🧪 Schema Example

```json
{
  "name": "description",
  "label": "Description",
  "type": "textarea",
  "required": true
}
```

---

## ⚙️ Extending

To add new field types:

1. Create a new component implementing `ControlValueAccessorBase`
2. Add a new `*ngSwitchCase="'your-type'"` block to `fieldTemplates`
3. Bind it using `[(ngModel)]="field.value"`

---

## 🚫 Limitations

- Schema editing (e.g. adding attributes) is not yet supported
- Validation is basic and type-driven only
- No recursive or nested object rendering

---

## ✅ Summary

The Dynamic Form Renderer is a scalable and clean solution for schema-driven forms, supporting editing and viewing via route-resolved models. Fully extensible with type-safe custom controls.
