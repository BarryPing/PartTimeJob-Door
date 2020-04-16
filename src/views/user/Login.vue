<template>
  <div class="login_container">
    <!-- 登陆框 -->
    <div class="login_box">
      <el-row :gutter="10">
        <!-- 左侧 -->
        <el-col :span="14">
          <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" style="font-size:16px" clearable width:60px placeholder="请输入学号或邮箱" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" style="font-size:16px" clearable type="password" placeholder="请输入密码" show-password />
            </el-form-item>
            <el-row :gutter="1">
              <el-col :span="14">
                <!-- 验证码 -->
                <el-form-item prop="validcode">
                  <el-input v-model="loginForm.validcode" style="font-size:15px" clearable placeholder="请输入验证码" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <!-- 验证码 显示 -->
                <img :src="imgSrc" style=" height:40px" @click="getvCode">
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col v-if="false" :span="16">
                <el-form-item>
                  <el-checkbox-group v-model="loginForm.remember">
                    <el-checkbox label="记住我" />
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <router-link to="/reset" tag="label" style="color:#606266;cursor:pointer">忘记密码?</router-link>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item style="margin-top:-20px">
                  <el-button style="width:50%;letter-spacing:5px;text-align:center" @click="login">登&nbsp&nbsp录</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 右侧 -->
        </el-col>
        <el-col :span="10">
          <div class="login_right">
            <el-row :gutter="10">
              <el-col :span="24">
                <p style="color:#606266">还没有助学账号?</p>
              </el-col>
            </el-row>
            <el-row>
              <div>
                <router-link tag="label" to="/register" style="color:#019875;cursor:pointer">立即注册</router-link>
                <i class="el-icon-right" />
              </div>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <div class="login_right_other">
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
      <el-row>
        <el-col :span="24">
          <div v-if="false" class="login_box_btm" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      imgSrc: 'http://localhost:8888/api/user/student/validcode',
      // 登录表单的数据绑定对象
      loginForm: {
        username: 'tongfangpingcoder@163.com',
        password: '123456',
        validcode: ''
      },
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入学号或邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        validcode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 设置验证码的url地址
    getvCode() {
      this.imgSrc = this.timestamp(this.imgSrc)
    },
    // 添加获取验证码的url地址时间戳
    timestamp(url) {
      var getTimestamp = new Date().getTime()
      if (url.indexOf('?') > -1) {
        url = url + '&timestamp=' + getTimestamp
      } else {
        url = url + '?timestamp=' + getTimestamp
      }
      return url
    },
    // 登录请求
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return // 校验失败，则返回
        await this.$http.post('user/student/login', this.loginForm)
          .then(res => {
            console.log(res)
            if (res.data.code !== 20000) {
              this.loginForm.validcode = ''
              return this.$message.error(res.data.message)
            }
            this.$message.success(res.data.message)
            const { token } = res.data.data
            console.log(token)
            // 设置用户登录成功
            sessionStorage.setItem('isLogin', 'true')
            // 将登录用户的token放到vuex当中去
            this.$store.dispatch('SET_TOKEN', token)
            this.$router.push('/index')
            return
          })
          .catch(err => {
          // console.log(err)
            return this.$message.error('网络有问题：' + err)
          })
      })
    }

  }
}
</script>

<style lang="less" scoped>

.login_container {
  height: 100%;
  background-color: #019875;
}
.login_box {
  width: 640px;
  height: 346px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .login_form{
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
.login_right{
    position: relative;
      margin: 15% 15%;
      width: 85%;
}
img{
    position: relative;
    margin-left:20%
}
.login_right_other{
    position: relative;
    margin-top: 20%;
}
.login_box_btm{
    background: url(../../assets/img/login_btm.png) repeat-x; height:10px;
}
</style>
