<template>
  <PageContainer :doc-title.sync="title" :nav-header="true" nav-header-back-path="/orders">
    <!-- 场地订单 -->
    <div v-if="serverData.dealPlatformList && serverData.dealPlatformList.length" class="ctx-bg list-box">
      <template v-for="(platform, idx) in serverData.dealPlatformList">
        <el-row v-if="idx == 0" class="nav-panel nav-panel-auto" :key="platform.salesName">
          <el-col :span="16">
            <img :src="`${CDN_STATIC_HOST}/themes/mobile/common/images/dicon_1.png`" class="platform-icon"> {{platform.salesName}}
            <i class="el-icon-arrow-right"></i>
          </el-col>
          <el-col :span="8" class="text-right" :class="`state-${platform.dealState}`">
            {{platform.dealStateValue}}
          </el-col>
        </el-row>
      </template>
      <div v-for="platform in serverData.dealPlatformList" :key="platform.id">
        <el-row class="nav-panel nav-panel-auto">
          <el-col :span="8">
            场地
          </el-col>
          <el-col :span="16" class="text-right">
            {{platform.platformParentName}}{{platform.platformName}}
          </el-col>
        </el-row>
        <el-row class="nav-panel nav-panel-auto">
          <el-col :span="8">
            日期
          </el-col>
          <el-col :span="16" class="text-right">
            {{platform.orderDateValue}}
          </el-col>
        </el-row>
        <el-row class="nav-panel nav-panel-auto">
          <el-col :span="8">
            时间
          </el-col>
          <el-col :span="16" class="text-right">
            {{platform.startTimeValue}}-{{platform.endTimeValue}}
          </el-col>
        </el-row>
        <el-row class="nav-panel nav-panel-auto">
          <el-col :span="8">
            价格
          </el-col>
          <el-col :span="16" class="text-right">
            ￥{{platform.platformPriceValue}}
          </el-col>
        </el-row>
        <el-row class="nav-panel nav-panel-auto" v-for="serviceUser in serverData.dealServiceUserList" :key="serviceUser.id" v-if="serviceUser.platformId == platform.platformId">
          <el-col :span="8">
            {{serviceUser.careerIdValue}}
          </el-col>
          <el-col :span="16" class="text-right">
            <div>{{serviceUser.professionalIdValue}}</div>
            {{serviceUser.startTimeValue}}-{{serviceUser.endTimeValue}} ￥{{serviceUser.servicePriceValue}}
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 商品订单 -->
    <div v-if="serverData.dealItemList && serverData.dealItemList.length" class="ctx-bg list-box">
      <div v-for="item in serverData.dealItemList" :key="item.id">
        <div v-for="snapItem in item.dealItemSnapList" :key="snapItem.id">
          <el-row class="nav-panel nav-panel-auto">
            <el-col :span="24">
              {{snapItem.salesName}}
            </el-col>
          </el-row>
          <el-row class="nav-panel nav-panel-auto">
            <el-col :span="8">
              商品
            </el-col>
            <el-col :span="16" class="text-right">
              {{snapItem.itemName}}
            </el-col>
          </el-row>
          <el-row class="nav-panel nav-panel-auto">
            <el-col :span="8">
              数量
            </el-col>
            <el-col :span="16" class="text-right">
              {{snapItem.itemNum}}{{snapItem.itemUnit}}
            </el-col>
          </el-row>
          <el-row class="nav-panel nav-panel-auto" v-if="item.dealAddressList && item.dealAddressList.length">
            <el-col :span="8">
              收货地址
            </el-col>
            <el-col :span="16" class="text-right">
              <div v-for="address in item.dealAddressList" :key="address">
                {{address.provinceValue}}{{address.cityValue}}{{dealAddress.districtValue}}{{dealAddress.detailAddress}}
              </div>
            </el-col>
          </el-row>
          <el-row class="nav-panel nav-panel-auto">
            <el-col :span="8">
              单价
            </el-col>
            <el-col :span="16" class="text-right">
              ￥{{snapItem.itemPriceValue}}
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 会员服务 -->
    <div v-if="serverData.dealServicePubList && serverData.dealServicePubList.length" class="ctx-bg list-box">
      <el-row class="nav-panel nav-panel-auto">
        <el-col :span="24">
          {{serverData.dealServicePubList[0].salesName}}
        </el-col>
      </el-row>
      <div v-for="servicePub in serverData.dealServicePubList" :key="servicePub.id">
        <el-row class="nav-panel nav-panel-auto">
          <el-col :span="8">
            服务名称
          </el-col>
          <el-col :span="16" class="text-right">
            {{servicePub.serviceName}}
          </el-col>
        </el-row>
        <el-row class="nav-panel nav-panel-auto">
          <el-col :span="8">
            数量
          </el-col>
          <el-col :span="16" class="text-right">
            {{servicePub.buyNum}}张
          </el-col>
        </el-row>
        <el-row class="nav-panel nav-panel-auto">
          <el-col :span="8">
            储值金额
          </el-col>
          <el-col :span="16" class="text-right">
            {{servicePub.serviceAmountValue}}
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 报名订单 -->
    <div v-if="serverData.dealSignupList && serverData.dealSignupList.length" class="ctx-bg list-box">
      <div v-for="signup in serverData.dealSignupList" :key="signup.id">
        <el-row class="nav-panel nav-panel-auto">
          <el-col :span="8">
            名称
          </el-col>
          <el-col :span="16" class="text-right">
            {{signup.exerciseList.exerciseName}}
          </el-col>
        </el-row>
        <el-row class="nav-panel nav-panel-auto">
          <el-col :span="8">
            开始日期
          </el-col>
          <el-col :span="16" class="text-right">
            {{signup.exerciseList.startDateValue}}
          </el-col>
        </el-row>
        <el-row class="nav-panel nav-panel-auto">
          <el-col :span="8">
            地址
          </el-col>
          <el-col :span="16" class="text-right">
            {{signup.exerciseList.exerciseAddress}}
          </el-col>
        </el-row>
        <el-row class="nav-panel nav-panel-auto">
          <el-col :span="8">
            状态
          </el-col>
          <el-col :span="16" class="text-right">
            {{signup.dealStateValue}}
          </el-col>
        </el-row>
        <el-row v-if="signup.signupStrValueValue" class="nav-panel nav-panel-auto">
          <el-col :span="8">
            报名信息
          </el-col>
          <el-col :span="16" class="text-right">
            {{signup.signupStrValueValue}}
          </el-col>
        </el-row>
        <el-row v-if="signup.pubUserBasicStr" class="nav-panel nav-panel-auto">
          <el-col :span="8">
            团队信息
          </el-col>
          <el-col :span="16" class="text-right">
            {{signup.pubUserBasicStr}}
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 票务订单 -->
    <div v-if="serverData.dealTicketList && serverData.dealTicketList.length" class="ctx-bg list-box">
      <div v-for="ticket in serverData.dealTicketList" :key="ticket.id">
        <el-row class="nav-panel nav-panel-auto">
          <el-col :span="24">
            {{ticket.salesName}}
          </el-col>
        </el-row>
        <el-row class="nav-panel nav-panel-auto">
          <el-col :span="8">
            票名
          </el-col>
          <el-col :span="16" class="text-right">
            {{ticket.platformParentName ? ticket.platformParentName : ticket.ticketName}}
          </el-col>
        </el-row>
        <el-row class="nav-panel nav-panel-auto">
          <el-col :span="8">
            数量
          </el-col>
          <el-col :span="16" class="text-right">
            {{ticket.salesNum}}
          </el-col>
        </el-row>
        <el-row class="nav-panel nav-panel-auto">
          <el-col :span="8">
            单价
          </el-col>
          <el-col :span="16" class="text-right">
            ￥{{ticket.ticketPriceValue}}
          </el-col>
        </el-row>
        <el-row class="nav-panel nav-panel-auto">
          <el-col :span="8">
            地址
          </el-col>
          <el-col :span="16" class="text-right">
            {{ticket.salesName}}-{{ticket.platformName}}
          </el-col>
        </el-row>
        <el-row class="nav-panel nav-panel-auto" v-if="ticket.platformMapId">
          <el-col :span="8">
            座位号
          </el-col>
          <el-col :span="16" class="text-right">
            {{ticket.platformMapName}}
          </el-col>
        </el-row>
        <template v-if="ticket.orderDate">
          <el-row class="nav-panel nav-panel-auto">
            <el-col :span="8">
              开始日期
            </el-col>
            <el-col :span="16" class="text-right">
              {{ticket.orderDateValue}}
            </el-col>
          </el-row>
          <el-row class="nav-panel nav-panel-auto">
            <el-col :span="8">
              开始时间
            </el-col>
            <el-col :span="16" class="text-right">
              {{ticket.startTimeValue}}
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <el-row class="nav-panel nav-panel-auto">
            <el-col :span="8">
              有效期
            </el-col>
            <el-col :span="16" class="text-right">
              {{ticket.fromDateValue}}至{{ticket.toDateValue}}
            </el-col>
          </el-row>
        </template>
        <el-row class="nav-panel nav-panel-auto">
          <el-col :span="8">
            状态
          </el-col>
          <el-col :span="16" class="text-right">
            {{ticket.dealStateValue}}
          </el-col>
        </el-row>
        <el-row class="nav-panel nav-panel-auto">
          <el-col :span="8">
            验证码
          </el-col>
          <el-col :span="16" class="text-right">
            {{ticket.ticketValidCode}}
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 支付信息 -->
    <div v-if="serverData.commonPay" class="ctx-bg list-box">
      <el-row class="nav-panel nav-panel-auto">
        <el-col :span="24">
          付款信息
        </el-col>
      </el-row>
      <el-row class="nav-panel nav-panel-auto">
        <el-col :span="8">
          订单总价
        </el-col>
        <el-col :span="16">
          ￥{{serverData.commonPay.payFeeTotalValue}}
        </el-col>
      </el-row>
      <el-row v-if="serverData.commonPay.payStatusValue" class="nav-panel nav-panel-auto">
        <el-col :span="8">
          支付状态
        </el-col>
        <el-col :span="16">
          {{serverData.commonPay.payStatusValue}}
        </el-col>
      </el-row>
      <el-row class="nav-panel nav-panel-auto">
        <el-col :span="8">
          实付款
        </el-col>
        <el-col :span="16">
          {{serverData.commonPay.payFeePaidValue}}
        </el-col>
      </el-row>
      <template v-if="serverData.commonPay.payFeePaid">
        <el-row class="nav-panel nav-panel-auto">
          <el-col :span="24">
            支付方式
          </el-col>
        </el-row>
        <el-row v-if="serverData.commonPay.payPointsTotal" class="nav-panel nav-panel-auto">
          <el-col :span="8">
            积分支付
          </el-col>
          <el-col :span="16">
            {{serverData.commonPay.payPointsTotalValue}}分
          </el-col>
        </el-row>
        <el-row v-if="serverData.commonPay.payFeeCash" class="nav-panel nav-panel-auto">
          <el-col :span="8">
            现金支付
          </el-col>
          <el-col :span="16">
            ￥{{serverData.commonPay.payFeeCashValue}}分
          </el-col>
        </el-row>
        <el-row v-if="serverData.commonPay.pubAccountId && serverData.commonPay.payAccountFeeTicket" class="nav-panel nav-panel-auto">
          <el-col :span="8">
            会员/账户支付
          </el-col>
          <el-col :span="16">
            ￥{{serverData.commonPay.payAccountFeeTicketValue}}
          </el-col>
        </el-row>
        <el-row v-if="serverData.commonPay.payZfbCash && serverData.commonPay.payZfbCash && serverData.commonPay.payZfbId" class="nav-panel nav-panel-auto">
          <el-col :span="8">
            支付宝
          </el-col>
          <el-col :span="16">
            ￥{{serverData.commonPay.payZfbCashValue}}
          </el-col>
        </el-row>
        <el-row v-if="serverData.commonPay.payWechatCash && serverData.commonPay.payWechatCash && serverData.commonPay.payWechatId" class="nav-panel nav-panel-auto">
          <el-col :span="8">
            微信支付
          </el-col>
          <el-col :span="16">
            ￥{{serverData.commonPay.payWechatCashValue}}
          </el-col>
        </el-row>
      </template>
      <template v-if="serverData.commonPay.pubServiceAccountId && serverData.commonPay.payServiceAccountFee || serverData.commonPay.payPubServiceData">
        <template v-if="serverData.commonPay.pubServiceAccountId && serverData.commonPay.payServiceAccountFee">
          <el-row class="nav-panel nav-panel-auto">
            <el-col :span="24">
              优惠信息
            </el-col>
          </el-row>
          <el-row class="nav-panel nav-panel-auto">
            <el-col :span="8">
              服务结算
            </el-col>
            <el-col :span="16">
              {{serverData.commonPay.pubServiceName}}
            </el-col>
          </el-row>
          <el-row class="nav-panel nav-panel-auto">
            <el-col :span="8">
              服务账户支付
            </el-col>
            <el-col :span="16">
              已优惠￥{{serverData.commonPay.payServiceAccountFeeValue}}
            </el-col>
          </el-row>
        </template>
        <template v-if="serverData.commonPay.payPubServiceData">
          <el-row class="nav-panel nav-panel-auto">
            <el-col :span="8">
              服务支付
            </el-col>
            <el-col :span="16">
              {{serverData.commonPay.payPubServiceData}}
            </el-col>
          </el-row>
          <el-row class="nav-panel nav-panel-auto">
            <el-col :span="8">
              剩余服务
            </el-col>
            <el-col :span="16">
              {{serverData.commonPay.payPubServiceBalance}}
            </el-col>
          </el-row>
        </template>
      </template>
    </div>

    <!-- 订单信息 -->
    <div v-if="serverData.commonPay" class="ctx-bg list-box">
      <el-row class="nav-panel nav-panel-auto">
        <el-col :span="24">
          订单时间
        </el-col>
      </el-row>
      <el-row class="nav-panel nav-panel-auto">
        <el-col :span="8">
          创建时间
        </el-col>
        <el-col :span="16">
          {{serverData.deal.createTimeValue}}
        </el-col>
      </el-row>
      <el-row class="nav-panel nav-panel-auto">
        <el-col :span="8">
          付款时间
        </el-col>
        <el-col :span="16">
          {{serverData.deal.updateTimeValue}}
        </el-col>
      </el-row>
      <el-row class="nav-panel nav-panel-auto">
        <el-col :span="8">
          成交时间
        </el-col>
        <el-col :span="16">
          {{serverData.deal.updateTimeValue}}
        </el-col>
      </el-row>
    </div>

    <!-- 订单备注 -->
    <div v-if="serverData.deal && serverData.deal.remark" class="ctx-bg list-box">
      <el-row class="nav-panel nav-panel-auto">
        <el-col :span="24">
          订单备注
        </el-col>
      </el-row>
      <el-row class="nav-panel nav-panel-auto">
        <el-col :span="8">
          &nbsp;
        </el-col>
        <el-col :span="16">
          {{serverData.deal.remark}}
        </el-col>
      </el-row>
    </div>
    <div class="fixed-bt">
      <el-button type="danger" v-if="serverData.data && serverData.data.isCancel">取消</el-button>
      <el-button type="warning" v-if="serverData.operationState == 1 || serverData.operationState == 2" @click.stop="toPay">去支付</el-button>
    </div>
  </PageContainer>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
import { Row, Col } from 'element-ui'
import bdStyleMixin, { DefaultConfig } from '../mixins/body-style'
import PageContainer from '../components/PageContainer'
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
export default {
  name: 'order',
  mixins: [bdStyleMixin],
  components: {
    PageContainer
  },
  mounted() {
    this.$http.get('deal/dealDetail.do', {
      dealId: this.orderId
    }).then(data => {
      _.assign(this.serverData, data || {})
    }).catch(() => {
    })
  },
  methods: {
    toPay() {
      this.$router.push(`/pay/${this.orderId}`)
    }
  },
  computed: {
    orderId() {
      return this.$route.params['id']
    },
    title() {
      return `订单详情-${this.orderId}`
    }
  },
  data() {
    return {
      bodyClass: `${DefaultConfig.bodyClass} bd-pt-order`,
      serverData: {
        data: {},
        deal: {},
        dealItemList: null,
        dealPlatformList: null,
        dealTicketList: null,
        dealServiceUserList: null,
        dealServicePubList: null,
        dealSignupList: null
      }
    }
  }
}
</script>

<style lang="scss">
body.bd-pt-order {
  padding-bottom: 60px;
}
</style>

<style lang="scss" scoped>
.state-2 {
  color: #f60;
}

.list-box {
  .nav-panel {
    i {
      color: #aaa;
    }
    .platform-icon {
      width: 18px;
      height: 18px;
      margin: 2px;
    }
  }
}

.list-box~.list-box {
  margin-top: 15px;
}
</style>
