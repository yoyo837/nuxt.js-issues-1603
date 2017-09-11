<template>
  <el-row class="header-panel text-center">
    <el-col :span="24">
      <img :src.sync="imgUrl">
    </el-col>
    <el-col :span="6" class="text-left">
      <slot name="left">&nbsp;</slot>
    </el-col>
    <el-col :span="12">
      <slot>&nbsp;</slot>
    </el-col>
    <el-col :span="6" class="text-right">
      <slot name="right">&nbsp;</slot>
    </el-col>
  </el-row>
</template>

<script>
// import _ from 'lodash'
import Vue from 'vue'
import utils from '../../components/utils'
import { Row, Col } from 'element-ui'
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
export default {
  name: 'profilePanel',
  props: {
    picPath: {
      type: String,
      default: utils.DEFAULT_USER_AVATAR_PIC_PATH
    }
  },
  data() {
    return {
      imgUrl: `${utils.DEFAULT_USER_AVATAR_PIC_PATH}100X100.jpg`
    }
  },
  watch: {
    picPath(val, oldVal) {
      this.imgUrl = `${(val || utils.DEFAULT_USER_AVATAR_PIC_PATH)}100X100.jpg`
    }
  }
}
</script>

<style lang="scss" scoped>
.header-panel {
  background-color: rgba(32, 160, 255, 0.75);
  padding: 8px;
  color: white;
  img {
    max-width: 40%;
    min-width: 100px;
    min-height: 100px;
    border-radius: 50%;
    border: 5px solid rgba(0, 0, 0, 0.1);
  }
}
</style>

