/** @type {import('stylelint').Config} */
export default {
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended',
    'stylelint-prettier/recommended'
  ],
  rules: {
    'declaration-property-unit-allowed-list': {
      'font-size': ['rem'],
      '/^padding|^gap/': ['rem'],
      '/^animation/': ['ms']
    },
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?(?:--[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$',
      {
        message:
          'Expected class selector to use kebab-case or BEM: block__element--modifier'
      }
    ],
    'unit-allowed-list': ['rem', 'vw', 'oklch', 'deg', '%', 'ms'],
    'color-no-hex': true,
    'color-no-invalid-hex': true,
    'at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['/^tailwind/', 'plugin', 'source', 'custom-variant'] }
    ],
    'hue-degree-notation': 'number',
    'color-function-notation': ['legacy'],
    'no-descending-specificity': null,
    'import-notation': null
  }
}
