import Vue from 'vue'
import utils from './utils'
import {
  Loading,
  MessageBox as EMB
} from 'element-ui'
import {
  Indicator,
  Toast,
  MessageBox as MMB
} from 'mint-ui'

Vue.use(Loading)
Vue.use(Indicator)
Vue.component(EMB.name, EMB)
Vue.component(Toast.name, Toast)
Vue.component(MMB.name)

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

const TOAST_DURATION = 1000 * 3
// export const TOAST_DURATION = 1000 * 3

export default {
  /**
   * 提示
   * @param {string} msg
   * @param {Object} options
   */
  alert(msg, options = {}) {
    coverDefaultOpts(options)
    if (options.isMobile) {
      if (typeof options.callback === 'function') {
        setTimeout(options.callback, TOAST_DURATION)
      }
      return Toast({
        message: msg,
        position: 'bottom',
        duration: TOAST_DURATION
      })
    }
    return EMB.alert(msg, '提示', {
      callback: options.callback
    })
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
  },
  confirm(msg, options = {}) {
    msg = msg || '确定执行此操作?'
    coverDefaultOpts(options)
    if (options.isMobile) {
      return MMB.confirm(msg)
    }
    return EMB.confirm(msg)
  }
}
