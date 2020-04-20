<template>
  <div>
    <myheader />
    <!-- 搜索条 -->
    <!-- <mysearch /> -->
    <div style="margin:2% 10%;">
      <div style="width:100%;height:50px;background-color:#019875;display: flex;align-items: center;justify-content:center;">
        <router-link v-for="item in childrenCate" :key="item.jtId" tag="div" style="margin-left:30px;height:50px;display: flex;align-items: center;justify-content:center;" :to="{ name: 'catejobdetail', params: { id: item.jtId }}" active-class="activeClass">
          <el-link :underline="false" style="font-size:18px;color:white;font-weight:500;">
            {{ item.jtName }}
          </el-link>
        </router-link>
      </div>
      <router-view />
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
      id: 0,
      childrenCate: [],
      showRouterView: false
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
    this.getCate()
  },
  methods: {
    init() {
      this.id = this.$route.params.id
    },
    getCate() {
      this.$http.get('recruit/children/' + this.id)
        .then(res => {
          const { code, message, data } = res.data
          if (code !== 20000) return this.$message.error(message)
          this.childrenCate = data
          console.log(this.childrenCate)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.activeClass{
    //background-color: #019875;
    color: #019875;
    border-bottom:8px solid white;
}
</style>
