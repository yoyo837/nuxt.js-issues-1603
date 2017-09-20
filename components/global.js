import Vue from 'vue'
import ajax from '../components/ajax'
import utils from '../components/utils'

Vue.config.productionTip = false

Vue.prototype.$http = ajax
Vue.prototype.CDN_STATIC_HOST = utils.CDN_STATIC_HOST
Vue.prototype.CDN_IMG_HOST = utils.CDN_IMG_HOST

Vue.prototype.$wxConfig = async function (url, throwError) {
  if (typeof url === 'boolean') {
    throwError = url
    url = null
  }
  if (utils.isWeiXin()) {
    await this.$http.get('/pubUser/getJsConfig.do', {
      url: url || (utils.isiOS ? utils.entryUrl : (process.browser ? window.location.href.split('#')[0] : ''))
    })
  } else {
    if (throwError) {
      throw new Error('请在微信中运行该功能')
    }
    await {}
  }
}

export default function (router) {
  ajax.setRouter(router)
}
