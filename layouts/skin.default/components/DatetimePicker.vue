<template>
  <div>
    <el-input ref="input" placeholder="请选择日期" :readonly="true" v-model="displayValue"></el-input>
    <el-button type="primary" class="btn-right" @click="showSelect">选择</el-button>
    <mt-datetime-picker v-if="type == 'date'" ref="picker" v-model="innerValue" :type="type" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm" :start-date="startDate" :end-date="endDate">
    </mt-datetime-picker>
    <mt-datetime-picker v-if="type == 'datetime'" ref="picker" v-model="innerValue" :type="type" @confirm="handleConfirm">
    </mt-datetime-picker>
    <mt-datetime-picker v-if="type == 'time'" ref="picker" v-model="innerValue" :type="type" @confirm="handleConfirm">
    </mt-datetime-picker>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { Button, Input } from 'element-ui'
import { DatetimePicker } from 'mint-ui'

Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)

export default {
  name: 'myDatetimePicker',
  props: {
    type: {
      type: String,
      default: 'date'
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    value: null // 默认值
  },
  methods: {
    showSelect() {
      this.$refs['picker'].open()
    },
    handleConfirm(val) {
      this.actualValue = val
      this.updateValue()
    },
    updateValue() {
      this.$emit('input', this.actualValue == null ? null : +moment(this.actualValue).format('x'))
    }
  },
  computed: {
    displayValue() {
      if (this.actualValue instanceof Date) {
        return moment(this.actualValue).format('YYYY-MM-DD')
      }
      return this.actualValue
    }
  },
  watch: {
    value(val, oldVal) {
      let temp = val
      if (temp == null) {
        this.innerValue = this.actualValue = null
      }
      if (typeof temp === 'number') {
        temp = moment(temp).toDate()
      }
      // if (typeof temp === 'string') {
      //   temp = moment(temp).toDate()
      // }
      this.innerValue = this.actualValue = temp

      // this.updateValue()
    }
  },
  data() {
    return {
      innerValue: this.value,
      actualValue: this.value
    }
  }
}
</script>
