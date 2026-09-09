# GitHub Copilot Instructions

## Commit Messages

- Every generated Git commit message MUST begin with exactly
  `<type>(<scope>): <subject>`.
- The scope is mandatory. Never generate `<type>: <subject>`,
  `<type>(): <subject>`, or a header without both parentheses.
- Follow Conventional Commits and select `<type>` and `<scope>` from
  `commitlint.config.cjs`; do not invent values.
- Select the most appropriate scope based on the affected Nx project.
- Normalize scoped Nx project names to their project segment, such as
  `@vx/start` to `start`.
- For changes affecting two or three Nx projects, use distinct, comma-separated
  scopes without spaces and sort them alphabetically, such as `env,start`.
- Use at most three scopes. For broader changes, use `repo` or `workspace` alone;
  never combine either one with another scope.
- Before returning the message, verify that the first line has a non-empty type,
  a non-empty scope inside parentheses, `: `, and a non-empty subject.
- Do not generate a message that would fail Commitlint.

## Subject

- Keep the subject concise and action-oriented.
- Use imperative mood (e.g. `add`, `fix`, `rename`, `remove`, `update`).
- Preserve the exact casing of technical identifiers (e.g. `V_BASE_API_MODE`, `React`, `Next.js`, `TypeScript`, `@vx/start`) when they improve clarity.
- Do not repeat implementation details already described in the body.

## Body

- Leave a blank line after the header.
- Briefly explain `what changed` and `why`, when useful.
- Use a bullet list for significant changes.
- Mention renamed APIs, types, files, packages, or breaking changes explicitly.

### Example

```text
refactor(env,start): rename V_BASE_API_URL to V_BASE_API_MODE

- update BaseApiMode
- update createEnv
- update Next and Vite wrappers
- simplify eslint configs
```
