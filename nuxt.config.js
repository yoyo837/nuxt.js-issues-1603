// const fsextra = require('fs-extra')
const sourceMapLoader = ['vue-style-loader', 'css-loader', 'postcss-loader', 'stylus-loader', 'sass-loader', 'less-loader']

function setSourceMapForLoader(rule) {
  if (rule == null) {
    return
  }
  const options = rule.options = rule.options || {}
  if (sourceMapLoader.indexOf(rule.loader) >= 0) {
    options.sourceMap = true
    return
  }
  // vue-loader 和 babel-loader 单独处理
  if (rule.loader === 'babel-loader') {
    rule.options.cacheDirectory = true
    return
  }
  if (rule.loader === 'vue-loader') {
    rule.options.cssSourceMap = true
    if (rule.options.postcss) {
      rule.options.postcss.sourceMap = true
    }
    if (rule.options.loaders) {
      for (var key in rule.options.loaders) {
        const val = rule.options.loaders[key]
        if (val == null) {
          continue
        }
        if (val instanceof Array) {
          val.forEach(item => {
            setSourceMapForLoader(item)
          })
        } else {
          setSourceMapForLoader(val)
        }
      }
    }
  }
}

const ignoreRouter = [/^\/vue-features\//]

module.exports = {
  // devProxy开发接口调用对接地址
  devProxy: 'http://localhost:8082/portal/',
  messages: {
    error_404: '您访问的资源不存在',
    back_to_home: '返回首页',
    server_error: '服务器错误'
  },
  router: {
    extendRoutes(routes) {
      if (routes == null) {
        return
      }
      for (let i = 0; i < routes.length; i++) {
        const item = routes[i]
        ignoreRouter.some(ignore => {
          if (ignore.test(item.path)) {
            routes.splice(i--, 1)
            return true
          }
          return false
        })
      }
    }
  },
  plugins: [
  ],
  cache: true,
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
    extend(config, {isClient}) {
      config.devtool = '#source-map'
      const md = config.module = config.module || {}

      const rules = md.rules = md.rules || []
      rules.forEach(function(rule) {
        if (rule.loader) {
          setSourceMapForLoader(rule)
        } else if (rule.use instanceof Array) {
          rule.use.forEach(r => {
            setSourceMapForLoader(r)
          })
        }
      })
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
        content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
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
    'mint-ui/lib/style.css' // 如果使用babel-plugin-component引用成功，则这里不需要
  ],
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#3B8070'
  }
}
