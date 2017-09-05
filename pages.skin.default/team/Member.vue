<template>
  <div v-doc-title="'编辑我的团队信息'">
    <ProfilePanel :pic-path="serverData.loginAccountVo.picPath">
      {{serverData.loginAccountVo.realName}}/{{serverData.loginAccountVo.mobile}}
    </ProfilePanel>
  </div>
</template>

<script>
export default {
  name: 'team-member',
  mounted() {
    this.$http.get('/team/teamMemberInfo.do', {
      teamId: this.teamid,
      professionalId: this.key
    }).then(data => {

    }).catch(() => { })
  },
  data() {
    return {
      teamid: this.$route.query['teamid'],
      key: this.$route.query['key']
    }
  }
}
</script>

<style>

</style>
