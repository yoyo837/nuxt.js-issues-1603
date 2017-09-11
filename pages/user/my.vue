<template>
  <div v-doc-title="'用户中心'">
    <ProfilePanel :pic-path="serverData.picPath">
      <template slot="left" v-if="serverData.isFee">
        <span>积分:{{serverData.accountFee}}</span>
      </template>
      <template>
        {{serverData.realName}}/{{serverData.mobile}}
      </template>
      <template slot="right" v-if="serverData.isFee">
        <nuxt-link to="/user/sign">
          <el-button type="primary" size="mini">签到</el-button>
        </nuxt-link>
      </template>
    </ProfilePanel>
    <nuxt-link to="/user/account">
      <el-row class="nav-panel">
        <el-col :span="20">
          <img :src="`${CDN_STATIC_HOST}/themes/mobile/common/images/m_zh.png`">
          <span>我的账户</span>
        </el-col>
        <el-col :span="4" class="text-right">
          <i class="el-icon-arrow-right"></i>
        </el-col>
      </el-row>
    </nuxt-link>
    <nuxt-link to="/orders">
      <el-row class="nav-panel">
        <el-col :span="20">
          <img :src="`${CDN_STATIC_HOST}/themes/mobile/common/images/m_order.png`">
          <span>我的订单</span>
        </el-col>
        <el-col :span="4" class="text-right">
          <i class="el-icon-arrow-right"></i>
        </el-col>
      </el-row>
    </nuxt-link>
    <nuxt-link to="/team/my">
      <el-row class="nav-panel">
        <el-col :span="20">
          <img :src="`${CDN_STATIC_HOST}/themes/mobile/common/images/m_team.png`">
          <span>我的团队</span>
        </el-col>
        <el-col :span="4" class="text-right">
          <i class="el-icon-arrow-right"></i>
        </el-col>
      </el-row>
    </nuxt-link>
    <nuxt-link to="/user/events">
      <el-row class="nav-panel">
        <el-col :span="20">
          <img :src="`${CDN_STATIC_HOST}/themes/mobile/common/images/m_active.png`">
          <span>我的活动</span>
        </el-col>
        <el-col :span="4" class="text-right">
          <i class="el-icon-arrow-right"></i>
        </el-col>
      </el-row>
    </nuxt-link>
    <nuxt-link to="/user/settings">
      <el-row class="nav-panel">
        <el-col :span="20">
          <img :src="`${CDN_STATIC_HOST}/themes/mobile/common/images/m_setup.png`">
          <span>设置</span>
        </el-col>
        <el-col :span="4" class="text-right">
          <i class="el-icon-arrow-right"></i>
        </el-col>
      </el-row>
    </nuxt-link>
    <div class="fixed-bt">
      <el-button type="danger" @click="toLogout">退出/切换账号</el-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Vue from 'vue'
import { Row, Col, Button } from 'element-ui'
import bdStyleMixin, { DefaultConfig } from '../mixins/body-style'
import ProfilePanel from '../components/ProfilePanel'
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Button.name, Button)

export default {
  name: 'my',
  mixins: [bdStyleMixin],
  components: {
    ProfilePanel
  },
  mounted() {
    this.$http.get('/pubUser/my.do').then(data => {
      _.assign(this.serverData, data || {})
    }).catch(() => {

    })
  },
  data() {
    return {
      serverData: {
        id: '',
        wechatId: '',
        isFee: false,
        accountFee: 0,
        picPath: '',
        realName: '--',
        mobile: '--'
      },
      bodyClass: `${DefaultConfig.bodyClass} bd-pt-my`
    }
  },
  methods: {
    toLogout() {
      this.$http.post('/pubUser/logout.do').then(() => {
        this.$router.push('/')
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss">
body.bd-pt-my {
  padding-bottom: 60px;
}
</style>
