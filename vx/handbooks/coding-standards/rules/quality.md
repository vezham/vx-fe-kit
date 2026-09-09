# Quality Rules

## Formatting

Formatting is enforced automatically.

Do not manually format, align, or wrap code to override workspace tooling.

Workspace standards include:

- EditorConfig
- Prettier
- ESLint
- Stylelint

## TypeScript

- Prefer strict typing.
- Prefer `unknown` over `any` where appropriate.
- Avoid `any` unless absolutely necessary.
- Prefer type inference where it improves readability.
- Prefer `readonly` where appropriate.
- Keep types close to where they are used.

## Testing

- Write deterministic tests.
- Keep tests independent.
- Prefer readable test names.
- Reuse shared testing utilities where possible.

## Dependencies

- Prefer existing workspace utilities before adding dependencies.
- Prefer platform utilities before introducing third-party packages.
- Remove unused dependencies.
- Keep dependencies up to date.
- Minimise transitive dependencies where practical.

## Configuration

- Keep configuration files minimal.
- Prefer explicit configuration over implicit behaviour.
- Use consistent naming across repositories.
- Document non-obvious configuration with `NOTE` comments.

## Pull Requests

Before submitting code:

- The project builds successfully.
- Type checking passes.
- Linting passes.
- Tests pass.
- Formatting has been applied.
- Dead code has been removed.
- Comments remain accurate.
- Documentation is updated where necessary.
