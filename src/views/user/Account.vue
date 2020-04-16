<template>
  <div>
    <myheader />
    <div style="margin:2% 10%;">
      <el-container>
        <el-aside width="300px">
          <h3>账号设置</h3>
          <router-link tag="div" :to="{path:'/password'}" active-class="activeClass">
            <el-link :underline="false">密码修改</el-link>
          </router-link>
          <router-link tag="div" :to="{path:'/Wechat'}" active-class="activeClass">
            <el-link :underline="false">微信绑定</el-link>
          </router-link>
          <router-link tag="div" :to="{path:'/private'}" active-class="activeClass">
            <el-link :underline="false">隐私设置</el-link>
          </router-link>
        </el-aside>
        <el-main>
          <!-- 路由占位符 -->
          <router-view />
        </el-main>
      </el-container>
    </div>

  </div>
</template>

<script>
import myheader from '@/views/Header'
export default {
  components: { myheader },
  created() {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.el-aside{
    > div{
        display: flex;
        align-items: center;
        justify-content: center;
        width:220px;
        height:60px;
        cursor:pointer//手
    }
    .el-link{
        font-size:16px
    }
}
.activeClass{
    background-color: white;
    border-right:1px solid #019875;
}
</style>
