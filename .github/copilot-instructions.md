# GitHub Copilot Instructions

When generating Git commit messages:

- Follow `commitlint.config.cjs`.
- Do not generate commit messages that would fail Commitlint.
- Use the Conventional Commits format.
- Use this header format: `<type>(<scope>): <subject>`.
- Select the most appropriate scope based on the affected Nx project.
- If multiple projects are modified, prefer `repo` or `workspace` where appropriate.

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
refactor(env): rename V_BASE_API_URL to V_BASE_API_MODE

- update BaseApiMode
- update createEnv
- update Next and Vite wrappers
- simplify eslint configs
```
