const kIndent = 2

const kBaseBlankLineBetweenStatementsConfig = [
  {
    blankLine: 'always',
    prev: 'block-like',
    next: '*'
  },
  {
    blankLine: 'always',
    prev: 'break',
    next: '*'
  },
  {
    blankLine: 'always',
    prev: ['case', 'default'],
    next: '*'
  },
  {
    blankLine: 'always',
    prev: '*',
    next: 'class'
  },
  {
    blankLine: 'always',
    prev: '*',
    next: 'default'
  },
  {
    blankLine: 'always',
    prev: '*',
    next: 'do'
  },
  {
    blankLine: 'always',
    prev: '*',
    next: 'for'
  },
  {
    blankLine: 'always',
    prev: '*',
    next: 'function'
  },
  {
    blankLine: 'always',
    prev: '*',
    next: 'if'
  },
  {
    blankLine: 'always',
    prev: '*',
    next: 'iife'
  },
  {
    blankLine: 'always',
    prev: '*',
    next: 'switch'
  },
  {
    blankLine: 'always',
    prev: 'case',
    next: 'case'
  },
  {
    blankLine: 'always',
    prev: '*',
    next: 'try'
  },
  {
    blankLine: 'always',
    prev: '*',
    next: 'while'
  }
]
const kBaseRules = {
  'accessor-pairs': 'error',
  'array-callback-return': [
    'error',
    {
      checkForEach: true
    }
  ],
  curly: ['error', 'all'],
  'comma-spacing': [
    'error',
    {
      before: false,
      after: true
    }
  ],
  'consistent-return': 'error',
  'consistent-this': ['error', '$this'],
  'default-case': 'error',
  'default-param-last': 'error',
  'dot-notation': 'error',
  'func-style': [
    'error',
    'declaration',
    {
      allowArrowFunctions: true
    }
  ],
  'grouped-accessor-pairs': ['error', 'getBeforeSet'],
  'guard-for-in': 'error',
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
  'import/no-mutable-exports': 'error',
  'import/no-unresolved': 'off',
  'max-depth': [
    'error',
    {
      max: 5
    }
  ],
  'no-alert': 'error',
  'no-array-constructor': 'error',
  'no-await-in-loop': 'error',
  'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  'no-constructor-return': 'error',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  'no-duplicate-imports': 'error',
  'no-eq-null': 'error',
  'no-eval': 'error',
  'no-extra-bind': 'error',
  'no-floating-decimal': 'error',
  'no-implied-eval': 'error',
  'no-invalid-this': 'error',
  'no-lone-blocks': 'error',
  'no-lonely-if': 'error',
  'no-loop-func': 'error',
  'no-magic-numbers': [
    'error',
    {
      ignore: [-1, 0, 1]
    }
  ],
  'no-mixed-operators': 'error',
  'no-multi-assign': 'error',
  'no-multi-spaces': 'error',
  'no-multi-str': 'error',
  'no-nested-ternary': 'error',
  'no-new': 'error',
  'no-param-reassign': [
    'error',
    {
      props: false
    }
  ],
  'no-promise-executor-return': 'error',
  'no-return-assign': ['error', 'always'],
  'no-return-await': 'error',
  'no-self-compare': 'error',
  'no-sequences': 'error',
  'no-shadow': 'error',
  'no-throw-literal': 'error',
  'no-unmodified-loop-condition': 'error',
  'no-unneeded-ternary': 'error',
  'no-unreachable-loop': 'error',
  'no-unused-expressions': 'error',
  'no-unused-private-class-members': 'error',
  'no-unused-vars': [
    'error',
    {
      varsIgnorePattern: 'exhaustiveCheck'
    }
  ],
  'no-use-before-define': 'error',
  'no-useless-call': 'error',
  'no-useless-computed-key': 'error',
  'no-useless-concat': 'error',
  'no-useless-constructor': 'error',
  'no-useless-rename': 'error',
  'no-useless-return': 'error',
  'no-var': 'error',
  'no-void': 'error',
  'object-shorthand': 'error',
  'padding-line-between-statements': ['error', ...kBaseBlankLineBetweenStatementsConfig],
  'prefer-arrow-callback': 'error',
  'prefer-const': 'error',
  'prefer-numeric-literals': 'error',
  'prefer-regex-literals': [
    'error',
    {
      disallowRedundantWrapping: true
    }
  ],
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
  'prefer-template': 'error',
  quotes: [
    'error',
    'single',
    {
      avoidEscape: true
    }
  ],
  'require-await': 'error',
  'require-unicode-regexp': 'error',
  'spaced-comment': ['error', 'always'],
  'symbol-description': 'error',
  yoda: 'error'
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
    beforeEach: 'readonly',
    beforeAll: 'readonly',
    afterAll: 'readonly'
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
              max: 1
            },
            multiline: {
              max: 1
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
