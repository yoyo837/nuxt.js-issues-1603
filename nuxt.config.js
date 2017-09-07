const path = require('path')

module.exports = {
  skin: {
    name: 'default',
    getPagesPath() {
      return path.join(this.options.rootDir, `pages.skin.${this.options.skin.name}`)
    },
    getLayoutsPath() {
      return path.join(this.options.rootDir, `layouts/skin.${this.options.skin.name}`)
    },
    getCssPath() {
      return path.join(this.options.rootDir, `assets/css/skin.${this.options.skin.name}`)
    }
  },
  router: {
    mode: 'hash'
  },
  plugins: [
    '~plugins/global'
  ],
  build: {
    babel: {
      plugins: [
        // 如果使用babel-plugin-component引用成功，则下面全局css则不需要引入
        // (Multiple module with babel-plugin-component)https://github.com/nuxt/nuxt.js/issues/1603
        // ['component', [{
        //   libraryName: 'element-ui',
        //   styleLibraryName: 'theme-default'
        // }, {
        //   libraryName: 'mint-ui',
        //   style: true
        // }]]
      ]
    },
    vendor: [
      'element-ui', 'mint-ui', 'axios', 'moment', 'lodash'
    ],
    // watch: [`pages.${layouts.skinName}/**/*`], 这里watch的内容不会重新初始化容器，只会处理vue源码
    extend(config, {isClient}) {
      const alias = config.resolve.alias = config.resolve.alias || {}
      alias['@skinPages'] = this.options.skin.getPagesPath.apply(this)
      alias['@skinLayouts'] = this.options.skin.getLayoutsPath.apply(this)
      alias['@skinCss'] = this.options.skin.getCssPath.apply(this)
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Portal',
    meta: [
      {
        hid: 'compatible',
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge, chrome=1'
      }, {
        hid: 'charset',
        charset: 'utf-8'
      }, {
        hid: 'viewport',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }, {
        hid: 'description',
        name: 'description',
        content: 'ydmap portal ssr project'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }, {
        rel: 'stylesheet',
        href: '//cdnstatic.ydmap.com.cn/static/normalize.css/7.0.0/normalize.css'
      }
    ],
    script: []
  },
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-default/index.css', // 如果使用babel-plugin-component引用成功，则这里不需要
    'mint-ui/lib/style.css', // 如果使用babel-plugin-component引用成功，则这里不需要
    '~assets/css/app.scss'
  ],
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#3B8070'
  }
}
