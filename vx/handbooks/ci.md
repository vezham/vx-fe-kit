# CI

---

- sync: ci
- version: 2026-09-22-00:00
- @vx/fe-kit: 26.0.0-alpha.1

# Advisory code audits

Run `pnpm nx run @vx:@vx-ws/audit` to run the pinned Fallow and React Doctor versions.
Reports, logs, and a combined summary are written to `test-output/audit/`.
QA runs this in parallel with the other checks. Both tools must complete with
the configured `minimumScore`; lower or unavailable scores fail the audit job.
Both tools run even if one fails.

The shared `summary-audit` action also publishes counts by category in the job
summary and separate Fallow and React Doctor commit comments on every QA run.
Existing tool comments are updated on reruns. Fallow includes its local average
maintainability score; React Doctor requests its score from its external scoring
API using diagnostic data. Unavailable scores are shown explicitly. These counts do not depend on the
artifact remaining available. Missing or failed audits are shown explicitly.
Commit comments require `contents: write`; commenting failures do not block QA.

`.fallowrc.json` and `doctor.config.json` exclude generated output, caches,
vendored files, and declarations. Intentional app-template and mock duplication
is excluded only from duplication checks. Framework entry points and targeted
false positives are configured separately so authored code remains covered.
React Doctor supply-chain API calls remain disabled.

Review findings before adding suppressions. Do not add these audits to the
formatter; QA enforces the reviewed `minimumScore` baseline.
