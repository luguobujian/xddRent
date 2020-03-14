<template>
  <div class="container">
    <div class="container flex">
      <div>
        <image :src="src"
               class="avatar"
               bindtap="upload"></image>
        <div class="item flex"
             bindtap="upload">click me</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      src: ''
    }
  },
  upload () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0]

        wx.redirectTo({
          url: `../upload/upload?src=${src}`
        })
      }
    })
  },
  onLoad (option) {
    let { avatar } = option
    if (avatar) {
      this.setData({
        src: avatar
      })
    }
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.avatar-container {
  position: relative;
  text-align: center;
  padding-top: 50%;
}

.avatar {
  width: 5rem;
  height: 5rem;
  background-color: #e5e5e5;
  border-radius: 50%;
}

.item {
  line-height: 3rem;
}
</style>