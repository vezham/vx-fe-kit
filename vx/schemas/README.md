# Vx configuration schemas

- `vx.app.json`: app framework, metadata, branding, i18n, PWA, docs, routes, and OG configuration.
- `vx.deploy.json`: deployment preset and hosting-provider options.

App configuration files reference these schemas through relative `$schema` paths
so editor validation works offline. Adjust the relative path when creating an
app at a different directory depth.

Each schema is self-contained and uses JSON Schema draft-07. Publish the files
unchanged at their `$id` URLs under `https://vezham.com/schemas/` when hosting is
ready. The `$id` identifies the schema; it does not publish it.

Keep the schemas aligned with `packages/vx/config` when adding or changing
configuration fields. These schemas provide editor validation; the CLI's
existing runtime validation remains separate.
