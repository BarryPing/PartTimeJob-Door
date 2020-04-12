<template>
  <div>
    <el-header>
      <img src="../assets/img/logo.png">
      <div>
        <el-menu
          router
          :default-active="this.$router.history.current.path"
          mode="horizontal"
          active-text-color="#019875"
        >
          <el-menu-item index="/index">首页</el-menu-item>
          <el-menu-item index="/college">学院</el-menu-item>
          <el-menu-item index="/resume">我的简历</el-menu-item>
          <el-menu-item index="/release">发布职位</el-menu-item>
        </el-menu>
      </div>
      <div v-show="show_login_register">
        <el-button size="mini" @click="toLogin">登录</el-button>
        <el-divider direction="vertical" />
        <el-button size="mini" @click="register">注册</el-button>
      </div>
      <div v-show="show_touxiang" class="touxiang">
        <el-menu mode="horizontal" router>
          <el-submenu index="2">
            <template v-slot:title>
              <span>{{ username }}</span>
              <el-divider direction="vertical" />
              <img src="../assets/img/qq.png">
            </template>
            <el-menu-item index="/profile" style="font-size:15px;">个人中心</el-menu-item>
            <el-menu-item index="/account" style="font-size:15px">账号设置</el-menu-item>
            <el-menu-item style="font-size:15px" @click="logout">退出登录</el-menu-item>
          </el-submenu></el-menu>

        <div />
      </div></el-header>
  </div>

</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      username: '',
      show_touxiang: false,
      show_login_register: true
    }
  },
  mounted() {
    this.initHeader()
  },
  methods: {
    // 初始化
    initHeader() {
      if (this.$store.getters.getToken) {
        this.show_login_register = false
        this.show_touxiang = true
        this.getInfo()
      }
    },
    // 获取个人信息
    async getInfo() {
      // console.log('token=' + this.$store.getters.getToken)
      await this.$http.get('user/student/info')
        .then(res => {
          const { data } = res.data
          // console.log(res)
          if (res.data.code !== 20000) return this.$message.error(res.data.message)
          this.$store.dispatch('asyncUpdateUser', data)
          // 判断如果学号为空则立即跳转到个人信息界面，编辑个人信息
          if (!data.stuid) {
            // console.log('==========')
            this.$router.push('/profile')
          }
          this.username = this.$store.getters.getUser.username
        })
    },
    // 注销登录
    async logout() {
      sessionStorage.clear()
      await this.$http.post('user/student/logout')
      this.$store.dispatch('SET_TOKEN', null)
      this.$store.dispatch('asyncUpdateUser', null)
      this.$router.push('/login')
    },
    // 去登录
    toLogin() {
      this.$router.push('/login')
    },
    // 去注册
    register() {
      this.$router.push('/register')
    }
  }
}
</script>
<style lang="less" scoped>
.el-header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fafafa;
   >img{
       position: absolute;
       right:70%;
   }
   > div {
       position: absolute;
       right:35%;
       + div{
            color: white;
            position: absolute;
            right:20%;

            +div{
            display: flex;
            justify-content:center;
            align-items: center;
            color:#909399;
            position: absolute;
            right:15%;
            font-size: 15px;
            }
       }
    }
}
.el-menu{
    background-color: #fafafa;
    border-bottom:none;
}
.el-menu-item{
    font-size: 20px;
}
.el-button--default {
    font-size: 14px;
    color: #ffff;
    background-color: #019875;
  }
.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
    background-color: #fafafa;
}
</style>
