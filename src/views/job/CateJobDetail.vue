<template>
  <div>
    <div style="margin:2% 10%;">
      <el-card v-for="item in cateJobList" :key="item.cenId" :body-style="{ padding: '10px' }">
        <el-row :gutter="10">
          <!-- 左边 -->
          <el-col :span="20">
            <el-row>
              <p style="float:left;margin-right:10px;cursor:pointer;" @click="toJobDetail(item.cenId)">{{ item.cenJobname }}</p>
              <p>[{{ item.cenAddress }}]</p>
              <span style="color:#fc703e;font-size:16px">15元/小时</span>
              <el-divider direction="vertical" />
              <span style="color:#61687c;font-size:14px">6课时/周</span>
              <el-divider direction="vertical" />
              <span style="color:#61687c;font-size:14px">招{{ item.cenNumber }}人</span>
              <p style="color:#8d92a1;font-size:13px">发布于{{ item.cenDate }}</p>
            </el-row>
          </el-col>
          <!-- 右边 -->
          <el-col :span="4">
            <p>{{ item.cenUnit }}</p>
            <span style="color:#61687c;font-size:14px">{{ item.cenAuthor }}</span>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      cateJobList: []
    }
  },
  watch: {
    '$route': {
      handler(to) {
        // to：目标路由对象
        this.init()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // console.log('++++++++++++++++++++')
      this.id = this.$route.params.id
      this.$http.get('recruit/catejob/' + this.id)
        .then(res => {
          const { code, message, data } = res.data
          if (code !== 20000) return this.$message.error(message)
          this.cateJobList = data
          console.log(this.cateJobList)
        })
    },
    // 跳转详情页
    toJobDetail(id) {
      console.log(id)
      this.$router.push({ name: 'job', params: { id: id }})
    }
  }
}
</script>

<style lang="less" scoped>
.el-card{
    width:824px;
    height:130px;
    margin-top:20px;

    p{
        font-size:16px;
        color:#019875;
    }
}
</style>
