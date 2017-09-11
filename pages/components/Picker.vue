<template>
  <div class="picker-wrapper">
    <el-input ref="input" placeholder="请选择" :readonly="true" v-model="displayValue"></el-input>
    <el-button type="primary" class="btn-right" @click="showSelect">选择</el-button>
    <mt-popup v-model="visible" popup-transition="popup-fade" position="bottom">
      <el-row class="picker-wrapper-toolbar">
        <el-col :span="12">
          <mt-button size="small" @click="cancel">取消</mt-button>
        </el-col>
        <el-col :span="12" class="text-right">
          <mt-button type="primary" size="small" @click="sure">确定</mt-button>
        </el-col>
      </el-row>
      <mt-picker value-key="label" :slots="slots" @change="onValuesChange">
        <!-- 上面的picker-wrapper-toolbar放到这里show-toolbar="true"就是slot插槽的内容，需要flex布局-->
      </mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import _ from 'lodash'
import Vue from 'vue'
import { Row, Col, Input } from 'element-ui'
import { Popup, Picker, Button } from 'mint-ui'

Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Input.name, Input)
Vue.component(Popup.name, Popup)
Vue.component(Picker.name, Picker)
Vue.component(Button.name, Button)

const separator = ';'

export default {
  name: 'picker',
  props: {
    slots: {
      type: Array,
      default: [],
      required: true
    },
    value: null
  },
  methods: {
    showSelect() {
      this.visible = true
    },
    closeSelect() {
      this.visible = false
    },
    cancel() {
      this.closeSelect()
    },
    emit() {
      // {
      //   key: 0,
      //   label: '身份证'
      // }
      this.$emit('input', this.values.map(item => {
        return item.key
      }).join(separator))
    },
    sure() {
      this.emit()
      this.closeSelect()
    },
    onValuesChange(picker, values) {
      this.values = values.filter(item => {
        return !!item
      })
    }
  },
  computed: {
    displayValue() {
      return this.values.map(item => {
        return item.label
      }).join(separator)
    }
  },
  watch: {
    value(val, oldVal) {
      if (val == null) {
        this.values = []
      } else {
        const list = []
        // {
        //   key: 0,
        //   label: '身份证'
        // }
        const slots = this.slots
        val.toString().split(separator).forEach((item, i) => {
          slots[i].values.some(slot => {
            if (slot.key.toString() === item) {
              list.push(_.cloneDeep(slot))
              return true
            }
            return false
          })
        })
        this.values = list
      }
      this.emit()
    }
  },
  data() {
    return {
      visible: false,
      values: []
    }
  }
}
</script>

<style lang="scss" scoped>
.picker-wrapper {
  .mint-popup {
    width: 100%;
    .picker-wrapper-toolbar {
      padding: 5px;
    }
  }
}
</style>
