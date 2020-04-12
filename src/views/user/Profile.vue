<template>
  <div>
    <top />
    <div style="margin:2% 14%;">
      <el-card :body-style="{ padding: '30px' }">
        <el-row :gutter="10">
          <!-- 左边区域 -->
          <el-col :span="19">
            <!-- 更新日期显示区域 -->
            <div>
              <span style="color:#9fa3b0;font-size:12px">最后更新&nbsp{{ dateTime }}</span>
            </div>
            <!-- 姓名区域 -->
            <el-row>
              <el-col :span="24">
                <span class="name">{{ info.username }}</span>
                <i v-if="info.gender===1" style="background-color:rgb(75, 161, 241);border-radius:7px;color:#ffff;font-size:20px" class="el-icon-male" />
                <i v-else style="background-color:rgb(255 181 197);border-radius:7px;color:#ffff;font-size:20px" class="el-icon-female" />
              </el-col>
            </el-row>
            <!-- 第一行 -->
            <el-row :gutter="1">
              <el-col :span="15">
                <!-- 学号 -->
                <i class="el-icon-postcard" />
                <span>{{ info.stuid }}</span>
                <el-divider direction="vertical" />
                <!-- 昵称 -->
                <i class="el-icon-user" />
                <span>{{ info.nickname }}</span>
                <el-divider direction="vertical" />
                <i class="el-icon-location-information" />
                <!-- 学院 -->
                <span>{{ info.college }}</span>
                <el-divider direction="vertical" />
                <!-- 电话 -->
                <i class="el-icon-mobile-phone" />
                <span>{{ info.phone }}</span>
              </el-col>
            </el-row>
            <!-- 第二行 -->
            <el-row :gutter="1" style="margin-top:20px">
              <el-col :span="15">
                <!-- 邮箱 -->
                <i class="el-icon-message" />
                <span>{{ info.email }}</span>
                <el-divider direction="vertical" />
                <!-- 性别 -->
                <i v-if="info.gender===1" class="el-icon-male" />
                <i v-else class="el-icon-female" />
                <span v-if="info.gender===1">男</span>
                <span v-else>女</span>
                <el-divider direction="vertical" />
                <!-- 是否贫困生 -->
                <i class="el-icon-bangzhu" />
                <span v-if="info.needyStudents">贫困生</span>
                <span v-else>非贫困生</span>
                <el-divider direction="vertical" />
                <!-- 成长值 -->
                <i class="el-icon-trophy-1" />
                <span>{{ info.growth }}</span>
              </el-col>
            </el-row>
            <!-- 第三行 -->
            <el-row>
              <el-col :span="24">
                <!-- 个性签名 -->
                <i class="el-icon-edit" />
                <span>{{ info.personalizedSignature }}</span>
              </el-col>
            </el-row>
          </el-col>
          <!-- 右边区域 -->
          <el-col :span="5">
            <img src="../../assets/img/qq.png">
            <el-row />
            <el-row />
            <el-row />
            <el-row />
            <el-row />
            <el-row />
            <el-row>
              <el-col :span="24">
                <i style="color:#00c2b3;font-size:16px;" class="el-icon-edit-outline" />
                <span style="color:#00c2b3;font-size:16px;cursor:pointer" @click="showEditInfoDialog">编辑</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!-- 更新个人信息表单对话框 -->
    <el-dialog
      title="编辑个人信息"
      :visible.sync="InfoFormDialogVisible"
      width="50%"
      center
      @close="editInfoDialogClosed"
    >
      <el-form ref="editInfoFormRef" :model="info" :rules="InfoFormRules" label-position="top" label-width="100px">
        <!-- 姓名与学号 -->
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="姓名" prop="username">
              <el-input v-model="info.username" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学号" prop="stuid">
              <el-input v-model="info.stuid" :disabled="editStuid" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 性别与学院 -->
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-radio v-model="info.gender" :label="1">男</el-radio>
              <el-radio v-model="info.gender" :label="2">女</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学院" prop="college">
              <el-input v-model="info.college" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 手机与邮箱 -->
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="info.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱地址" prop="email">
              <el-input v-model="info.email" :disabled="!editStuid" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 昵称 -->
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="info.nickname" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 个性签名 -->
        <el-row :gutter="0">
          <el-col :span="24">
            <el-form-item label="个性签名" prop="personalizedSignature">
              <el-input v-model="info.personalizedSignature" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="InfoFormDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editInfo">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Header from '@/views/Header'
import { validateNumber,
  checkName,
  numberLength,
  checkSpecificKey,
  validatePhone,
  validateEMail
} from '@/components/rules'
export default {
  components: {
    'top': Header
  },
  data() {
    return {
      // 更新个人信息时间
      dateTime: '2020.04.03 13:15',
      info: {},
      // 更新个人信息对话框显示对象
      InfoFormDialogVisible: false,
      // 表单验证规则对象
      InfoFormRules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        stuid: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' },
          { validator: numberLength, trigger: 'blur' }
        ],
        college: [
          { required: true, message: '请输入学院名称', trigger: 'blur' },
          { validator: checkSpecificKey, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { validator: validateEMail, trigger: 'blur' }
        ],
        personalizedSignature: [
          { required: true, message: '请输入个性签名', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { validator: checkSpecificKey, trigger: 'blur' }
        ]
      },
      // 学号输入框是否禁用
      editStuid: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.info = this.$store.getters.getUser
      if (!this.info.stuid) {
        this.editStuid = false
        this.$alert('请先完善个人信息')
        this.InfoFormDialogVisible = true
      }
      console.log(this.info)
    },
    // 监听修改个人信息对话框关闭
    editInfoDialogClosed() {
      this.$refs.editInfoFormRef.resetFields()
    },
    // 展示修改信息对话框
    showEditInfoDialog() {
      this.InfoFormDialogVisible = true
    },
    // 提交修改信息
    editInfo() {
      this.$refs.editInfoFormRef.validate(async valid => {
        if (!valid) return
        await this.$http.post('profile/update', this.info)
          .then(res => {
            console.log(res)
            const { code, message, data } = res.data
            if (code !== 20000) return this.$message.error(message)
            this.$message.success(message)
            this.$store.dispatch('asyncUpdateUser', data)
            this.init()
            this.InfoFormDialogVisible = false
          })
          .catch(err => {
          // console.log(err)
            this.$message.error('网络有问题：' + err)
          })
      })
    }

  }
}
</script>

<style lang="less" scoped>

span.name{
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 20px;
}
span{
    font-size:15px;
    color:#414a60
}
.el-card{
    .el-row{
        margin-top:20px
    }
}

</style>
