<template>
  <section class="container text-center" v-show="showError">
    <h1 class="title">
      {{ error.statusCode }}
    </h1>
    <h2 class="info">
      {{ error.message }}
    </h2>
    <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
      返回首页
    </nuxt-link>
  </section>
</template>

<script>
import utils from '../components/utils'
export default {
  props: ['error'],
  // head() {
  //   return {
  //     title: this.showError ? '错误' : '处理中...'
  //   }
  // },
  mounted() {
    console.log()
    if (this.error && this.error.statusCode === 404) { // 404
      const mt = /^\/page\/(\d+)$/g.exec(this.$route.path)
      if (mt && mt.length === 2) { // 没有实现此页面
        const query = this.$route.query || {}
        location.replace(`/page.shtml?id=${mt[1]}${Object.keys(query).length > 0 ? '&' : ''}${utils.serialize(query)}`)
        return
      }
    }
    this.showError = true
  },
  data() {
    return {
      showError: false
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/css/app.scss';
@import '~@/assets/css/module/skin-app.scss';
</style>

<style scoped>
.title {
  margin-top: 15px;
  font-size: 5em;
}

.info {
  font-weight: 300;
  color: #9aabb1;
  margin: 20px 0;
}
</style>
