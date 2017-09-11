module.exports = {
  router: {
    mode: 'hash'
  },
  plugins: [
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
    ]
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
