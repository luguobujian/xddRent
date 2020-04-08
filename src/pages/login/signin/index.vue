<template>
  <div class="container">
    <div class="main-box">
      <div class="main-tit">验证码登录</div>
      <div>
        <van-field v-model="value"
                   placeholder="请输入手机号" />
      </div>
      <div class="sms-code-box van-hairline">
        <van-field class="inp-box"
                   placeholder="请输入验证码" />
        <span class="sms-btn">获取验证码</span>
      </div>
      <div class="sub-tit" @click="openPage(0)">
        账号密码登录
      </div>
      <div class="bottom-btn-box">
        <div class="bottom-btn-margin">
          <van-button color="#97D700"
                      size="small"
                      round
                      block
                      @click="go">登录</van-button>
        </div>
      </div>
      <div class="bottom-tip-btn">
        <div @click="openPage(1)">注册</div>
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
      routers: [{
        url: '/pages/login/signin2/main'
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
.sub-tit {
  font-size: 15px;
  color: #97d700;
  line-height: 21px;
  padding-top: 15px;
}
.sub-tit div {
  display: inline-block;
  color: #97d700;
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