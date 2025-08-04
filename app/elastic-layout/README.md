# Elastic Layout Framework

This framework implements a dynamic and flexible view system for Angular applications using a two-panel layout: **context** (left) and **workspace** (right). Views are dynamically resolved and rendered using a configuration map.

---

## 🧱 Architecture Overview

The Elastic Layout is composed of:

- `ElasticLayoutComponent` – the core layout engine that hosts dynamic content
- `app.routes.ts` – handles route-to-view resolution
- `view-map.ts` – defines what components to load for each logical view
- `header-panel.component.ts` – provides UI context and optional toolbar overlays

Each logical view is defined as a pairing of:
- A **context** component (left panel)
- A **workspace** component (right panel)

---

## 📦 File Structure

```
app/
 ├── elastic-layout/
 │     └── elastic-layout.component.ts
 │     └── components
 │     └── header-panel/
 │           └── header-panel.component.ts
 │     └── context-toolbar/
 │           └── context-toolbar.component.ts
 ├── app.routes.ts
 └── view-map.ts
```
---

## ⚙️ How It Works

### Step 1: Route into a logical view
The route contains a `view` param that maps to an entry in `VIEW_MAP`.

```ts
{ path: '', component: ElasticLayoutComponent }
```

### Step 2: `ElasticLayoutComponent` loads the view
- Parses `view` param from route
- Looks up `VIEW_MAP[view]`
- Dynamically renders `context.component` and `workspace.component` using Angular's `createComponent`

### Step 3: View-specific inputs can be passed
Each `ViewDescriptor` may contain an `inputs` map (optional), used to inject values.

```ts
'object-types-form': {
  context: { component: ObjectTypesListComponent },
  workspace: { component: DynamicFormComponent }
}
```

---

## 🧠 Benefits

- Declarative view configuration
- Lazy loading of view components
- Clean separation of concerns
- Highly reusable layout pattern
- View content remains portable and testable

---

## ✅ Example View Descriptor

In `view-map.ts`:

```ts
'object-types-form': {
  context: { component: ObjectTypesListComponent },
  workspace: { component: DynamicFormComponent }
}
```

---

## 🧪 Adding a New View

1. Create your `context` and `workspace` components
2. Register a new view in `view-map.ts`
3. Navigate using route param `?view=your-key`

---

## 📌 Limitations

- Currently uses fixed two-panel layout
- No drag-and-drop resizing or panel hiding
- Does not support recursive views (one view embedding another)

---

## 🧠 Future Improvements

- Add support for caching active views
- Panel resizing or docking
- View transitions/animations
- Deep-linking via nested route parameters

---

## 📌 Summary

The Elastic Layout Framework allows for a modular, route-driven, and dynamic UI layout pattern ideal for apps requiring workbench-style user interaction.
