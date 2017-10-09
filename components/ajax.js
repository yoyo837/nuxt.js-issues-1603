/**
 * nuxt module: @nuxtjs/axios
 * Secure and Easy Axios integration with Nuxt.js.
 * https://github.com/nuxt-community/axios-module
 */
import _ from 'lodash'
import axios from 'axios'
import popup from './popup'
import utils from './utils'
// const nuxtConfig = require('../nuxt.config')
// import router from '../router'
let router

// API版本控制
axios.defaults.baseURL = '/v2'

const custOptKey = 'myOptions'
// 进行中的ajax数量
let ajaxCounter = 0
const defaultCodeMsg = {
  'NaN': '未知错误',
  '0': '与服务器通信失败，请检查网络',
  '302': '跳转中...',
  '404': '您要访问的资源不存在',
  '401': '请先登录后在操作',
  '403': '您未授权访问请求的资源，请联系相关人员后再试'
}
/**
 * 处理响应
 * @param {AxiosResponse} response
 */
function ajaxCover(response) {
  response = response || {}
  let result = response.data
  const config = response.config || {}
  const myOptions = config[custOptKey]
  if (myOptions == null) { // myOptions无值必然没有经过请求拦截的逻辑，相当于初始化也没有
    return
  }
  if (--ajaxCounter === 0) {
    popup.loadingClose(myOptions._loadingInstance)
  }
  const resolve = myOptions.resolve
  const reject = myOptions.reject
  // 只要result是合法的json就不存在需要手动转换的需要，但http异常时result可能直接是异常消息字符串
  // if (_.isString(result)) {
  //   try {
  //     result = JSON.parse(result)
  //   } catch (e) {
  //     reject(e)
  //   }
  // }
  if (!_.isPlainObject(result)) { // 非对象转换成对象
    result = {
      code: response.status,
      msg: result
    }
  }
  result.code = +result.code
  if (result.code === 200) {
    resolve(result.data)
  } else {
    const msg = result.msg || defaultCodeMsg[result.code] || '系统内部错误'
    popup.alert(msg)
    reject(new Error(msg))
    switch (result.code) {
      // case 302:
      //   const redirectURL = (response.headers || {})['Location'.toLowerCase()]
      //   if (redirectURL) {
      //     const isHashUrl = nuxtConfig.router.router && nuxtConfig.router.router.mode === 'hash'
      //     const prefix = `${location.protocol}//${location.host}${isHashUrl ? '/#' : ''}`
      //     if (redirectURL.startsWith(prefix)) {
      //       router.replace(redirectURL.substr(prefix.length))
      //     } else {
      //       location.replace(redirectURL)
      //     }
      //   } else {
      //     popup.alert('302重定向地址无效')
      //   }
      //   break
      case 401:
        router.push(`/user/login?redirectURL=${encodeURIComponent(location.href)}`)
        break
    }
  }
}

// 请求拦截
axios.interceptors.request.use(function(config) {
  ajaxCounter++
  const myOptions = config[custOptKey]
  if (!myOptions.silent) {
    myOptions._loadingInstance = popup.loading()
  }
  return config
}, function(fail) {
  return Promise.reject(fail)
})

// 响应拦截
axios.interceptors.response.use(function(response) {
  ajaxCover(response)
  return response
}, function(fail) {
  ajaxCover(fail.response)
  return Promise.reject(fail)
})

const requestConfig = {
  // baseURL: '/v2'
}

// 对外暴露,提供封装的Promise而不是axios的Promise
export default {
  setRouter(r) {
    if (r == null) {
      return
    }
    if (router == null) {
      router = r
      this.setRouter = () => { }
    }
  },
  /**
   * 获取绝对路径
   * @param {*} url
   */
  getAbstractUrl(url) {
    if (_.isString(url)) {
      return `${axios.defaults.baseURL}${url}`
    }
    return url
  },
  async get(url, params, options = {}) {
    const result = await new Promise(function(resolve, reject) {
      // 合并地址栏参数和对象参数
      const sps = url.split('?')
      const params0 = utils.getPageParams(sps[1] || '')
      _.assign(params0, params)
      const keys = Object.keys(params0)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (params0[key] == null) {
          params0[key] = ''
        }
      }
      const hash = url.split('#')[1]
      const search = utils.serialize(params0)
      url = `${sps[0]}${search.length ? `?${search}` : ''}${hash ? `#${hash}` : ''}`
      axios.get(url, _.assign(requestConfig, {
        [custOptKey]: _.assign(options, {
          resolve,
          reject
        })
      }))
    })
    return result
  },
  async post(url, params, options = {}) {
    if (options.form == null && options.multiForm == null) { // 默认表单提交
      options.form = true
    }
    if (options.form) { // application/x-www-form-urlencoded format
      const formParams = new URLSearchParams()
      for (let key in params) {
        formParams.append(key, params[key] == null ? '' : params[key])
      }
      params = formParams
    } else if (options.multiForm) {
      options.headers = options.headers || {}
      options.headers['Content-Type'] = 'multipart/form-data'
      const formData = new FormData()
      for (let key in params) {
        const value = params[key]
        if (value instanceof Element) {
          formData.append(key, value.files[0]) // 单选文件
        } else {
          formData.append(key, value)
        }
      }
      params = formData
    }
    const result = await new Promise(function(resolve, reject) {
      axios.post(url, params, _.assign(requestConfig, {
        [custOptKey]: _.assign(options, {
          resolve,
          reject
        })
      }))
    })
    return result
  },
  async postJSON(url, params, options = {}) {
    options.form = false
    const result = await this.post(url, params, options)
    return result
  }
}
