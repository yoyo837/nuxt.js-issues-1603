/**
 * body样式切换mixin
 */
import _ from 'lodash'

const key = 'data-original-cls'

function toList(str) {
  if (typeof str === 'string') {
    const temp = str.trim()
    if (temp.length) {
      return str.split(' ').filter(item => {
        return !!item.length
      })
    }
  }
  return []
}

export const DefaultConfig = {
  bodyClass: 'bd-bg'
}

export default {
  /**
   * 追加样式
   */
  mounted: function() {
    // const oc = document.body.getAttribute(key)
    // if (oc != null) { // 当两个使用此mixin的页面之间跳转时，新页面的created先于旧页面的beforeDestroy执行
    //   beforeDestroy.apply(this)
    // }
    const clsList = toList(this.bodyClass || DefaultConfig.bodyClass)
    const currentList = toList(document.body.className)
    document.body.setAttribute(key, document.body.className)
    document.body.className = _.union(currentList, clsList).join(' ')
  },
  /**
   * 移除追加
   */
  beforeDestroy: function() {
    // const clsList = toList(this.bodyClass)
    // const currentList = toList(document.body.className)
    // _.remove(currentList, function(item) {
    //   return clsList.some((citem) => {
    //     return citem === item
    //   })
    // })
    // document.body.className = currentList.join(' ')
    const oc = document.body.getAttribute(key)
    document.body.className = oc
    document.body.removeAttribute(key)
  }
}
