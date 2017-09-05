<template>
  <div id="skin-app">
    <slot>
    </slot>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.directive('doc-title', {
  inserted: function(el, binding) {
    document.title = binding.value
  },
  update: function(el, binding) {
    document.title = binding.value
  }
})
export default {
  name: 'skinApp'
}
</script>

<style lang="scss">
@media (min-width:768px) {
  .has-fixed-nav-header {
    padding-top: 0;
  }
  #app {
    margin-top: 0;
    header {
      display: none;
    }
  }
}
</style>
