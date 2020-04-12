<template>
  <div>
    <el-card :body-style="{ padding: '30px' }">
      <!-- 密码区域 -->
      <el-form ref="passwordFormRef" :model="passwordForm" :rules="passwordFormRules" label-width="80px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="passwordForm.oldPassword" type="password" placeholder="请输入旧密码" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passwordForm.newPassword" type="password" placeholder="设置新密码" />
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassword">
          <el-input v-model="passwordForm.rePassword" type="password" placeholder="确认新密码" />
        </el-form-item>
      </el-form>
      <!-- 按钮区域 -->
      <el-button style="margin-left:80px;background-color:#019875;color:#FFFFFF;width:124px;height:38px" @click="setPassword">确认更改密码</el-button>
    </el-card>
  </div>

</template>

<script>
import { validatePsdReg } from '@/components/rules'

export default {
  data() {
    // 自定义验证两次密码是否相同
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      username: '',
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        rePassword: ''
      },
      passwordFormRules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请设置新密码', trigger: 'blur' },
          { validator: validatePsdReg, trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.username = this.$store.getters.getUser.email
    },
    // 修改密码
    setPassword() {
      this.$refs.passwordFormRef.validate(async valid => {
        if (!valid) return
        await this.$http.put('profile/pwd/' + this.$store.getters.getUser.stuid, {
          'oldPwd': this.passwordForm.oldPassword,
          'newPwd': this.passwordForm.newPassword
        })
          .then(res => {
            console.log(res)
            const { code, message } = res.data
            if (code !== 20000) return this.$message.error(message)
            this.$alert('密码修改成功，请重新登录')
            this.$router.push('/login')
          })
      })
    }
  }

}
</script>

<style lang="less" scoped>

label{
    color:#495060;
    font-size:14px
}
span{
    color:#9fa3b0
}
.el-input{
    width:300px;
    height:34px;
}
</style>
