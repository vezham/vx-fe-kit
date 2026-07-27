# Coding Standards

This handbook defines the coding standards followed across Vezham repositories.

These standards exist to improve consistency, readability, maintainability, and
developer experience for both humans and AI-assisted development.

> **AI Instructions**
>
> When generating, modifying, or reviewing code for this repository, follow
> this handbook unless explicitly instructed otherwise.

---

## 1. General Principles

- Prefer readability over cleverness.
- Prefer consistency over personal preference.
- Prefer composition over duplication.
- Prefer self-documenting code over comments.
- Keep implementations simple and maintainable.
- Remove dead code instead of commenting it out.
- Keep files focused on a single responsibility.

---

## 2. Naming

- Use clear, descriptive names.
- Avoid abbreviations unless widely understood.
- Use `kebab-case` for files and folders.
- Use `PascalCase` for React components and types.
- Use `camelCase` for variables, functions, and hooks.
- Use `UPPER_SNAKE_CASE` for constants and environment variables.

---

## 3. File Organization

- Group related code together.
- Keep import order consistent.
- Prefer small, focused modules.
- Avoid deeply nested directory structures.
- Use barrel exports only when they improve discoverability.
- Prefer explicit configuration over implicit behaviour.

---

## 4. Comments

Comments should explain **why**, not **what**.

Use structured developer comments only when they provide long-term value.

### Format

```ts
// <author>/NOTE: ...
// <author>/TODO: ...
// <author>/FIXME: ...
// <author>/HACK: ...
// <author>/REF: ...
```

| Tag     | Purpose                                                                 |
| ------- | ----------------------------------------------------------------------- |
| `NOTE`  | Explain why something exists or document an important design decision.  |
| `TODO`  | Work intentionally deferred.                                            |
| `FIXME` | Known issue requiring a future fix.                                     |
| `HACK`  | Temporary workaround that should eventually be removed.                 |
| `REF`   | Reference another file, specification, issue, PR, or external resource. |

### Examples

#### NOTE

```ts
// wjdlz/NOTE: Keep this rule in sync with @vx-cli project generators.
```

#### TODO

```ts
// wjdlz/TODO: Add React-specific workspace rules.
```

#### FIXME

```ts
// wjdlz/FIXME: Remove workaround after upstream bug is fixed.
```

#### HACK

```ts
// wjdlz/HACK: Work around Nx limitation until official support is available.
```

#### REF

```ts
// wjdlz/REF: vx/handbooks/release.md
```

### Guidelines

- Explain **why**, not **what**.
- Keep comments concise and actionable.
- Remove outdated comments.
- Avoid commented-out code.
- Use your developer identifier as the author prefix.

---

## 5. Formatting

Formatting is enforced automatically.

Do not manually format, align, or wrap code to override workspace tooling.

Workspace standards include:

- EditorConfig
- Prettier
- ESLint
- Stylelint

---

## 6. TypeScript

- Prefer strict typing.
- Prefer `unknown` over `any` where appropriate.
- Avoid `any` unless absolutely necessary.
- Prefer type inference where it improves readability.
- Prefer `readonly` where appropriate.
- Keep types close to where they are used.

---

## 7. Testing

- Write deterministic tests.
- Keep tests independent.
- Prefer readable test names.
- Reuse shared testing utilities where possible.

---

## 8. Dependencies

- Prefer existing workspace utilities before adding dependencies.
- Prefer platform utilities before introducing third-party packages.
- Remove unused dependencies.
- Keep dependencies up to date.
- Minimise transitive dependencies where practical.

---

## 9. Configuration

- Keep configuration files minimal.
- Prefer explicit configuration over implicit behaviour.
- Use consistent naming across repositories.
- Document non-obvious configuration with `NOTE` comments.

---

## 10. Pull Requests

Before submitting code:

- The project builds successfully.
- Type checking passes.
- Linting passes.
- Tests pass.
- Formatting has been applied.
- Dead code has been removed.
- Comments remain accurate.
- Documentation is updated where necessary.

---

## Philosophy

> Build with intention. Design with clarity. Maintain with discipline.
> Stay Hungry. Stay Foolish.

Write code that communicates its intent clearly. Every line should justify its existence, and every comment should explain a decision the code cannot.
