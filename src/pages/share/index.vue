<template>
  <div class="container">
    <div class="main-box">
      <div class="logo-box">
        <img :src="baseUrl + '/PingFangSC/xddmppic/108.png'"
             alt="">
      </div>
      <div class="title">箱当当</div>
      <div>这里是app说明这里是app说明这里是app说明这里是app说明，这里是app说明这里是app说明这里是app说明这里是app说明这里是app说明这里是app说明，这里是app说明这里是app说明这里是app说明这里是app说明这里是app说明这里是app说明这里是app说明这里是app说明这里是app说明。</div>
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
import API from '@/api/api'
export default {
  data () {
    return {
      baseUrl: API.baseUrl
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
  background-color: skyblue;
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