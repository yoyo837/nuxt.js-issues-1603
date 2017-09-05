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
// import SkinApp from '@skin/components/SkinApp.vue'
import SkinApp from '@/layouts/skin.default/components/SkinApp.vue'
// import SkinApp from '#skin/components/SkinApp.vue'
import global from '@/components/global'

export default {
  name: 'app',
  mounted() {
    global(this.$router)
  },
  components: {
    SkinApp
  }
}
</script>

<style lang="scss">
@import '~@/assets/css/skin.default/skin-app.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
