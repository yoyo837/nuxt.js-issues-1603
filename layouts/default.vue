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
import SkinApp from '@/pages/components/SkinApp'
import global from '@/components/global'

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
@import '~@skinCss/skin-app.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
