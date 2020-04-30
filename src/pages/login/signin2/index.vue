<template>
  <div class="container">
    <div class="main-box">
      <div class="main-tit">账号登录</div>
      <div>
        <van-field :value="mobile"
                   placeholder="请输入手机号"
                   @change="onInputKeyMobile" />
      </div>
      <div>
        <van-field :value="password"
                   :password="hidepass"
                   placeholder="请输入6～16位数字或字母密码"
                   right-icon="/static/icons/eye.png"
                   @change="onInputPasswordkey"
                   @clickIcon="showPassword" />
      </div>
      <div class="sub-tit">
        <div class="code-login"
             @click="openPage(0)">验证码登录</div>
        <div class="reset-password"
             @click="openPageOne(1)">忘记密码</div>
      </div>
      <div class="bottom-btn-box">
        <div class="bottom-btn-margin">
          <van-button :color="(mobile && password)? '#97D700': '#EBF8CD'"
                      size="small"
                      round
                      block
                      @click="login">登录</van-button>
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
        <div class="tip-btn"
             @click.stop="openPageOne(2)">“用户协议”</div>
        和
        <div class="tip-btn"
             @click.stop="openPageOne(3)">“隐私协议”</div>
      </van-checkbox>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>
<script>
import { login } from '@/api/getData'
import Toast from '../../../../static/vant/toast/toast'
export default {
  data () {
    return {
      routers: [{
        url: '/pages/login/signin/main'
      }, {
        url: '/pages/login/reset_password/main'
      }, {
        url: '/pages/login/detail/main?f=1'
      }, {
        url: '/pages/login/detail/main?f=2'
      }],
      checked: true,
      hidepass: true,

      // mobile: null,
      // password: null

      mobile: '18055779894',
      password: 654321
    }
  },
  methods: {
    async login () {
      try {
        if (!this.mobile) {
          Toast.fail('手机号不能为空')
          return
        }
        if (!(/^1[3456789]\d{9}$/.test(this.mobile))) {
          Toast.fail('请输入正确手机号')
          return
        }
        if (!this.password) {
          Toast.fail('密码不能为空')
          return
        }
        if (!(/^[a-z0-9]{6,16}$/.test(this.password))) {
          Toast.fail('密码格式错误')
          return
        }
        const res = await login({ account: this.mobile, password: this.password })
        console.log(res)
        if (res.data.code === 1) {
          mpvue.setStorage({
            key: 'token',
            data: res.data.data.userinfo.token
          })
          Toast('登录成功')
          this.goNextPage()
        } else {
          Toast.fail(res.data.msg)
        }
      } catch (error) {
        console.log(`* login error`, error)
        Toast.fail(error.data.msg)
      }
    },
    showPassword (e) {
      if (this.hidepass) {
        this.hidepass = false
      } else {
        this.hidepass = true
      }
    },
    onInputKeyMobile (e) {
      this.mobile = e.mp.detail
    },
    onInputPasswordkey (e) {
      this.password = e.mp.detail
    },
    onChange (e) {
      this.checked = e.mp.detail
    },
    goNextPage () {
      mpvue.switchTab({
        url: '/pages/index/main'
      })
    },
    openPageOne (i) {
      mpvue.navigateTo({
        url: this.routers[i].url
      })
    },
    openPage (i) {
      mpvue.redirectTo({
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
  display: flex;
  font-size: 15px;
  color: #97d700;
  line-height: 21px;
  padding-top: 15px;
}
.sub-tit div.code-login {
  flex: 1;
  color: #97d700;
}
.sub-tit .reset-password {
  font-size: 13px;
  color: #999;
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

.van-checkbox__label {
  color: #999 !important;
}
</style>