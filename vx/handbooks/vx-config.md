# Vx Config

`vx.config.json` is the app-level source of truth for Vx metadata, PWA assets,
route rules, docs generation, prerender paths, and social metadata.

Keep the app's Vite config thin. App-specific route intent should live in
`vx.config.json`; shared behavior should live in `@vx/config` or `@vx/start`.

> **AI Instructions**
>
> When changing docs apps, preserve Firebase static-hosting compatibility,
> i18n routes, OpenAPI generation, OG images, and LLMS routes unless explicitly
> instructed otherwise.

---

## Location

Each app owns its config at the project root:

```text
apps_internals/playground-docs/vx.config.json
```

The playground docs Vite config should use the shared docs helper:

```ts
import { getVxDocsPrerenderPages } from '@vx/config/docs'

tanstackStart({
  spa: {
    enabled: true,
    prerender: {
      enabled: true,
      crawlLinks: true
    }
  },
  pages: getVxDocsPrerenderPages(__dirname)
})
```

Do not duplicate docs/i18n/static-path discovery in app-local Vite config.

---

## Core

`core` describes the app identity and canonical URL.

```json
{
  "core": {
    "id": "vezham-playground-docs",
    "name": "Vezham Playground Docs",
    "shortName": "Playground Docs",
    "version": "26.0.0-alpha.1",
    "description": "Single app to manage your Vezham Playground Docs",
    "publisher": {
      "name": "Vezham Technologies Private Limited",
      "url": "https://vezham.com"
    },
    "url": "https://playground-docs.vezham.app"
  }
}
```

Use `core.url` for absolute social URLs and canonical metadata.

---

## I18n

`i18n` controls generated localized docs paths.

```json
{
  "i18n": {
    "defaultLanguage": "en",
    "languages": ["en", "cn"]
  }
}
```

Generated docs prerender paths include:

- `/docs`
- default-language docs paths such as `/docs/overview`
- localized roots such as `/en`, `/cn`
- localized docs paths such as `/en/docs/overview`

OpenAPI-generated docs pages are included for each locale.

---

## Docs

`docs` controls the public docs route and its matching generated OG route.

Docs content and OpenAPI inputs use the fixed conventions `content/docs` and
`openapi`, respectively. Fumadocs and Vite need those source paths to be
literal at compile time.

Defaults:

```json
{
  "docs": {
    "docsRoute": "/docs"
  }
}
```

The field is optional. When `docsRoute` is `/guides`, generated docs OG images
are written under `public/og/guides` and the runtime uses `/og/guides`.

---

## Routes

Use top-level `routes` as the single source for route rules and config.

Routes are metadata about URL behavior. They are not the app router itself.

```json
{
  "routes": [
    {
      "path": "/ui-docs/**",
      "source": "docs"
    },
    {
      "path": "/ui-notebook/**",
      "source": "docs"
    },
    {
      "path": "/api/search"
    },
    {
      "path": "/llms-full.txt"
    },
    {
      "path": "/llms.txt"
    }
  ]
}
```

Route path rules:

- `"/ui-docs/**"` with `"source": "docs"` mirrors docs under `/ui-docs`.
- `"/ui-notebook/**"` with `"source": "docs"` mirrors docs under
  `/ui-notebook`.
- Exact paths such as `"/api/search"` are prerendered as-is.
- Text/file paths such as `"/llms.txt"` are prerendered without an `index.html`
  output override.
- Extensionless non-API paths are emitted as `path/index.html` for static
  hosting.

This keeps Firebase/static-hosting compatible URLs for app pages while still
allowing file routes like `/llms.txt`.

### Source

`source` tells Vx where a route rule should get its expanded route list from.

```json
{
  "path": "/ui-docs/**",
  "source": "docs"
}
```

This mirrors the docs source under `/ui-docs`.

For example, docs pages at:

```text
/docs
/docs/overview
/docs/openapi/vezham-demo
```

become:

```text
/ui-docs
/ui-docs/overview
/ui-docs/openapi/vezham-demo
```

Exact routes usually do not need `source`:

```json
{
  "path": "/llms.txt"
}
```

Supported sources:

| Source | Behavior                                         |
| ------ | ------------------------------------------------ |
| `docs` | Expands a `/**` route from generated docs pages. |

Future sources can be added for other route collections, such as blog,
platforms, changelog, or OpenAPI-only pages.

### Prerender

`prerender` is enabled by default for route entries.

```json
{
  "path": "/platforms",
  "prerender": true
}
```

Disable prerender for a route:

```json
{
  "path": "/internal-preview",
  "prerender": false
}
```

Override the emitted HTML path:

```json
{
  "path": "/platforms",
  "prerender": {
    "outputPath": "/platforms/index.html"
  }
}
```

Prefer the default output rules unless the route needs special static-hosting
behavior.

### OG

Docs-sourced mirror globs generate mirrored OG images by default.

```json
{
  "path": "/ui-docs/**",
  "source": "docs"
}
```

For `/ui-docs/overview`, this generates:

```text
public/og/ui-docs/overview/image.png
```

Use `og: false` to skip OG generation for a route.

```json
{
  "path": "/ui-docs/**",
  "source": "docs",
  "og": false
}
```

Use `og: true` to force OG generation where the route supports generated docs
OG output.

```json
{
  "path": "/ui-docs/**",
  "source": "docs",
  "og": true
}
```

Use `og.image` when the route owns a custom image URL and should not receive a
generated mirrored image.

```json
{
  "path": "/platforms",
  "og": {
    "image": "/og/platforms/image.png"
  }
}
```

Use `og.image` instead of `og_url` or `og_image`. The nested object leaves room
for future Open Graph fields without flattening every social property into the
route shape.

---

## OpenAPI

OpenAPI specifications live inside the configured `openapiDir`.

Default:

```text
openapi/
```

The root OpenAPI document should be:

```text
openapi/index.yaml
```

Additional documents can be nested:

```text
openapi/vezham-demo.json
openapi/platform/admin.yaml
```

Document IDs are derived from the relative path without the extension:

| File                         | Document ID      |
| ---------------------------- | ---------------- |
| `openapi/index.yaml`         | `openapi`        |
| `openapi/vezham-demo.json`   | `vezham-demo`    |
| `openapi/platform/admin.yml` | `platform/admin` |

Generated MDX output is written under the docs content directory in
`openapi/**/(generated)`.

Do not keep a root-level `openapi.yaml`. Use the `openapi/` folder so future
apps can add multiple specs without changing the discovery model.

---

## Metadata

`metadata` generates index metadata, platform tags, and social defaults.

```json
{
  "metadata": {
    "title": "Home | Vezham Playground Docs",
    "keywords": ["Vezham Playground Docs"],
    "social": {
      "openGraph": {
        "type": "website",
        "image": "/og/image.png"
      },
      "twitter": {
        "creator": "@vezham",
        "site": "@vezham",
        "card": "summary_large_image",
        "image": "/og/image.png"
      }
    }
  }
}
```

If no social image is provided, Vx falls back to `/og/image.png`.

For docs pages that use the default social image, `@vx/start` maps the page to
the page-specific generated docs OG image.

Examples:

| Route                   | OG image                             |
| ----------------------- | ------------------------------------ |
| `/docs/overview`        | `/og/docs/overview/image.png`        |
| `/ui-docs/overview`     | `/og/ui-docs/overview/image.png`     |
| `/ui-notebook/overview` | `/og/ui-notebook/overview/image.png` |

Use a custom `metadata.social.openGraph.image` only when the app should not use
generated docs page images as the default.

---

## PWA And Branding

`branding` controls browser theme colors.

```json
{
  "branding": {
    "themeColor": "#000000",
    "backgroundColor": "#ffffff"
  }
}
```

`pwa` controls generated manifest fields, icons, screenshots, shortcuts, and
install behavior.

Icon sets can use a path template:

```json
{
  "icons": {
    "path": "icons/icon-{size}x{size}.png",
    "sizes": [48, 72, 96, 128, 192, 384, 512, 1024],
    "type": "image/png"
  }
}
```

Paths are relative to the app's public assets unless they start with `/` or an
absolute URL.

---

## Shared Vite Defaults

Use `defineAppConfig` from `@vx/config/vite` for apps.

```ts
import { defineAppConfig } from '@vx/config/vite'

export default defineAppConfig({
  root: __dirname
})
```

`defineAppConfig` owns:

- app root and Vite cache directory
- `V_` env prefix
- dev server host/port
- preview host/port using `PRE_PORT`, then `PORT`
- prerender preview override when `TSS_PRERENDERING=true`
- TypeScript path aliases from `tsconfig.app.json`
- React dedupe
- React JSX dev runtime build alias
- app build defaults

App-local Vite configs should only keep app-specific plugins and dedupe entries.

---

## Commands

Run docs generation through Nx targets for apps:

```bash
pnpm nx run playground-docs:docs:generate
pnpm nx run playground-docs:og:generate
pnpm nx run playground-docs:metadata:generate
pnpm nx run playground-docs:build
```

The build target depends on metadata and OG generation, so a normal app build
should regenerate required static assets.

---

## Checklist

When adding a future docs app:

- Add `vx.config.json` at the app root.
- Keep docs content in `content/docs`.
- Keep OpenAPI specs in `openapi/`.
- Use `openapi/index.yaml` for the default OpenAPI document.
- Add extra prerender paths to top-level `routes`.
- Use docs mirror globs with `source: "docs"` for alternate docs shells.
- Keep LLMS routes in top-level `routes` when the app exposes them.
- Use `getVxDocsPrerenderPages(__dirname)` in TanStack Start config.
- Use `defineAppConfig` in Vite config.
- Keep app-local Vite config focused on app-only plugins and dedupe.
- Verify typecheck, lint, and build through Nx.
