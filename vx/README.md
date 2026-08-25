# Developer Platform

The `vx` directory contains the shared developer platform used across Vezham
repositories. It provides reusable tooling, workspace automation, shared
configurations, and developer resources.

## Architecture

```text
Repositories
      │
      ▼
   @vx/ws 🏗️
      │
      ▼
   @vx/kit 🧰
```

## @vx/kit 🧰

Reusable developer toolkit providing shared scripts, configurations,
utilities, testing helpers, and other reusable developer resources.

## @vx/ws 🏗️

Workspace automation built on top of **@vx/kit**, providing commands for
formatting, linting, testing, releasing, dependency management, and other
workspace operations.

## Handbooks

- [Vx Config](./handbooks/vx-config.md)
- [Coding Standards](./handbooks/coding-standards.md)
- [Release Versioning](./handbooks/release.md)
