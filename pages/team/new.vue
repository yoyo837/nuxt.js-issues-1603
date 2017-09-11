<template>
  <PageContainer doc-title="创建团队" :nav-header="true" nav-header-back-path="/team/my">
    <el-row class="team-category">
      <el-col :span="6" class="category-item" v-for="item in serverData" :key="item.key">
        <div class="category-content" @click="onSelect(item.key)" :ref="`key-${item.key}`">
          <el-tag type="primary">
            {{item.value}}
          </el-tag>
        </div>
      </el-col>
    </el-row>
  </PageContainer>
</template>

<script>
// import _ from 'lodash'
import Vue from 'vue'
import popop, { TOAST_DURATION } from '../../components/popup'
import { Row, Col, Button, Tag } from 'element-ui'
import PageContainer from '../components/PageContainer'

Vue.component(Tag.name, Tag)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Button.name, Button)

export default {
  name: 'team-new',
  components: {
    PageContainer
  },
  mounted() {
    this.$http.get('/team/teamProfessionalList.do').then(data => {
      this.serverData.splice(0, this.serverData.length)
      this.serverData.push.apply(this.serverData, data || [])

      if (this.defaultKey) {
        // this.$refs[`key-${this.defaultKey}`]
      }
    }).catch(() => { })
  },
  methods: {
    onSelect(key) {
      this.$http.get('/team/checkNeedAddInfo.do', { professionalId: key }).then(data => {
        if (data.pageTag === 'needAddInfo') {
          popop.alert(`${data.pageTagMsg || 'needAddInfo'} 跳转中...`)
          setTimeout(() => {
            this.$router.push(`/team/member?key=${key}`)
          }, TOAST_DURATION)
          return
        }
        this.$router.push(`/team/edit?key=${key}`)
      }).catch(() => { })
    }
  },
  data() {
    return {
      serverData: [],
      defaultKey: this.$route.query['key']
    }
  }
}
</script>

<style lang="scss" scoped>
.team-category {
  .category-item {
    padding: 10px;
    .category-content {
      width: 100%;
      height: 100%;
      text-align: center;
      .el-tag {
        padding: 8px 0;
        height: auto;
        width: 100%;
        cursor: pointer;
        &:active {
          background-color: rgba(32, 160, 255, .3);
        }
      }
    }
  }
}
</style>
