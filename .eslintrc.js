module.exports = {
    root: true,
    parser: '@babel/eslint-parser',
    extends: [
      '@react-native-community',
      'plugin:prettier/recommended',
      'eslint-config-antife',
    ],
    plugins: ['prettier', 'react', 'react-native'],
    ignorePatterns: [
      'node_modules/',
      'build/',
      'ios/',
      'android/',
      '**/*.test.js',
    ],
  
    rules: {
      'prettier/prettier': 'error',
      'react/jsx-uses-react': 'off',
      'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }],
      'react-native/no-inline-styles': 'off',
      semi: 'off',
      'intl-mobile/chain-warning': 'off',
      'space-before-function-paren': 0,
      indent: 'off',
    },
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      },
    ],
    overrides: [
      {
        files: ['**/*.js', '**/*.jsx'],
      },
    ],
  }
  