/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  purge: {
    content: [
      './**/*.vue'
      // other content types mentioned above
    ],
    options: {
      whitelistPatternsChildren: [/token$/],
      whitelist: [
        'pre', 'code', 'prism', 'line-numbers', 'tag', 'toolbar-item', 'toolbar',
        'code-toolbar', 'span', 'button', 'line-numbers-rows', 'url-link', 'attr-name', 'attr-value', 'punctuation',
        'keyword', 'keyword-let', 'operator', 'string'
      ]
    }
  },
  theme: {
    fontFamily: {
      sans: ['Lato']
    }
  },
  variants: {},
  plugins: []
}
