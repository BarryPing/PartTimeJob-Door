<template>
  <div id="app" style="background-color:#fafafa">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    // 监听页面刷新事件
    // 页面刷新时，将Vuex中保存的state存放到sessionStorage中去
    window.addEventListener('unload', this.saveState)
  },
  methods: {
    // 将Vuex中保存的state存放到sessionStorage中去
    saveState: function() {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state.User))
    }

  }
}
</script>

<style>

</style>
