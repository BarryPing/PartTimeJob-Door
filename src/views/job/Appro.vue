<template>
  <div>
    <myheader />
  </div>
</template>

<script>
import myheader from '@/views/Header'
export default {
  components: { myheader },
  data() {
    return {
      id: 0
    }
  },
  methods: {
    getInit() {
      this.id = this.$route.params.id
    }
  }
}
</script>

<style lang="less" scoped>

</style>
