<template>
  <div class="jigsaw">
    <el-dialog :visible.sync="dialogVisible" class="jigsaw-mobile-wrapper">
      <div class="img-in">
        <img class="bg-img" src="http://necaptcha.nosdn.127.net/d6b1a42d86eb418fb5fd795752bbc517@2x.jpg" alt="滑块">
        <img class="jigsaw-img" src="http://necaptcha.nosdn.127.net/fc2c274ca7b54fa4b95bd59016b00f9d@2x.png" alt="缺块">
      </div>
      <div>
        <!-- <el-slider>123</el-slider> -->
        <mt-range v-model="rangeValue" :min="0" :max="100"></mt-range>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { Dialog } from 'element-ui'
import { Range } from 'mint-ui'
Vue.component(Dialog.name, Dialog)
// Vue.component(Slider.name, Slider)
Vue.component(Range.name, Range)
export default {
  name: 'dialog',
  data() {
    return {
      dialogVisible: true,
      rangeValue: 0
    }
  }
}
</script>
<style lang="scss">
.jigsaw {
  .jigsaw-mobile-wrapper {
    .el-dialog {
      width: 75%;
      .el-dialog__body {
        position: relative;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.jigsaw {
  .img-in {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .bg-img {
      width: 100%;
    }
    .jigsaw-img {
      height: 100%;
    }
  }
}
</style>
