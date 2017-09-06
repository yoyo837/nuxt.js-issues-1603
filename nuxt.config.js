// const layouts = require('./layouts').default

module.exports = {
  router: {
    mode: 'hash'
  },
  build: {
    vendor: ['element-ui', 'mint-ui', 'axios', 'moment', 'lodash']
    // 这里watch的内容不会重新初始化容器，只会处理vue源码
    // watch: [`pages.${layouts.skinName}/**/*`]
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
  css: ['~assets/css/app.scss'],
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#3B8070'
  }
}
