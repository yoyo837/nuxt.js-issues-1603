import _ from 'lodash'
import axios from 'axios'
import popup from './popup'
import utils from './utils'
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
  if (--ajaxCounter === 0) {
    popup.loadingClose(myOptions._loadingInstance)
  }
  const resolve = myOptions.resolve
  const reject = myOptions.reject
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
    if (result.code === 401) {
      router.push(`/user/login?redirectURL=${encodeURIComponent(location.href)}`)
    }
  }
}

// 请求拦截
axios.interceptors.request.use(function(config) {
  ajaxCounter++
  const myOptions = config[custOptKey]
  myOptions._loadingInstance = popup.loading()
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
  get(url, params, options = {}) {
    return new Promise(function(resolve, reject) {
      // 合并地址栏参数和对象参数
      const sps = url.split('?')
      const params0 = utils.getPageParams(sps[1] || '')
      _.assign(params0, params)
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
  },
  post(url, params, options = {}) {
    if (options.form == null) { // 默认表单提交
      options.form = true
    }
    if (options.form) { // application/x-www-form-urlencoded format
      const formParams = new URLSearchParams()
      for (var key in params) {
        formParams.append(key, params[key])
      }
      params = formParams
    }
    return new Promise(function(resolve, reject) {
      axios.post(url, params, _.assign(requestConfig, {
        [custOptKey]: _.assign(options, {
          resolve,
          reject
        })
      }))
    })
  }
}