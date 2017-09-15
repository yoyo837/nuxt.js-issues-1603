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
import SkinApp from '../pages/vue-features/components/SkinApp'
import global from '../components/global'

export default {
  name: 'app',
  beforeMount() {
    global(this.$router)
  },
  components: {
    SkinApp
  }
}
</script>

<style lang="scss">
@import '~@/assets/css/app.scss';
@import '~@/assets/css/module/skin-app.scss';

#app {
  font-family: "Helvetica Neue","Avenir",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
