import nx from '@nx/eslint-plugin'
import tanstackQuery from '@tanstack/eslint-plugin-query'

// import react from 'eslint-plugin-react'
// import reactHooks from 'eslint-plugin-react-hooks'

const ignores = [
  '**/dist',
  '**/node_modules',
  '**/coverage',
  '**/out-tsc',
  '**/.vezham',
  '**/.nx',
  '**/.lintstagedrc.js',
  '**/routeTree.gen.ts'
]

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...tanstackQuery.configs['flat/recommended'],
  {
    ignores
  },
  {
    ignores: [
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
      '**/test-output'
    ]
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          // ignoredCircularDependencies: [
          //   // ['v-atoms', '*']
          //   // ['v-ions', '*']
          // ],
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*']
            }
          ]
        }
      ]
    }
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs'
    ],
    // Override or add rules here
    rules: {}
  },
  // --- wjdlz/NOTE(vx): skipped for internal tools
  {
    files: ['vx/scripts/**/*.tsx', 'vx/scripts/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },
  {
    files: ['vx/scripts/helpers.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
  // --- wjdlz/TODO: review based on WS
  // {
  //   files: ['**/**/vite.config.ts'],
  //   rules: {
  //     '@typescript-eslint/no-unused-vars': 'off',
  //     'no-unused-vars': 'off'
  //   }
  // },
  // --- * ---
  // @components-store / @hooks-store
  // {
  //   // wjdlz/NOTE: ref - apps_internals/storybook/src/store/blogs/usePosts/index.ts
  //   files: ["**/**/src/store/**/**/*.ts"],
  //   rules: {
  //     "@tanstack/query/exhaustive-deps": "off",
  //     // 'react-hooks/rules-of-hooks': 'off',
  //     // '@nx/enforce-module-boundaries': 'off'
  //   },
  // },
  // {
  //   files: ["**/*.ts"],
  //   rules: {
  //     "react-hooks/rules-of-hooks": "off",
  //     "@tanstack/query/exhaustive-deps": "off",
  //   },
  // },
  // {
  //   plugins: {
  //     // prettier-ignore
  //     'react': react,
  //     'react-hooks': reactHooks
  //   },
  //   files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  //   // Override or add rules here
  //   rules: {
  //     'no-empty-function': 'off',
  //     '@typescript-eslint/no-empty-function': 'off',
  //     'react/jsx-no-useless-fragment': 'off',
  //     '@typescript-eslint/no-empty-object-type': 'off',
  //     'no-empty-object-type': 'off',
  //     // @wjdlz/ESFIX
  //     '@typescript-eslint/no-explicit-any': 'off',
  //     'no-unused-vars': 'off',
  //     '@typescript-eslint/no-unused-vars': 'off',
  //     '@typescript-eslint/no-non-null-assertion': 'off',
  //     // @wjdlz/ESFIX - testing
  //     'react-hooks/exhaustive-deps': 'off',
  //     '@typescript-eslint/no-unsafe-function-type': 'off',
  //     '@typescript-eslint/no-unused-expressions': 'off',
  //     '@typescript-eslint/ban-ts-comment': 'off',
  //     'prefer-const': 'off',
  //     '@typescript-eslint/no-empty-interface': 'off'
  //   }
  // }
  // wjdlz/TODO: set workspace config
]
