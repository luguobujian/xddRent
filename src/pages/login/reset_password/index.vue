<template>
  <div class="container">
    <div class="main-box">
      <div class="main-tit">找回密码</div>
      <div>
        <van-field v-model="value"
                   placeholder="请输入手机号" />
      </div>

      <div class="sms-code-box van-hairline">
        <van-field class="inp-box"
                   placeholder="请输入验证码" />
        <span class="sms-btn">获取验证码</span>
      </div>
      <div>
        <van-field v-model="value"
                   placeholder="请输入6～16位数字或字母密码"
                   right-icon="/static/icons/eye.png" />
      </div>
      <div class="bottom-btn-box">
        <div class="bottom-btn-margin">
          <van-button color="#97D700"
                      size="small"
                      round
                      block
                      @click="go">重置密码</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      routers: [{
        url: '/pages/login/signin/main'
      }]
    }
  },
  methods: {
    openPage (i) {
      wx.redirectTo({
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
  margin: 0 25px;
}
.main-tit {
  color: #333;
  font-size: 30px;
  line-height: 42px;
  padding: 19px 0 6px;
}

.sms-code-box {
  display: flex;
  flex-direction: row;
}
.inp-box {
  flex: 1;
}
.sms-btn {
  color: #97d700;
  padding: 17px 15px;
  background: #fff;
}
.bottom-btn-margin {
  margin: 30px 0 10px !important;
}
.bottom-content {
  display: inline-block;
  height: 37px;
  font-size: 12px;
  color: #999;
  text-align: center;
  margin: 0 auto;
}
.bottom-tip-btn {
  font-size: 15px;
  color: #666666;
  line-height: 21px;
  text-align: center;
  margin-top: 10px;
}
.checkbox-box {
}
.tip-btn {
  display: inline-block;
  color: #666;
}
</style>
<style>
.van-cell {
  padding: 16px 0 !important;
}

.sms-code-box .van-cell::after {
  border: none;
}

/* .sms-code-box[class*="van-hairline"]::after {
  left: 15px !important;
  width: 92% !important;
} */

.van-cell::after {
  left: 0 !important;
  width: 100% !important;
}

.van-icon--image {
  width: 21px !important;
  height: 21px !important;
}

.van-button--small {
  color: #fff;
  height: 39px !important;
}
</style>