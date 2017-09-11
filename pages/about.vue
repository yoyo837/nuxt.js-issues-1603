<template>
  <PageContainer doc-title="关于我们" :nav-header="false">
    <el-row class="nav-panel nav-panel-mini">
      <el-col :span="24">
        <span>技术支持：深圳运动帝图科技有限公司</span>
      </el-col>
    </el-row>
    <el-row class="nav-panel nav-panel-mini">
      <el-col :span="24">
        <span>服务网址：
          <a href="http://www.ydmap.com.cn">www.ydmap.com.cn</a>
        </span>
      </el-col>
    </el-row>
    <el-row class="nav-panel nav-panel-mini">
      <el-col :span="24">
        <span>服务电话：
          <a href="tel:0755-83130059">0755-83130059</a>
        </span>
      </el-col>
    </el-row>
    <el-row class="nav-panel nav-panel-mini">
      <el-col :span="24">
        <span>商务合作：
          <a href="mailto:union@ydmap.com.cn">union@ydmap.com.cn</a>
        </span>
      </el-col>
    </el-row>
  </PageContainer>
</template>

<script>
import Vue from 'vue'
import { Row, Col } from 'element-ui'
import PageContainer from './components/PageContainer'
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)

export default {
  name: 'aboutUs',
  components: {
    PageContainer
  }
}
</script>

<style lang="scss" scoped>
.nav-panel {
  color: #666;
  padding: 5px 15px;
}

a {
  text-decoration: underline;
  color: #26a2ff;
}
</style>
