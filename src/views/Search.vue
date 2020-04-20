<template>
  <div>
    <!-- 岗位搜索区域 -->
    <div style="margin:2% 10%;">
      <el-row>
        <el-col :span="18">
          <el-input v-model="jobName" placeholder="搜索合适的岗位" />
        </el-col>
        <el-col :span="4">
          <el-button @click="toSearch">搜索</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      jobName: ''
    }
  },
  methods: {
    // 搜索
    toSearch() {
      this.$http.get('recruit/searchjobs', { params: { jobName: this.jobName }})
        .then(res => {
          const { code, message, data } = res.data
          if (code !== 20000) return this.$message.error(message)
          this.$emit('func', data)
          console.log(res)
        })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-input__inner {
                height: 48px;
                font-size: 16px;
            }
            .el-button--default {
    font-size: 15px;
    width: 140px;
    height: 50px;
    color: #ffff;
    background-color: #019875;
  }
</style>
