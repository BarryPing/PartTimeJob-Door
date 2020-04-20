<template>
  <div>
    <!-- 头部区域 -->
    <myheader />
    <!-- 第一部分 -->
    <div style="margin:2% 10%;">
      <!-- 岗位搜索区域 -->
      <!-- <div style="margin:2% 10%;">
        <el-row>
          <el-col :span="18">
            <el-input v-model="jobName" placeholder="搜索合适的岗位" />
          </el-col>
          <el-col :span="4">
            <el-button @click="toSearch">搜索</el-button>
          </el-col>
        </el-row>
      </div> -->
      <mysearch @func="getSearchJobs" />
      <!-- 岗位分类区域 -->
      <el-row style="margin-top:50px">
        <!-- 左边区域 -->
        <el-col :span="10">
          <el-card class="left-card" :body-style="{ padding: '8px' }">
            <div v-for="(item,index) in jobCate" :key="item.jtId" @mouseenter="isShow(index)" @mouseleave="noShow">
              <el-row>
                <b>{{ item.jtName }}</b>
                <el-link v-for="(subItem,index) in item.children" v-if="index<5" :key="subItem.jtId" :span="8" @click="toCateJob(subItem.jtId)">{{ subItem.jtName }}</el-link>
                <div style="position:absolute;left:330px;color:#C0C4CC">
                  <i class="el-icon-arrow-right" />
                </div>
              </el-row>
            </div>
          </el-card>
        </el-col>
        <!-- 左边隐藏区域 -->
        <div>
          <el-col v-show="show" :span="14" style="position:absolute;z-index: 10;left:385px">
            <el-card>
              <el-row>
                <p style="margin-top:-10px" v-text="jobCate[id].jtName" />
              </el-row>
              <!-- 二级分类:专业 -->
              <el-row v-for="item in jobCate[id].children" :key="item.jtId" :gutter="10">
                <h4 style="color:#8d92a1;font-size:13px;font-weight:400;margin-top:5px">{{ item.jtName }}</h4>
                <el-link v-for="children in item.children" :key="children.jtId" style="margin-left:10%">
                  <span>{{ children.jtName }}</span>
                </el-link>
              </el-row>
            </el-card>
          </el-col>
        </div>
        <!-- 右边区域:部分岗位信息 -->
        <div style="position:absolute;z-index: 0;left:400px">
          <el-row :gutter="10">
            <el-col :span="8">
              <img src="http://ptjobsite.oss-cn-hangzhou.aliyuncs.com/HeadIcon/377c423d-42b9-437c-8c5d-1da8ec1b22c5.png">
            </el-col>
            <el-col :span="8">
              <img src="http://ptjobsite.oss-cn-hangzhou.aliyuncs.com/HeadIcon/c5db1089-39f2-454b-a597-4c2ad2684b41.png">
            </el-col>
            <el-col :span="8">
              <img src="http://ptjobsite.oss-cn-hangzhou.aliyuncs.com/HeadIcon/377c423d-42b9-437c-8c5d-1da8ec1b22c5.png">
            </el-col>

            <el-col :span="8">
              <img src="http://ptjobsite.oss-cn-hangzhou.aliyuncs.com/HeadIcon/c5db1089-39f2-454b-a597-4c2ad2684b41.png">
            </el-col>
            <el-col :span="8">
              <img src="http://ptjobsite.oss-cn-hangzhou.aliyuncs.com/HeadIcon/377c423d-42b9-437c-8c5d-1da8ec1b22c5.png">
            </el-col>
            <el-col :span="8">
              <img src="http://ptjobsite.oss-cn-hangzhou.aliyuncs.com/HeadIcon/c5db1089-39f2-454b-a597-4c2ad2684b41.png">
            </el-col>
          </el-row>
        </div>
      </el-row>
    </div>
    <!-- 岗位列表区域 -->
    <div style="margin:6% 10%;">
      <el-divider content-position="center"><div style="font-size:24px;color:#414a60">{{ jobtxt }}</div></el-divider>
      <el-row>
        <el-col v-for="(item,index) in job" v-if="index<9" :key="item.cen_id" :span="8">
          <el-card class="right-cards" shadow="hover">
            <el-row>
              <!-- 图片区域 -->
              <el-col :span="6">
                <img style="width:45px;height:45px;cursor:pointer;" src="http://ptjobsite.oss-cn-hangzhou.aliyuncs.com/HeadIcon/377c423d-42b9-437c-8c5d-1da8ec1b22c5.png">
              </el-col>
              <!-- 岗位描述区域 -->
              <el-col :span="18">
                <!-- 岗位名称 -->
                <el-row :gutter="10">
                  <el-col :span="24">
                    <span style="font-size:16px;color:#61687c;cursor:pointer;" @click="routeToDetail(item.cen_id)">{{ item.cen_jobname }}</span>
                  </el-col>
                </el-row>
                <p style="font-size:14px;color:#61687c;cursor:pointer;">
                  <!-- 用工单位 -->
                  {{ item.cen_unit }}
                  <el-divider direction="vertical" />
                  <!-- 招聘人数 -->
                  招聘:{{ item.cen_number }}人
                </p>
                <!-- 工钱 -->
                <p style="color:#fc6c38;font-size:16px;cursor:pointer;">15元/小时</p>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import myheader from '@/views/Header'
import mysearch from '@/views/Search'
export default {
  components: { myheader, mysearch },
  data() {
    return {
      show: false,
      // 岗位分类数据
      jobCate: [],
      // 岗位数据
      job: [],
      id: 0,
      jobName: '',
      jobtxt: '热门岗位',
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 9
      }
    }
  },
  mounted() {
    this.getJobCate()
    this.getJob()
  },
  methods: {
    isShow(id) {
      // console.log(id)
      this.id = id
      this.show = true
    },
    noShow() {
      this.show = false
    },
    // 获取职位分类数据
    getJobCate() {
      this.$http.get('recruit/class')
        .then(res => {
          const { code, message, data } = res.data
          if (code !== 20000) return this.$message.error(message)
          this.jobCate = data.categorys
          this.removeChildren(this.jobCate)
          console.log(this.jobCate)
        })
    },
    // 递归删除岗位分类数据当中子节点为空的children对象
    removeChildren(array) {
      array.forEach(element => {
        if (element.children.length === 0) {
          delete element.children
        } else {
          this.removeChildren(element.children)
        }
      })
    },
    // 获取岗位数据
    getJob() {
      this.$http.get('recruit/content', { params: this.queryInfo })
        .then(res => {
          const { code, message, data } = res.data
          if (code !== 20000) return this.$message.error(message)
          console.log(data.infos)
          this.job = data.infos
        })
    },
    // 岗位详情页面路由
    routeToDetail(id) {
      this.$router.push({ name: 'job', params: { id: id }})
    },
    // 跳转分类界面
    toCateJob(id) {
      this.$router.push({ name: 'cateJob', params: { id: id }})
    },
    // 获取搜索子组件传递过来的数据
    getSearchJobs(data) {
      this.job = data
      this.jobtxt = '查询结果'
    }
  }
}
</script>

<style lang="less" scoped>

b{
    font-size:15px;
    color:#414a60;
    font-weight: 600;
}
.left-card{
    width:384px;

    .el-row{
        display: flex;
        align-items: center;
    }
     .el-link{
        display: flex;
        align-items: center;
        height:50px;
        font-size:13px;
        color:#61687c;
        margin-left:10px;
    }
    .el-row:hover{background-color: #00c2b3}
    .el-link:hover{color:white}
}
.right-cards{
    width:360px;
    height:130px;
    margin-top:20px
}
/deep/.el-input__inner {
                height: 48px;
            }
            .el-button--default {
    font-size: 15px;
    width: 140px;
    height: 50px;
    color: #ffff;
    background-color: #019875;
  }
</style>
