<template>
  <div>
    <myheader />
    <div style="margin:2% 10%;">
      <!-- 基本介绍 -->
      <el-card style="background-color:#fafafa">
        <el-row :gutter="10">
          <!-- 左边区域 -->
          <el-col :span="12">
            <!-- 岗位名称 -->
            <div class="div_update">
              <i class="el-icon-time" />
              <span>更新于 10:42</span>
            </div>
            <div>
              <h2>{{ jobDetails.cen_jobname }}</h2>
            </div>
            <!-- 酬劳 -->
            <div>
              <h3 style="color:#ff424f;font-size:24px;line-height:24px;font-weight:500">15元/小时</h3>
            </div>
            <div>
              <p style="font-size:14px;color:#666666">
                <!-- 用工单位 -->
                <i class="el-icon-s-shop" />
                {{ jobDetails.cen_unit }}
                <el-divider direction="vertical" />
                <!-- 负责老师 -->
                <i class="el-icon-s-custom" />
                {{ jobDetails.username }}
                <el-divider direction="vertical" />
                <!-- 联系电话 -->
                <i
                  class="el-icon-phone-outline"
                />
                {{ jobDetails.phone }}
                <el-divider direction="vertical" />
                <!-- 招收人数 -->
                <i class="el-icon-s-flag" />
                招{{ jobDetails.cen_number }}人
              </p>
            </div>
          </el-col>
          <!-- 右边区域 -->
          <el-col :span="12">
            <!-- 岗位申请 -->
            <el-button :disabled="isApp" @click="approBtn">{{ btnTxt }}</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <!--岗位描述 -->
            <div style="margin-top:5%;">
              <el-divider content-position="left">
                <h style="color: #333;font-size: 16px;font-weight: 700;margin-bottom: 20px;">岗位描述</h>
              </el-divider>

            </div>
            <div>
              <p style="font-size:14px;margin-top:50px;line-height:36px;color:#61687c"><pre>{{ jobDetails.cen_duty }}</pre></p>
            </div>
          </el-col>
          <el-col :span="12">
            <!--岗位要求 -->
            <div style="margin-top:5%;">
              <el-divider content-position="left">
                <h style="color: #333;font-size: 16px;font-weight: 700;margin-bottom: 20px;">岗位要求</h>
              </el-divider>
            </div>
            <div>
              <p style="font-size:14px;margin-top:50px;line-height:36px;color:#61687c"><pre>{{ jobDetails.cen_request }}</pre></p>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <!-- 工作地点 -->
          <el-col :span="12">
            <div>
              <el-divider content-position="left">
                <h style="color: #333;font-size: 16px;font-weight: 700;margin-bottom: 20px;">工作地点</h>
              </el-divider>
              <i class="el-icon-location" />
              <span style="font-size:14px;margin-top:50px;line-height:36px;color:#61687c">{{ jobDetails.cen_address }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <!-- 负责老师 -->
            <div>
              <el-divider content-position="left">
                <h style="color: #333;font-size: 16px;font-weight: 700;margin-bottom: 20px;">负责老师</h>
              </el-divider>
            </div>
            <div>
              <p style="font-size:14px;margin-top:30px;line-height:36px;color:#61687c">
                {{ jobDetails.username }}
                <el-divider direction="vertical" />
                {{ jobDetails.college }}
                <el-divider direction="vertical" />
                {{ jobDetails.phone }}
                <el-divider direction="vertical" />
                {{ jobDetails.email }}
              </p>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>

  </div>
</template>

<script>
import myheader from '@/views/Header'
export default {
  components: { myheader },
  data() {
    return {
      id: 0,
      jobDetails: [],
      btnTxt: '申请岗位',
      isApp: false
    }
  },
  mounted() {
    this.getDetails()
    this.getInit()
  },
  methods: {
    getDetails() {
      this.id = this.$route.params.id
      this.$http.get('recruit/content/view/' + this.id)
        .then(res => {
          const { code, message, data } = res.data
          if (code !== 20000) return this.$message.error(message)
          this.jobDetails = data
          console.log(this.jobDetails)
        })
    },
    getInit() {
      this.$http.get('accept/info/' + this.id)
        .then(res => {
          const { code } = res.data
          if (code === 20000) {
            this.isApp = true
            this.btnTxt = '已申请'
          }
          console.log(code)
        })
    },
    approBtn() {
      this.$router.push({ name: 'appro', params: { id: this.jobDetails.cen_id }})
    }
  }
}
</script>

<style lang="less" scoped>
.div_update{
    color:#9497a1;
    font-size:12px;
    margin-left:8px;
    cursor:pointer;
}
div.div_update:hover{color:#019875}
.el-button--default {
    position:absolute;
    top:100px;
    right:100px;
   font-size: 16px;
    font-weight: 700;
    height: 48px;
    width: 240px;
    color: #ffff;
    background-color: #019875;
  }
</style>
