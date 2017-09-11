<template>
  <PageContainer doc-title="签到" :nav-header="true" nav-header-back-path="/user/my">
    <el-row class="text-center sign-title">
      <el-col :span="24">
        <span>每日签到</span>
      </el-col>
    </el-row>
    <el-row class="text-center sign-tody">
      <el-col :span="24">
        <img :src="`${CDN_STATIC_HOST}/themes/mobile/red/red1/images/ji-${this.serverData.sameDay == 0 ? '1' : '0'}.png`">
        <div class="day-points">{{serverData.fee}}</div>
        <div class="day-th">第{{serverData.totalDay}}天</div>
      </el-col>
    </el-row>
    <el-row class="text-center bonus-points">
      <el-col :span="24">
        <span>当前总积分:
          <span class="points">{{serverData.accountFee}}</span>
        </span>
      </el-col>
    </el-row>
    <el-row class="text-center sign-operation">
      <el-col :span="24">
        <mt-button type="primary" v-if="serverData.sameDay == 0" @click="toSign">签到</mt-button>
        <mt-button type="primary" v-else :disabled="true">已签到</mt-button>
      </el-col>
    </el-row>
    <el-dialog title="短信验证码发送" :visible="visible" class="portal-dialog" :class="{'portal-dialog-mobile': isMbl, 'no-bg':true}">
      <mt-button class="cust-btn">
        <!-- <img src="../assets/100x100.png" height="20" width="20" slot="icon">  -->
        <img :src="`${CDN_STATIC_HOST}/themes/mobile/red/red1/images/jif.gif`">
        <span>第{{serverData.totalDay}}天+{{serverData.fee}}分</span>
      </mt-button>
    </el-dialog>
  </PageContainer>
</template>

<script>
import _ from 'lodash'
import Vue from 'vue'
import utils from '../../components/utils'
import { Row, Col, Dialog } from 'element-ui'
import { Header, Button } from 'mint-ui'
import PageContainer from '../components/PageContainer'

Vue.component(Dialog.name, Dialog)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)

Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
export default {
  name: 'sign',
  components: {
    PageContainer
  },
  mounted() {
    this.$http.get('/pubUser/userSignin.do').then(data => {
      // test
      // data.sameDay = 0
      _.assign(this.serverData, data || {})
    }).catch(() => {

    })
  },
  methods: {
    toSign() {
      this.$http.post('/pubUser/addFee.do').then(() => {
        this.visible = true
        setTimeout(() => {
          this.serverData.sameDay = 1
          this.visible = false
          this.$router.push('/user/my')
        }, 1000)
      }).catch(() => {

      })
    }
  },
  data() {
    return {
      serverData: {
        accountFee: null,
        fee: null,
        sameDay: 1, // 0 是没有签
        totalDay: 0
      },
      visible: false,
      isMbl: utils.isMobile()
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-title {
  color: #888;
  border-bottom: 1px solid #f5f5f5;
  padding: 20px 0;
}

.sign-tody {
  padding: 30px 0;
  .el-col {
    position: relative;
    .day-points {
      position: absolute;
      top: calc(50% - 13px);
      width: 100%;
      height: 26px;
      line-height: 26px;
      color: #fff;
      font-weight: bold;
      font-size: 22px;
      text-shadow: 1px 1px 1px #999;
    }
  }
}

.bonus-points {
  font-size: 15px;
  span {
    color: #888;
  }
  .points {
    color: #1cc2b4;
    font-size: 16px;
  }
}

.sign-operation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  button {
    width: 100%;
  }
}

.cust-btn {
  width: 100%;
  background-color: #1ac1b3;
  box-shadow: none;
  border-radius: 20px;
  height: auto;
  color: white;
  img {
    vertical-align: middle;
  }
  span {
    float: right;
    margin-top: 40px;
  }
}
</style>

<style lang="scss">
.portal-dialog.no-bg {
  .el-dialog {
    background-color: transparent;
    box-shadow: none;
    .el-dialog__header {
      button {
        i {
          display: none;
        }
      }
    }
  }
}
</style>

