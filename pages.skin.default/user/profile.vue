<template>
  <div v-doc-title="'用户中心'">

    <ProfilePanel :pic-path="serverData.picPath">
      {{serverData.realName}}/{{serverData.mobile}}
    </ProfilePanel>

    <el-form ref="form" :model="serverData" :rules="rules" label-width="80px" class="ctx-bg mintui-style">
      <el-form-item label="姓名" prop="realName">
        <el-input v-model="serverData.realName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="serverData.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机" prop="mobile" required>
        <el-input v-model="serverData.mobile" :readonly="true"></el-input>
        <el-button type="primary" class="btn-right" @click="changeMbl">更改</el-button>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <DatetimePicker type="date" v-model="serverData.birthday" :start-date="startDate" :end-date="endDate"></DatetimePicker>
      </el-form-item>
      <el-form-item label="证件类型" prop="idcardType">
        <Picker ref="picker" :slots="certificates" v-model="serverData.idcardType"></Picker>
      </el-form-item>
      <el-form-item label="证件号码" prop="idcard">
        <el-input v-model="serverData.idcard"></el-input>
      </el-form-item>
    </el-form>

    <div class="fixed-bt">
      <el-button type="danger" @click="submitForm">保存设置</el-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import Vue from 'vue'
import ProfilePanel from '../components/ProfilePanel'
import DatetimePicker from '../components/DatetimePicker'
import bdStyleMixin, { DefaultConfig } from '../mixins/body-style'
import Picker from '../components/Picker'
import { Form, FormItem, Button, Input, RadioGroup, Radio } from 'element-ui'

Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(Radio.name, Radio)

const staticSlotList = [{
  // defaultIndex静态数据不起作用，组件bug
  // defaultIndex: 2,
  values: [{
    key: 0,
    label: '身份证'
  }, {
    key: 1,
    label: '护照'
  }, {
    key: 2,
    label: '驾驶证'
  }, {
    key: 3,
    label: '其他'
  }]
}]

export default {
  name: 'profile',
  mixins: [bdStyleMixin],
  components: {
    ProfilePanel,
    Picker,
    DatetimePicker
  },
  mounted() {
    this.$http.get('/pubUser/userInfo.do').then(data => {
      data = data || {}
      // _.merge(data, _.cloneDeep(defServerData))
      _.assign(this.serverData, data)
    }).catch(() => {
    })

    // setInterval(() => {
    //   console.log(this.serverData.birthday, this.serverData.idcardType)
    // }, 1000 * 3)
  },
  methods: {
    changeMbl() {
      this.$router.push('/user/changembl')
    },
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$http.post('/pubUser/updateUserInfo.do', {
            realName: this.serverData.realName,
            gender: this.serverData.gender,
            birthday: this.serverData.birthday,
            idcardType: this.serverData.idcardType,
            idcard: this.serverData.idcard
          }).then(() => {
            this.$router.push('/user/my')
          }).catch(() => {
          })
        }
        return false
      })
    }
  },
  data() {
    return {
      startDate: moment().subtract(100, 'years').toDate(),
      endDate: moment().toDate(),
      bodyClass: `${DefaultConfig.bodyClass} bd-pt-user-profile`,
      certificates: staticSlotList,
      rules: {
        realName: [{
          required: true, message: '请填写姓名', trigger: 'blur'
        }],
        gender: [{
          required: true, message: '请选择性别'
        }],
        birthday: [{
          required: true, message: '请选择生日'
        }],
        idcardType: [{
          required: true, message: '请选择证件类型', trigger: 'blur'
        }],
        idcard: [{
          required: true, message: '请填写证件号码', trigger: 'blur'
        }]
      },
      serverData: {
        realName: null,
        mobile: null,
        gender: 0,
        idcard: null,
        birthday: null
      }
    }
  }
}
</script>

<style lang="scss">
body.bd-pt-user-profile {
  padding-bottom: 60px;
}
</style>
