# General Rules

## General Principles

- Prefer readability over cleverness.
- Prefer consistency over personal preference.
- Prefer composition over duplication.
- Prefer self-documenting code over comments.
- Keep implementations simple and maintainable.
- Remove dead code instead of commenting it out.
- Keep files focused on a single responsibility.

## Functions

- Prefer arrow functions for components, custom hooks, utilities, and callbacks.
- Use named exports for reusable functions.
- Use function declarations or expressions when needed for overloads, hoisting,
  generators, or dynamic `this`.

```ts
export const usePosts = () => {
  // Hook implementation
}
```

## File Organization

- Group related code together.
- Keep import order consistent.
- Prefer small, focused modules.
- Avoid deeply nested directory structures.
- Use barrel exports only when they improve discoverability.
- Prefer explicit configuration over implicit behaviour.
