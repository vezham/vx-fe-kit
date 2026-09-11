# Code Review

Use the shared ESLint configuration to check automated coding standards:

```bash
# Check a project
pnpm nx run @vx/template:lint

# Apply supported lint autofixes
pnpm nx run @vx/template:lint --fix

# Check all projects with a lint target
pnpm nx run-many -t lint

# Run workspace formatting and lint checks
pnpm nx run @vx:@vx-ws/format

# Apply workspace lint and style autofixes
pnpm nx run @vx:@vx-ws/fix
```

The arrow-function rule in `tools/eslint/` runs through the shared
`eslint.config.mjs`, including editor ESLint diagnostics. The arrow-function
rules exclude `.agents/**`; other applicable lint rules still apply there.

The rule autofixes simple top-level private functions used only in direct calls
and named exported hooks such as `usePosts`. Other exports and ambiguous cases
need manual review. Known exceptions such as generators, overloads, dynamic
`this`, and direct use before declaration are retained. Review the resulting diff
and apply repository formatting after lint autofixes.

Typechecks, tests, and handbook rules requiring judgment remain separate from
linting. Run the relevant Nx targets and review behavior when making changes.
