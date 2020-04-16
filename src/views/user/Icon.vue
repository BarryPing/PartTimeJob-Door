<template>
  <div>
    <my-upload
      v-model="show"
      field="multipartFile"
      :width="200"
      :height="200"
      url="http://localhost:8888/api/upload"
      :params="params"
      :headers="headers"
      :no-rotate="false"
      img-format="png"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
    />
    <div @click="toggleShow">
      <el-avatar style="cursor:pointer" :fit="fit" shape="circle " :size="100" :src="imgDataUrl" />
    </div>

  </div>
</template>

<script>
import 'babel-polyfill' // es6 shim
import myUpload from 'vue-image-crop-upload'
export default {
  name: 'Avatar',
  components: {
    'my-upload': myUpload
  },
  data() {
    return {
      fit: 'fill',
      show: false,
      params: {
        token: '123456798',
        name: 'avatar'
      },
      headers: {
        authorization: 'Bearer ' + this.$store.getters.getToken
      },
      imgDataUrl: this.$store.getters.getUser.icon
    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    },
    /**
			 * crop success
			 *
			 * [param] imgDataUrl
			 * [param] field
			 */
    cropSuccess(imgDataUrl, field) {
      console.log('-------- crop success --------')
      this.imgDataUrl = imgDataUrl
    },
    /**
			 * upload success
			 *
			 * [param] jsonData   服务器返回数据，已进行json转码
			 * [param] field
			 */
    cropUploadSuccess(jsonData, field) {
      // 成功
      // 修改用户数据库中头像字段
      this.setAvatar(jsonData.data.path)
      console.log('-------- upload success --------')
      console.log(jsonData)
      console.log('field: ' + field)
    },
    /**
			 * upload fail
			 *
			 * [param] status    server api return error status, like 500
			 * [param] field
			 */
    cropUploadFail(status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
    },
    setAvatar(path) {
      this.$http.post('profile/modify/icon', {
        'stuID': this.$store.getters.getUser.stuid,
        'iconPath': path

      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
