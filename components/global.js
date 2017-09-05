import Vue from 'vue'
import ajax from './ajax'
import utils from './utils'

export default function (router) {
  Vue.config.productionTip = false

  ajax.setRouter(router)
  Vue.prototype.$http = ajax
  Vue.prototype.CDN_STATIC_HOST = utils.CDN_STATIC_HOST
}
