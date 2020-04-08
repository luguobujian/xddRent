<template>
  <div class="container">
    <div class="main-box">
      <div class="logo-box">
        <img class="logo-img"
             src=""
             alt="">
        <div class="logo-tip">箱当当</div>
      </div>
      <div class="button-box">
        <van-button class="button"
                    color="#97d700"
                    type="info"
                    round
                    block
                    @click="openPage(0)">微信登录</van-button>
      </div>
      <div class="bottom-tip-btn">
        <div @click="openPage(1)">手机账号登录/注册</div>
      </div>
    </div>
    <div class="bottom-content">
      <van-checkbox icon-size="15px"
                    checked-color="#07c160"
                    :value="checked"
                    @change="onChange">我已阅读并同意
        <div class="tip-btn">“用户协议”</div>
        和
        <div class="tip-btn">“隐私协议”</div>
      </van-checkbox>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checked: true,
      routers: [{
        url: '/pages/login/bind_phone/main'
      }, {
        url: '/pages/login/signin/main'
      }]
    }
  },
  methods: {
    onChange (e) {
      console.log(e)
      this.checked = e.mp.detail
    },
    openPage (i) {
      wx.navigateTo({
        url: this.routers[i].url
      })
    }
  }

}
</script>
<style scoped>
.container {
  background: #fff;
}
.main-box {
  flex: 1;
}
.logo-box {
  text-align: center;
  margin-top: 90px;
  margin-bottom: 30px;
}
.logo-img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: skyblue;
}
.logo-tip {
  font-size: 15px;
  line-height: 20px;
  margin-top: 10px;
}
.button-box {
  text-align: center;
  margin: 0 15px;
}
.bottom-tip-btn {
  font-size: 15px;
  color: #666666;
  line-height: 21px;
  text-align: center;
  margin-top: 10px;
}
.bottom-content {
  display: inline-block;
  height: 37px;
  font-size: 12px;
  color: #999;
  text-align: center;
  margin: 0 auto;
}
.checkbox-box {
}
.tip-btn {
  display: inline-block;
  color: #666;
}
</style>
<style lang="">
.van-button {
  height: 39px !important;
}
.van-checkbox__label {
  color: #999 !important;
}
</style>