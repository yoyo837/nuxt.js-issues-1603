import _ from 'lodash'

const CDN_STATIC_HOST = '//cdnstatic.ydmap.com.cn'
const CDN_IMG_HOST = '//cdnimg.ydmap.com.cn'
const DEFAULT_USER_AVATAR_PIC_PATH = `${CDN_IMG_HOST}/publicuser/0/`
const DEFAULT_TEAM_AVATAR_PIC_FULLPATH = `${CDN_STATIC_HOST}/themes/mobile/common/images/team_img.jpg`

function screenSize() {
  if (process.browser) {
    return {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
  }
  return {} // ssr
}

function isWeiXin() {
  if (process.browser) {
    return !!navigator.userAgent.toLowerCase().match(/micromessenger/)
  }
  return false
}
function isiOS() {
  if (process.browser) {
    return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  }
  return false
}

function isMobile() {
  return screenSize().width < 768
}

function serialize(obj) {
  if (_.isPlainObject(obj)) {
    const strs = []
    for (var key in obj) {
      let value = obj[key]
      if (_.isArray(value) || _.isPlainObject(value)) {
        value = JSON.stringify(value)
      }
      strs.push(`${key}=${typeof value === 'undefined' ? '' : encodeURIComponent(value)}`)
    }
    return strs.join('&')
  }
  return ''
}

function getPageParams(search) {
  if (search == null) {
    search = location.search
  }
  if (search.startsWith('?')) {
    search = search.substr(1)
  }
  let params = {}
  if (search) {
    search.split('&').forEach(function(item) {
      let kv = item.split('=')
      params[kv[0]] = kv[1] == null ? '' : decodeURIComponent(kv[1])
    })
  }
  return params
}

export default {
  entryUrl: process.browser ? window.location.href.split('#')[0] : '',
  CDN_STATIC_HOST,
  CDN_IMG_HOST,
  /**
   * 默认头像前缀
   */
  DEFAULT_USER_AVATAR_PIC_PATH,
  /**
   * 默认团队头像
   */
  DEFAULT_TEAM_AVATAR_PIC_FULLPATH,
  /**
   * 把对象序列化为url查询参数字符串
   */
  serialize,
  /**
   * 获取url参数
   */
  getPageParams,
  /**
   * 网页可见区域宽高
   */
  screenSize,
  /**
   * 手机屏幕
   */
  isMobile,
  /**
   * 验证器方法
   */
  validator: {
    isMobile(str) {
      return /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,1,2,3,5-9]))\d{8}$/.test(str)
    }
  },
  isWeiXin,
  isiOS,
  disableBodyScroll() {
    if (process.browser) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      document.body.className += ' no-scroll'
    }
  },
  enableBodyScroll() {
    if (process.browser) {
      document.body.className = document.body.className.split(' ').filter(name => {
        return name.length > 0 && name !== 'no-scroll'
      }).join(' ')
    }
  }
}
