import Vue from 'vue'
import ajax from '../components/ajax'
import utils from '../components/utils'

Vue.config.productionTip = false

Vue.prototype.$http = ajax
Vue.prototype.CDN_STATIC_HOST = utils.CDN_STATIC_HOST

export default function (router) {
  ajax.setRouter(router)
}
