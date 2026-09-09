# Naming Rules

- Use clear, descriptive names.
- Avoid abbreviations unless widely understood.
- Use `kebab-case` for files and folders.
- Use `PascalCase` for React components and types.
- Use `camelCase` for variables, functions, and hooks.
- Use `UPPER_SNAKE_CASE` for constants and environment variables.

## Callback Props

- Use `onPress` for callback props that pass through to HeroUI or React Aria
  pressable components.
- Preserve `onClick` when passing through to native elements or APIs that expose
  that event.
- Name higher-level callbacks by intent, such as `onSave`, `onDelete`,
  `onSelect`, or `onNavigate`.
- Preserve distinct interaction names such as `onChange`, `onSubmit`, and
  `onOpenChange`; do not rename every callback to `onPress`.
