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
                <h2 style="color: #333;font-size: 16px;font-weight: 700;margin-bottom: 20px;">岗位描述</h2>
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
                <h2 style="color: #333;font-size: 16px;font-weight: 700;margin-bottom: 20px;">岗位要求</h2>
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
                <h2 style="color: #333;font-size: 16px;font-weight: 700;margin-bottom: 20px;">工作地点</h2>
              </el-divider>
              <i class="el-icon-location" />
              <span style="font-size:14px;margin-top:50px;line-height:36px;color:#61687c">{{ jobDetails.cen_address }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <!-- 负责老师 -->
            <div>
              <el-divider content-position="left">
                <h2 style="color: #333;font-size: 16px;font-weight: 700;margin-bottom: 20px;">负责老师</h2>
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
      <!-- 岗位申请对话框 -->
      <el-dialog
        v-loading="loading"
        element-loading-text="岗位申请处理中，请稍后......"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        title="岗位申请"
        :visible.sync="approDialogVisible"
        width="50%"
        @close="handleClose"
      >
        <el-form ref="approFormRef" :model="approForm" :rules="ApproFormRules" label-width="80px" label-position="top">
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input v-model="approForm.name" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学号">
                <el-input v-model="approForm.atStuid" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="班级" prop="atStuclass">
                <el-input v-model="approForm.atStuclass" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="寝室" prop="atStudorm">
                <el-input v-model="approForm.atStudorm" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="银行" prop="atStubank">
                <template>
                  <el-select v-model="approForm.atStubank" placeholder="请选择">
                    <el-option
                      v-for="item in banks"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="困难类型" prop="atStudiff">
                <template>
                  <el-select v-model="approForm.atStudiff" placeholder="请选择">
                    <el-option
                      v-for="item in diffs"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </template>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="身份证号" prop="atStuidcard">
            <el-input v-model="approForm.atStuidcard" />
          </el-form-item>
          <el-form-item label="银行卡号" prop="atStubankcard">
            <el-input v-model="approForm.atStubankcard" />
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="info" @click="approDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="approSubmit">提交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import myheader from '@/views/Header'
import { validateNumber,
  validateIdNo,
  checkSpecificKey
} from '@/components/rules'
export default {
  components: { myheader },
  data() {
    return {
      id: 0,
      jobDetails: [],
      btnTxt: '申请岗位',
      isApp: false,
      approDialogVisible: false,
      loading: false,
      // 岗位申请表单数据对象
      approForm: {
        // 学号
        atStuid: this.$store.getters.getUser.stuid,
        // 姓名
        name: this.$store.getters.getUser.username,
        // 身份证号
        atStuidcard: '',
        // 班级
        atStuclass: '',
        // 寝室
        atStudorm: '',
        // 银行
        atStubank: '',
        // 银行卡号
        atStubankcard: '',
        // 困难类型
        atStudiff: '',
        // 岗位ID
        atJobid: 0
      },
      // 困难类型选择器
      diffs: [{
        value: '非困难',
        label: '非困难'
      }, {
        value: '一般困难',
        label: '一般困难'
      }, {
        value: '特别困难',
        label: '特别困难'
      }],
      // 银行类型选择器
      banks: [{
        value: '农业银行',
        label: '农业银行'
      },
      {
        value: '工商银行',
        label: '工商银行'
      },
      {
        value: '建设银行',
        label: '建设银行'
      }],
      ApproFormRules: {
        atStuidcard: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' },
          { validator: validateIdNo, trigger: 'blur' }
        ],
        atStuclass: [
          { required: true, message: '请输入所在班级', trigger: 'blur' },
          { validator: checkSpecificKey, trigger: 'blur' }
        ],
        atStudorm: [
          { required: true, message: '请输入所在寝室', trigger: 'blur' },
          { validator: checkSpecificKey, trigger: 'blur' }
        ],
        atStubank: [
          { required: true, message: '请选择银行', trigger: 'blur' }
        ],
        atStudiff: [
          { required: true, message: '请选择困难类型', trigger: 'blur' }
        ],
        atStubankcard: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getDetails()
    this.getInit()
  },
  methods: {
    getDetails() {
      this.id = this.$route.params.id
      this.approForm.atJobid = this.id
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
          console.log(res)
        })
    },
    approBtn() {
      this.approDialogVisible = true
    },
    handleClose() {
      this.$refs.approFormRef.resetFields()
    },
    // 提交岗位申请
    approSubmit() {
      this.loading = true
      console.log(this.approForm)
      this.$http.post('accept/info/add', this.approForm)
        .then(res => {
          this.loading = false
          const { code, message } = res.data
          if (code !== 20000) {
            return this.$notify.error({
              title: '失败',
              message: message
            })
          }
          this.$notify({
            title: '成功',
            message: '您的岗位申请成功',
            type: 'success'
          })
          this.approDialogVisible = false
          this.isApp = true
          this.btnTxt = '已申请'
        })
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
