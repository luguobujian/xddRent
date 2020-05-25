<template>
  <div class="container">
    <div class="main-box">
      <div class="main-tit">验证码登录</div>
      <div>
        <van-field :value="mobile"
                   placeholder="请输入手机号"
                   @change="onInputKeyMobile" />
      </div>
      <div class="sms-code-box van-hairline">
        <van-field class="inp-box"
                   :value="code"
                   placeholder="请输入验证码"
                   @change="onInputKeyCode" />
        <span class="sms-btn"
              :class="{active: !getSmsCodeIng}"
              @click="sms">{{getSmsCodeBtnText}}</span>
      </div>
      <div class="sub-tit"
           @click="openPage(0)">
        账号密码登录
      </div>
      <div class="bottom-btn-box">
        <div class="bottom-btn-margin">
          <van-button :color="(mobile && code)? '#97D700': '#EBF8CD'"
                      size="small"
                      round
                      block
                      @click="submit">登录</van-button>
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
import { sms, smsCheck, mobilelogin } from '@/api/getData'
import Toast from '../../../../static/vant/toast/toast'
export default {
  data () {
    return {
      routers: [{
        url: '/pages/login/signin2/main'
      }, {
        url: '/pages/login/register/main'
      }, {
        url: '/pages/login/detail/main?f=1'
      }, {
        url: '/pages/login/detail/main?f=2'
      }],
      checked: true,
      getSmsCodeBtnText: '获取验证码',
      getSmsCodeIng: false,
      getSmsCodeClock: 60,

      mobile: null,
      code: null

    }
  },
  onLoad () {
    let getCodeTime = mpvue.getStorageSync('mobilelogin')
    this.refreshCheckState(getCodeTime)
  },
  methods: {
    async sms () {
      try {
        if (this.getSmsCodeIng) return
        if (!(/^1[3456789]\d{9}$/.test(this.mobile))) {
          Toast.fail('请输入正确手机号')
          return
        }

        const res = await sms({ mobile: this.mobile, event: 'mobilelogin' })
        console.log(res)
        if (res.data.code === 1) {
          this.refreshCheckState(Date.now())
          Toast.success('发送成功')
        } else {
          Toast.fail(res.data.msg)
        }
      } catch (error) {
        console.log(`* sms error`, error)
        Toast.fail(error.data.msg)
      }
    },
    refreshCheckState (getCodeTime) {
      let that = this
      if (getCodeTime && (Date.now() - getCodeTime) < 60000) {
        this.getSmsCodeIng = true
        this.getSmsCodeBtnText = `${Math.ceil((getCodeTime / 1 + 60000 - Date.now()) / 1000)}秒后重试`
        setTimeout(function () {
          mpvue.setStorageSync('mobilelogin', String(getCodeTime))
          that.refreshCheckState(getCodeTime)
        }, 1000)
      } else {
        this.getSmsCodeIng = false
        this.getSmsCodeBtnText = '获取验证码'
      }
    },
    async smsCheck () {
      console.log({ captcha: this.code, mobile: this.mobile, event: 'mobilelogin' })
      try {
        if (!this.mobile) {
          Toast.fail('手机号不能为空')
          return
        }
        if (!(/^1[3456789]\d{9}$/.test(this.mobile))) {
          Toast.fail('请输入正确手机号')
          return
        }

        const res = await smsCheck({ captcha: this.code, mobile: this.mobile, event: 'mobilelogin' })
        console.log(res)
        if (res.data.code === 1) {
          this.openPage(0)
        } else {
          Toast.fail(res.data.msg)
        }
      } catch (error) {
        console.log(`* smsCheck error`, error)
        Toast.fail(error.data.msg)
      }
    },
    onInputKeyCode (e) {
      this.code = e.mp.detail.trim()
    },
    onInputKeyMobile (e) {
      this.mobile = e.mp.detail.trim()
    },
    onChange (e) {
      this.checked = e.mp.detail
    },
    async submit () {
      try {
        if (!this.mobile || !this.code) return
        if (!this.mobile) {
          Toast.fail('手机号不能为空')
          return
        }
        if (!(/^1[3456789]\d{9}$/.test(this.mobile))) {
          Toast.fail('请输入正确手机号')
          return
        }
        if (!this.code) {
          Toast.fail('验证码不能为空')
          return
        }
        if (!this.checked) {
          Toast('您还未同意隐私政策和用户协议')
          return
        }
        const res = await mobilelogin({ captcha: this.code, mobile: this.mobile })
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
        console.log(`* submit error`, error)
        Toast.fail(error.data.msg)
      }
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
.sms-btn.active:active {
  color: #999;
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