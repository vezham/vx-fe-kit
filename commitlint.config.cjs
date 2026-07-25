const { createProjectGraphAsync } = require('@nx/devkit')

const types = [
  'feat',
  'fix',
  'perf',
  'refactor',
  'style',
  'docs',
  'test',
  'build',
  'ci',
  'chore',
  'revert',
  'deps',
  'release',
  'i18n',
  'mocks'
  // 'stories',
]

module.exports = async () => {
  const graph = await createProjectGraphAsync()

  // wjdlz/NOTE: Normalize scoped Nx project names
  // eg: feat(@vx/start): ... -> feat(start): ...
  const scopes = [
    'kit',
    'workspace',
    'repo',
    ...Array.from(
      new Set(
        Object.keys(graph.nodes).map(name => name.replace(/^@[^/]+\//, ''))
      )
    ).sort()
  ]

  return {
    extends: ['@commitlint/config-conventional'],
    plugins: ['commitlint-plugin-function-rules'],
    helpUrl:
      'https://storybook.vezham.com/?path=/docs/guidelines-contribution--overview#commit-convention',
    rules: {
      'type-enum': [2, 'always', types],
      'scope-enum': [2, 'always', scopes],
      'scope-case': [2, 'always', 'lower-case'],
      'scope-empty': [2, 'never'],
      'header-max-length': [2, 'always', 120],
      'subject-case': [2, 'always', ['sentence-case', 'lower-case']],
      'body-leading-blank': [2, 'always'],
      'footer-leading-blank': [2, 'always'],
      'body-max-length': [2, 'always', 2500],
      'body-max-line-length': [2, 'always', 2500]
    }
  }
}
