const kIndent = 2

const kBaseRules = {
  // error-prevention
  'array-callback-return': [
    'error',
    {
      checkForEach: true
    }
  ],
  'consistent-return': 'error',
  'no-array-constructor': 'error',
  'no-await-in-loop': 'error',
  'no-eval': 'error',
  'no-param-reassign': [
    'error',
    {
      props: false
    }
  ],
  'no-unused-vars': [
    'error',
    {
      varsIgnorePattern: 'exhaustiveCheck'
    }
  ],
  'require-await': 'error',

  // style-consistency / readability
  'comma-spacing': [
    'error',
    {
      before: false,
      after: true
    }
  ],
  'import/order': [
    'error',
    {
      alphabetize: {
        order: 'asc',
        caseInsensitive: true
      },
      'newlines-between': 'never'
    }
  ],
  'import/first': 'error',
  'max-depth': [
    'error',
    {
      max: 5
    }
  ],
  'no-duplicate-imports': 'error',
  'no-floating-decimal': 'error',
  'no-lone-blocks': 'error',
  'no-magic-numbers': [
    'error',
    {
      ignore: [-1, 0, 1]
    }
  ],
  'no-mixed-operators': 'error',
  'no-multi-assign': 'error',
  'no-multi-spaces': 'error',
  'no-nested-ternary': 'error',
  'no-sequences': 'error',
  'no-unneeded-ternary': 'error',
  'no-use-before-define': 'error',
  'no-var': 'error',
  'prefer-const': 'error',
  'prefer-template': 'error',
  quotes: [
    'error',
    'single',
    {
      avoidEscape: true
    }
  ],
  // good-practice
  'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
}

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier-vue/recommended'
  ],
  globals: {
    jest: 'readonly',
    expect: 'readonly',
    it: 'readonly',
    describe: 'readonly',
    before: 'readonly',
    after: 'readonly',
    beforeEach: 'readonly'
  },
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: kBaseRules,
  overrides: [
    {
      files: ['*.vue'],
      plugins: ['vue'],
      extends: ['plugin:vue/vue3-recommended'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: {
          js: 'espree'
        }
      },
      settings: {
        'prettier-vue': {
          SFCBlocks: {
            template: false,
            script: true,
            style: true,
            customBlocks: {
              docs: {
                lang: 'markdown'
              },
              config: {
                lang: 'json'
              },
              module: {
                lang: 'ts'
              },
              comments: false
            }
          },
          usePrettierrc: true,
          fileInfoOptions: {
            ignorePath: '.testignore',
            withNodeModules: false
          }
        }
      },
      rules: {
        'vue/block-spacing': 'error',
        'vue/component-tags-order': [
          'error',
          {
            order: ['template', 'script', 'style']
          }
        ],
        'vue/component-name-in-template-casing': [
          'error',
          'PascalCase',
          {
            registeredComponentsOnly: true,
            ignores: []
          }
        ],
        'vue/custom-event-name-casing': 'off',
        'vue/html-closing-bracket-newline': [
          'error',
          {
            singleline: 'never',
            multiline: 'always'
          }
        ],
        'vue/html-indent': ['error', kIndent],
        'vue/html-self-closing': 'off',
        'vue/max-attributes-per-line': [
          'error',
          {
            singleline: {
              max: 3
            },
            multiline: {
              max: 3
            }
          }
        ],
        'vue/no-deprecated-destroyed-lifecycle': 'off',
        'vue/no-deprecated-events-api': 'off',
        'vue/no-deprecated-slot-attribute': 'off',
        'vue/no-deprecated-v-on-native-modifier': 'off',
        'vue/no-parsing-error': [
          'error',
          {
            'x-invalid-end-tag': false
          }
        ]
      },
      globals: {
        defineProps: true,
        defineEmits: true,
        defineExpose: true,
        useMeta: true
      }
    }
  ]
}
