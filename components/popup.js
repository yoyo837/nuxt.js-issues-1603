import Vue from 'vue'
import utils from './utils'
import {
  Loading,
  MessageBox
} from 'element-ui'
import {
  Indicator,
  Toast
} from 'mint-ui'

Vue.use(Loading)
Vue.use(Indicator)
Vue.component(MessageBox.name, MessageBox)
Vue.component(Toast.name, Toast)

const IndicatorSingle = {
  close() {
    Indicator.close()
  }
}

/**
 * 默认options设置
 * @param {Object} options
 */
function coverDefaultOpts(options) {
  if (options == null) {
    return
  }
  if (options.isMobile == null) {
    options.isMobile = utils.isMobile()
  }
}

export const TOAST_DURATION = 1000 * 3

export default {
  /**
   * 提示
   * @param {string} msg
   * @param {Object} options
   */
  alert(msg, options = {}) {
    coverDefaultOpts(options)
    if (options.isMobile) {
      return Toast({
        message: msg,
        position: 'bottom',
        duration: TOAST_DURATION
      })
    }
    return MessageBox.alert(msg, '提示')
  },
  /**
   * 等待框
   * @param {Object} options
   */
  loading(options = {}) {
    coverDefaultOpts(options)
    if (options.isMobile) {
      Indicator.open()
      return IndicatorSingle // 单例
    }
    // 全屏时返回同一个实例
    return Loading.service({
      fullscreen: options.fullscreen
    })
  },
  /**
   * 关闭等待框
   * @param {Object} instance
   */
  loadingClose(instance) {
    if (instance == null) {
      return
    }
    instance.close()
  }
}
