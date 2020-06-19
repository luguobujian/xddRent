<template>
  <div class="container">
    <div class="main-box">
      <div class="logo-box">
        <img :src="detail.image"
             alt="">
      </div>
      <div class="title">{{detail.name}}</div>
      <div>{{detail.content}}</div>
    </div>

    <div class="bottom-btn-box van-hairline--top">
      <div class="bottom-btn-margin">
        <van-button color="#97D700"
                    size="small"
                    custom-style="font-size: 13px"
                    round
                    block
                    @click="goNextPage">立即下载</van-button>
      </div>
    </div>
  </div>
</template>
<script>
// import API from '@/api/api'
import { contactUs, share } from '@/api/getData'

export default {
  data () {
    return {
      detail: null
    }
  },
  onLoad () {
    this.share()
    // this.getData()
  },
  methods: {
    async share () {
      try {
        const res = await share()
        console.log(res)
        if (res.data.code === 1) {
          this.detail = res.data.data
        }
      } catch (error) {

      }
    },
    async getData () {
      try {
        const res = await contactUs()
        console.log(res)
        if (res.data.code === 1) {
          this.logo = res.data.data.images
          this.tel = res.data.data.mobile
          this.web = res.data.data.address
          this.email = res.data.data.email
        }
      } catch (err) {

      }
    }
  }
}
</script>
<style lang="">
.main-box {
  flex: 1;
  text-align: center;
  background-color: #fff;
  padding: 0 15px;
}
.logo-box {
  /* width: 100px;
  height: 100px; */
}
.logo-box img {
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 4px;
  /* background-color: skyblue; */
  margin: 40px auto 15px;
}
.title {
  margin-bottom: 10px;
}
.bottom-btn-margin {
  background-color: #fff;
  padding: 7px 15px;
}
.van-button--small {
  color: #fff;
  height: 35px !important;
}
</style>