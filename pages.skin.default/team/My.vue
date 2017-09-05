<template>
  <div v-doc-title="'我的团队'">
    <ProfilePanel :pic-path="serverData.loginAccountVo.picPath">
      {{serverData.loginAccountVo.realName}}/{{serverData.loginAccountVo.mobile}}
    </ProfilePanel>
    <router-link to="/user/account" v-for="team in serverData.teamList" :key="team.id">
      <el-row class="nav-panel">
        <el-col :span="20">
          <img :src="`${CDN_STATIC_HOST}/themes/mobile/common/images/m_zh.png`">
          <span>{{team.teamName}}</span>
        </el-col>
        <el-col :span="4" class="text-right">
          <i class="el-icon-arrow-right"></i>
        </el-col>
      </el-row>
    </router-link>
    <div class="fixed-bt">
      <router-link to="/team/new">
        <el-button type="danger">创建团队</el-button>
      </router-link>
      <router-link to="/team/search">
        <el-button type="primary">查找团队</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Vue from 'vue'
import { Row, Col, Button } from 'element-ui'
import bdStyleMixin, { DefaultConfig } from '../../layouts/skin.default/mixins/body-style'
import ProfilePanel from '../../layouts/skin.default/components/ProfilePanel'

Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Button.name, Button)

export default {
  name: 'team-my',
  mixins: [bdStyleMixin],
  components: {
    ProfilePanel
  },
  mounted() {
    this.$http.get('/team/myTeamList.do').then(data => {
      // this.serverData.teamList = data.teamList || []
      _.assign(this.serverData, data || {})
    }).catch(() => { })
  },
  data() {
    return {
      bodyClass: `${DefaultConfig.bodyClass} bd-pt-team-my`,
      serverData: {
        loginAccountVo: {},
        teamList: []
      }
    }
  }
}
</script>

<style lang="scss">
body.bd-pt-team-my {
  padding-bottom: 100px;
}
</style>
