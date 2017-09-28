const store = {
  get: function(session, key) {
    if (process.browser) {
      return JSON.parse((session ? window.sessionStorage : window.localStorage).getItem(key))
    }
    return null
  },
  put: function(session, key, value, reTry = false) {
    if (process.browser) {
      const st = session ? window.sessionStorage : window.localStorage
      try {
        return st.setItem(key, JSON.stringify(value))
      } catch (error) {
        try {
          st.clear()
        } catch (e) {
          // nothing
          console.log('store.js清理存储失败', [session, key, value, reTry])
        }
        if (reTry === true) { // 避免死循环异常
          return
        }
        // 重新执行一次
        return st.put.apply(this, [session, key, value, true])
      }
    }
  },
  remove: function(session, key) {
    if (process.browser) {
      (session ? window.sessionStorage : window.localStorage).removeItem(key)
    }
  },
  clear: function(session) {
    if (process.browser) {
      (session ? window.sessionStorage : window.localStorage).clear()
    }
  }
}

export default {
  app: {
    get: function(key) {
      return store.get(false, key)
    },
    put: function(key, value) {
      return store.put(false, key, value)
    },
    remove: function(key) {
      return store.remove(false, key)
    },
    clear: function() {
      return store.clear(false)
    }
  },
  session: {
    get: function(key) {
      return store.get(true, key)
    },
    put: function(key, value) {
      return store.put(true, key, value)
    },
    remove: function(key) {
      return store.remove(true, key)
    },
    clear: function() {
      return store.clear(true)
    }
  }
}
