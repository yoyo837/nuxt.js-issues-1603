module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // vue-cli默认
    //'space-before-function-paren': ['error', 'never'],
    // vscode插件Beautify(内部使用js-beautify@https://github.com/beautify-web/js-beautify)
    // 不能完全兼容处理vue文件中的space-before-function-paren，故使用下面的配置
    'space-before-function-paren': ['error', {
      'anonymous': 'ignore',
      'asyncArrow': 'ignore',
      'named': 'never'
    }],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  globals: {}
}
