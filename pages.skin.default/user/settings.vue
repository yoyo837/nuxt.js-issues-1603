<template>
  <PageContainer doc-title="设置" :nav-header="true" nav-header-back-path="/user/my">
    <nuxt-link to="/user/changepwd">
      <el-row class="nav-panel">
        <el-col :span="20">
          <span>修改密码</span>
        </el-col>
        <el-col :span="4" class="text-right">
          <i class="el-icon-arrow-right"></i>
        </el-col>
      </el-row>
    </nuxt-link>
    <nuxt-link to="/user/profile">
      <el-row class="nav-panel">
        <el-col :span="20">
          <span>个人资料</span>
        </el-col>
        <el-col :span="4" class="text-right">
          <i class="el-icon-arrow-right"></i>
        </el-col>
      </el-row>
    </nuxt-link>
    <nuxt-link to="/user/aboutus">
      <el-row class="nav-panel nav-panel-mg">
        <el-col :span="20">
          <span>关于我们</span>
        </el-col>
        <el-col :span="4" class="text-right">
          <i class="el-icon-arrow-right"></i>
        </el-col>
      </el-row>
    </nuxt-link>
  </PageContainer>
</template>

<script>
import Vue from 'vue'
import { Row, Col } from 'element-ui'
import { Header, Button } from 'mint-ui'
import PageContainer from '../components/PageContainer'
import bdStyleMixin from '../mixins/body-style'

Vue.component(Row.name, Row)
Vue.component(Col.name, Col)

Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
export default {
  name: 'settings',
  mixins: [bdStyleMixin],
  components: {
    PageContainer
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  .el-col {
    line-height: 40px;
  }
}
</style>
