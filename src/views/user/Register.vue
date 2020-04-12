<template>
  <div class="register_container">
    <!-- 注册框 -->
    <div class="register_box">
      <el-row :gutter="10">
        <!-- 左侧 -->
        <el-col :span="14">
          <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" class="register_form">
            <!-- 邮箱地址 -->
            <el-form-item prop="email">
              <el-input v-model="registerForm.email" style="font-size:16px" clearable width:60px placeholder="请输入邮箱地址" />
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input v-model="registerForm.password" style="font-size:16px" clearable type="password" placeholder="请输入密码" show-password />
            </el-form-item>
            <el-row :gutter="10">
              <el-col :span="15">
                <!-- 邮箱激活码 -->
                <el-form-item prop="emailCode">
                  <el-input v-model="registerForm.emailCode" clearable placeholder="请输入邮箱激活码" style="font-size:15px" prefix-icon="el-icon-message" />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-button size="medium" :disabled="btnDisabled" @click="sendEmailCode">{{ btnText }}</el-button>
              </el-col>
            </el-row>
            <el-row :gutter="0">
              <el-col :span="16">
                <el-form-item prop="reader">
                  <div />
                  <el-checkbox-group v-model="registerForm.reader">
                    <el-checkbox label="我已阅读并同意" name="reader" />
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item style="margin-left:-90px">
                  <router-link to="/reader" tag="span" style="color:#019875;cursor:pointer">《助学中心协议》</router-link>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item style="margin-top:-20px">
                  <el-button style="width:50%;letter-spacing:5px;text-align:center" @click="register">注&nbsp&nbsp册</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 右侧 -->
        </el-col>
        <el-col :span="10">
          <div class="register_right">
            <el-row :gutter="10">
              <el-col :span="24">
                <p style="color:#606266">已有助学账号?</p>
              </el-col>
            </el-row>
            <el-row>
              <div>
                <router-link tag="label" to="/login" style="color:#019875;cursor:pointer">立即登录</router-link>
                <i class="el-icon-right" />
              </div>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <div class="register_right_other">
                  <p style="color:#606266">使用以下账号直接登录</p>
                  <el-row :gutter="10">
                    <el-col :span="10">
                      <img src="../../assets/img/weibo.png">
                    </el-col>
                    <el-col :span="10">
                      <img src="../../assets/img/qq.png">
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      // 发送按钮显示对象
      btnText: '获取验证码',
      // 获取验证码按钮状态
      btnDisabled: false,
      // 注册表单的数据绑定对象
      registerForm: {
        email: 'tongfangpingcoder@163.com',
        password: '123456',
        // 阅读并同意
        reader: false,
        // 邮箱验证码
        emailCode: ''
      },
      registerFormRules: {
        // 验证用户名是否合法
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        reader: [
          { required: true, message: '请阅读并勾选协议', trigger: 'blur' }
        ],
        emailCode: [
          { required: true, message: '请输入邮箱激活码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // this.getValidCode()
  },
  methods: {
    // 发送邮箱激活码
    sendEmailCode() {
      if (this.btnDisabled) {
        return
      }
      // 初始化发送倒计时
      this.getSecond(60)
      // 调用获取邮箱验证码的请求的方法
      this.sendNow()
    },
    // 开始发送倒计时
    getSecond(wait) {
      const _this = this
      const _wait = wait
      if (wait === 0) {
        this.btnDisabled = false
        this.btnText = '获取验证码'
        wait = _wait
      } else {
        this.btnDisabled = true
        this.btnText = '验证码(' + wait + 's)'
        wait--
        setTimeout(function() {
          _this.getSecond(wait)
        },
        1000)
      }
    },
    // 发起获取邮箱验证码的请求
    async  sendNow() {
    // 发起发送激活码请求
      await this.$http.post('reg/getCode', {
        email: this.registerForm.email,
        password: this.registerForm.password
      })
        .then(res => {
          console.log(res)
          if (res.data.code !== 20000) return this.$message.error(res.data.message)
          this.$notify({
            title: '发送成功',
            message: '请打开注册时填写的邮箱输入激活码后，即可登录。',
            type: 'success'
          })
          // this.$message.success(res.data.message)
        })
        .catch(err => {
          // console.log(err)
          this.$message.error('网络有问题：' + err)
        })
    },
    // 用户注册
    register() {
      this.$refs.registerFormRef.validate(async valid => {
        if (!this.registerForm.reader) {
          return this.$message.warning('您必须阅读并同意条款!')
        }
        if (!valid) return
        await this.$http.post('reg/register', this.registerForm)
          .then(res => {
          // console.log(res)
            if (res.data.code !== 20000) return this.$message.error(res.data.message)
            this.$notify({
              title: '注册成功',
              message: '请登录后继续完善个人信息。',
              type: 'success'
            })
            this.$router.push('/login')
          // this.$message.success(res.data.message)
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

.register_container {
  height: 100%;
  background-color: #019875;
}
.register_box {
  width: 640px;
  height: 356px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .register_form{
      position: relative;
      margin: 15% 15%;
      width: 85%;
  }
}
.el-button--default {
    font-size: 15px;
    height: 50%;
    color: #ffff;
    background-color: #019875;
  }
.register_right{
    position: relative;
      margin: 15% 15%;
      width: 85%;
}
img{
    position: relative;
    margin-left:20%
}
.register_right_other{
    position: relative;
    margin-top: 20%;
}
.register_box_btm{
    background: url(../../assets/img/login_btm.png) repeat-x; height:10px;
}
</style>
