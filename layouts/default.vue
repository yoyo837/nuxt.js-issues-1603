<template>
  <div id="app">
    <SkinApp>
      <transition>
        <nuxt></nuxt>
      </transition>
    </SkinApp>
  </div>
</template>

<script>
import _ from 'lodash'
import utils from '../components/utils'
import global from '../components/global'
import SkinApp from '../pages/vue-features/components/SkinApp'

const limitPath = '/error/wechat-limit'

export default {
  name: 'app',
  beforeMount() {
    this.$router.beforeResolve((to, from, next) => {
      this.checkAndRouteWeChatLimit(to, from, next)
    })
    global(this.$router)
    this.checkAndRouteWeChatLimit()
  },
  components: {
    SkinApp
  },
  methods: {
    checkAndRouteWeChatLimit(to, from, next) {
      to = to || this.$route
      if (!(to.path === limitPath || utils.isWeiXin())) {
        const serviceInfo = this.$webStore.session.get(this.$webStoreKey.srvInfo)
        // const serviceInfo = {
        //   onlyInWechat: true
        // }
        if (serviceInfo && serviceInfo.onlyInWechat) {
          if (_.isFunction(next)) {
            next(limitPath)
          } else {
            this.$router.push(limitPath)
          }
          return
        }
      }
      if (_.isFunction(next)) {
        next()
      }
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/css/app.scss';
@import '~@/assets/css/module/skin-app.scss';

#app {
  font-family: "Helvetica Neue", "Avenir", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
