// @ts-check
import withNuxt from './node_modules/.cache/nuxt/.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    semi: 'error',
    'prefer-const': 'warn',
    'no-unused-vars': 'off',
  },
})
