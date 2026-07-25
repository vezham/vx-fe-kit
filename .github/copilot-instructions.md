# GitHub Copilot Instructions

When generating Git commit messages:

- Follow `commitlint.config.cjs`.
- Do not generate commit messages that would fail Commitlint.
- Use the Conventional Commits format.
- Select the most appropriate scope based on the affected Nx project.
- If multiple projects are modified, prefer `repo` or `workspace` where appropriate.
