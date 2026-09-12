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

`unused-imports/no-unused-imports` reports unused imports and removes them with
`--fix`. `unused-imports/no-unused-vars` reports unused variables separately;
update inline suppressions to use this rule name. Prettier handles import order.

The custom rules in `vx/tools/eslint/` run through the shared `eslint.config.mjs`,
including editor ESLint diagnostics. These rules exclude `.agents/**`; other
applicable lint rules still apply there.

| Rule                       | Checks                                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------- |
| `@vx-lint/button-on-press` | Explicit `onClick` on imported HeroUI Button, including import aliases and namespace imports.           |
| `@vx-lint/comment-style`   | Structured developer comment prefixes and non-empty explanations.                                       |
| `@vx-lint/named-exports`   | Default exports in reusable `src` code, with route, Next.js entry, configuration, and story exceptions. |
| `@vx-lint/wildcard-barrel` | Selective, unaliased re-exports in internal `index.ts`/`index.js` barrels.                              |
| `@vx-lint/props-name`      | Private `Props` and descriptive exported props names in component files.                                |

These checks report errors without autofixing: event handlers, exports, type
names, and comment authors require review. Button checks do not trace prop
spreads or wrapper components. Comment checks cannot judge explanation quality
or infer authorship; recognized agent prefixes must use `vx-bot`.
Wildcard checks target barrels below `src/lib` and the `src/components`,
`src/pages`, `src/store`, and `src/hooks` directories. Public `src/index.ts`
entries and intentional aliases remain explicit. Use a documented rule
suppression for a selective public subpath entry inside those directories.

The rule autofixes simple top-level private functions used only in direct calls
and named exported hooks such as `usePosts`. Other exports and ambiguous cases
need manual review. Known exceptions such as generators, overloads, dynamic
`this`, and direct use before declaration are retained. Review the resulting diff
and apply repository formatting after lint autofixes.

Typechecks, tests, and handbook rules requiring judgment remain separate from
linting. Run the relevant Nx targets and review behavior when making changes.
