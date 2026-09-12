import nx from '@nx/eslint-plugin'
import { ESLint } from 'eslint'
import assert from 'node:assert/strict'
import test from 'node:test'

import button from '../button-on-press.mjs'
import comments from '../comment-style.mjs'
import named from '../named-exports.mjs'
import props from '../props-name.mjs'
import barrel from '../wildcard-barrel.mjs'

const parser = nx.configs['flat/typescript'].find(
  c => c.languageOptions?.parser
).languageOptions.parser
const cases = [
  [
    button,
    "import {Button as B} from '@vezham/react-v3/button'; const X = () => <B onClick={run}/>;",
    1
  ],
  [
    button,
    "import {Button} from '@vezham/react-v3/button'; const X = () => <Button onPress={run}/>;",
    0
  ],
  [
    props,
    "import type { Props } from './types'; interface CreateProviderProps { env: boolean }",
    0
  ],
  [
    props,
    "import type { Props } from './types'; type DocsConfigProps = Props & { docs: boolean }",
    0
  ],
  [
    props,
    "import { BaseProps as Props } from './types'; type DocsConfigProps = Props & { docs: boolean }",
    0
  ],
  [
    props,
    "import type Props from './types'; interface CreateProviderProps { env: boolean }",
    0
  ],
  [
    props,
    "import type { Props as BaseProps } from './types'; type PageProps = BaseProps & { docs: boolean }",
    1
  ],
  [
    props,
    'interface Props { env: boolean }; export type { Props }',
    0,
    { allowExportedProps: true }
  ],
  [
    props,
    'export type Props = { env: boolean }',
    0,
    { allowExportedProps: true }
  ],
  [
    props,
    'type Props = {}; export type { Props as Data }',
    1,
    { allowExportedProps: true }
  ],
  [props, 'type Props = {}; export type { Props, Props as PageProps }', 1],
  [props, 'type Props = {}; export type { Props as Data }', 1],
  [
    button,
    "import {Button} from '@vezham/react-v3'; const X = () => <Button onClick={run}/>;",
    1
  ],
  [
    button,
    "import {Button as B} from '@vezham/react-v3'; const X = () => <B onClick={run}/>;",
    1
  ],
  [
    button,
    "import * as UI from '@heroui/react'; const X = () => <UI.Button onClick={run}/>;",
    1
  ],
  [
    button,
    "import {Button} from '@heroui/react/button'; const X = () => <Button onPress={run}/>;",
    0
  ],
  [
    button,
    "import {Button} from '@vezham/react-v3'; const X = (Button: any) => <Button onClick={run}/>;",
    0
  ],
  [
    button,
    "import {Button} from 'other'; const X = () => <Button onClick={run}/>;",
    0
  ],
  [button, 'const X = () => <button onClick={run}/>;', 0],
  [
    comments,
    '// vx-bot/NOTE: Keep hydration consistent.\n// until ready.\nconst x = 1',
    0
  ],
  [comments, '// wjdlz/NOTE(vx): Keep compatibility.\nconst x = 1', 0],
  [comments, '// plain comment\nconst x = 1', 1],
  [comments, '// codex/NOTE: Keep compatibility.\nconst x = 1', 1],
  [comments, '// vx-bot/NOTE: \nconst x = 1', 1],
  [comments, '// prettier-ignore\nconst x = 1', 0],
  [comments, '/** Public API documentation. */\nconst x = 1', 0],
  [
    comments,
    '// vx-bot/NOTE: First comment.\nconst x = 1\n// unstructured new comment',
    1
  ],
  [named, 'export default () => null', 1],
  [named, 'const A = 1; export { A as default }', 1],
  [named, 'export const A = 1', 0],
  [barrel, "export { A } from './a'; export { B } from './b'", 2],
  [barrel, "export * from './a'", 0],
  [barrel, "export { default as A } from './a'", 0],
  [barrel, "export { A as B } from './a'", 0],
  [barrel, "export const x = 1; export { A } from './a'", 0],
  [
    props,
    'type PageProps = { value: string }; export const Page = (p: PageProps) => null',
    1
  ],
  [
    props,
    'type Props = { value: string }; export const Page = (p: Props) => null',
    0
  ],
  [props, 'export type Props = { value: string }', 1],
  [props, 'export interface Props { value: string }', 1],
  [props, 'export type PageProps = { value: string }', 0],
  [
    props,
    'type Props = { value: string }; export type { Props as PageProps }',
    0
  ],
  [props, 'type PageProps = {}; type ButtonProps = {}', 0],
  [props, 'type Props = {}; export type { Props }', 1]
]
for (const [rule, code, errors, options = {}] of cases) {
  test(`${Object.keys(rule.meta.messages)[0]}: ${code}`, async () => {
    const lint = new ESLint({
      overrideConfigFile: true,
      fix: true,
      overrideConfig: [
        {
          files: ['**/*.tsx'],
          languageOptions: { parser },
          plugins: { vx: { rules: { check: rule } } },
          rules: { 'vx/check': rule === props ? ['error', options] : 'error' }
        }
      ]
    })
    const [result] = await lint.lintText(code, { filePath: 'fixture.tsx' })
    assert.equal(result.errorCount, errors, JSON.stringify(result.messages))
    assert.equal(result.output, undefined, 'Rules must not make unsafe edits')
  })
}

test('shared configuration scopes framework exceptions and agent exclusion', async () => {
  const lint = new ESLint()
  const severity = async (path, rule) =>
    (await lint.calculateConfigForFile(path)).rules[`@vx-lint/${rule}`]?.[0] ??
    0
  for (const path of [
    'apps_internals/playground-app/src/pages/home/index.tsx',
    'apps_internals/play-next/src/vx-pages/pro/index.tsx',
    'apps/example/src/pages/home/index.tsx'
  ]) {
    assert.equal(await severity(path, 'named-exports'), 0)
    assert.equal(await severity(path, 'button-on-press'), 2)
  }
  assert.equal(
    await severity(
      'apps_internals/play-next/src/app/page.tsx',
      'named-exports'
    ),
    0
  )
  assert.equal(
    await severity(
      'packages/vx/template/src/lib/pages/home/index.tsx',
      'named-exports'
    ),
    2
  )
  assert.equal(
    await severity('.agents/skills/example/script.mjs', 'comment-style'),
    0
  )
  assert.equal(
    await severity(
      'packages/vx/template/src/lib/store/index.ts',
      'wildcard-barrel'
    ),
    2
  )
  assert.equal(
    await severity('packages/vx/template/src/index.ts', 'wildcard-barrel'),
    0
  )
})

test('folder-local props exception stays scoped to internal types modules', async () => {
  const lint = new ESLint()
  for (const [filePath, expected] of [
    ['packages/vx/devtools/src/lib/types.ts', 0],
    ['packages/vx/devtools/src/lib/index.tsx', 1],
    ['packages/vx/devtools/src/index.ts', 1]
  ]) {
    const results = await lint.lintText(
      'interface Props { env: boolean }; export type { Props }',
      { filePath }
    )
    assert.equal(
      results[0].messages.filter(m => m.ruleId === '@vx-lint/props-name')
        .length,
      expected
    )
  }
})
