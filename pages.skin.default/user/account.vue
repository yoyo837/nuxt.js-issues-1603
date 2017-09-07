<template>
  <PageContainer doc-title="我的账户" :nav-header="true" nav-header-back-path="/user/my">
    <el-row>
      <el-col :span="24">
        <img :src="`${CDN_STATIC_HOST}/themes/mobile/common/images/deal_s.png`">
        <span>我的账户</span>
      </el-col>
      <el-col :span="24" class="ctx-bg">
        <span>账号余额:
          <span class="money">{{serverData.amountAvail}}</span>(元)
        </span>
      </el-col>
    </el-row>
    <el-row v-if="serverData.isFee">
      <el-col :span="24">
        <img :src="`${CDN_STATIC_HOST}/themes/mobile/common/images/fee_s.png`">
        <span>我的积分</span>
      </el-col>
      <el-col :span="24" class="ctx-bg">
        <span>剩余积分:
          <span class="money">{{serverData.accountFee}}</span>(分)
        </span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <img :src="`${CDN_STATIC_HOST}/themes/mobile/common/images/fw_style.png`">
        <span>优惠服务</span>
      </el-col>
      <el-col :span="24" v-for="item in serverData.pubServiceAccountVoList" :key="item.id" class="ctx-bg">
        {{item.serviceName}}
      </el-col>
    </el-row>
  </PageContainer>
</template>

<script>
import _ from 'lodash'
import Vue from 'vue'
import bdStyleMixin from '../mixins/body-style'
import { Row, Col } from 'element-ui'
import { Header, Button } from 'mint-ui'
import PageContainer from '../components/PageContainer'

Vue.component(Row.name, Row)
Vue.component(Col.name, Col)

Vue.component(Header.name, Header)
Vue.component(Button.name, Button)

export default {
  mixins: [bdStyleMixin],
  name: 'account',
  components: {
    PageContainer
  },
  mounted() {
    this.$http.get('/pubUser/pubAccount.do').then(data => {
      _.assign(this.serverData, data || {})
    }).catch(() => {

    })
  },
  data() {
    return {
      serverData: {
        isFee: false,
        accountFee: 0,
        amountAvail: 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.money {
  color: #FF6B1D;
  vertical-align: baseline;
  font-size: 15px;
}

.el-row {
  font-size: 13px;
  padding: 5px;
  .el-col {
    padding: 8px;
    height: 46px;
    line-height: 30px;
    img {
      height: 20px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
  .el-col {
    &:first-child {
      height: 36px;
      line-height: 20px;
      background-color: rgba(218, 218, 218, 0.5);
    }
  }
}
</style>
