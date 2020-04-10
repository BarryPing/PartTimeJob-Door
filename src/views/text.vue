<template>
  <div class="buttonItem">
    <input v-model="vercode" type="text" placeholder="输入验证码">
    <div class="red sendCode" @click="sendMessage">{{ btnText }}</div>
  </div>
</template>

<script>
export default {
  name: 'ButtonItem',
  data() {
    return {
      vercode: '',
      btnDisabled: false,
      btnText: '获取验证码'
    }
  },
  methods: {
    sendMessage() {
      if (this.btnDisabled) {
        return
      }
      this.getSecond(60)
    },
    // 发送验证码
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
    }
  }
}
</script>

<style lang="less" scoped>
.buttonItem{
        margin:15px 10px;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        border:1px solid #ddd;
        input{
            height: 45px;
            font-size: 1rem;
            padding-left:10px;
            border:0;
            outline: none;
        }
        .sendCode{
            border: 0;
            outline: none;
            background-color: #fff;
            cursor: pointer;
        }
    }
</style>
