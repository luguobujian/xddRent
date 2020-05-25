<template>
  <div class="container van-hairline--top">
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
    <div>
      <van-field :value="password"
                 :password="hidepass"
                 placeholder="请输入6～16位数字或字母密码"
                 :right-icon="hidepass?'/static/icons/eye-act.png': '/static/icons/eye.png'"
                 @change="onInputPasswordkey"
                 @clickIcon="showPassword" />
    </div>
    <div class="bottom-btn-box">
      <div class="bottom-btn-margin">
        <van-button color="#97D700"
                    size="small"
                    round
                    block
                    @click="smsCheck">提交</van-button>
      </div>
    </div>
    <van-toast id="van-toast" />

  </div>
</template>
<script>
import { sms, smsCheck, setPwd } from '@/api/getData'
import Toast from '../../../../static/vant/toast/toast'
export default {
  data () {
    return {
      hidepass: true,
      getSmsCodeBtnText: '获取验证码',
      getSmsCodeIng: false,
      getSmsCodeClock: 60,

      mobile: null,
      code: null,
      password: null
    }
  },
  onLoad () {
    let getCodeTime = mpvue.getStorageSync('paypwd')
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
        const res = await sms({ mobile: this.mobile, event: 'paypwd' })
        console.log(res)
        if (res.data.code === 1) {
          this.refreshCheckState(Date.now())
          Toast.success('发送成功')
        }
      } catch (error) {
        console.log(`* sms error`, error)
      }
    },
    refreshCheckState (getCodeTime) {
      let that = this
      if (getCodeTime && (Date.now() - getCodeTime) < 60000) {
        this.getSmsCodeIng = true
        this.getSmsCodeBtnText = `${Math.ceil((getCodeTime / 1 + 60000 - Date.now()) / 1000)}秒后重试`
        setTimeout(function () {
          mpvue.setStorageSync('paypwd', String(getCodeTime))
          that.refreshCheckState(getCodeTime)
        }, 1000)
      } else {
        this.getSmsCodeIng = false
        this.getSmsCodeBtnText = '获取验证码'
      }
    },
    async smsCheck () {
      console.log({ captcha: this.code, mobile: this.mobile, event: 'paypwd' })
      try {
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
        if (!this.password) {
          Toast.fail('密码不能为空')
          return
        }
        if (!(/^[a-z0-9]{6,16}$/.test(this.password))) {
          Toast.fail('密码格式错误')
          return
        }
        const res = await smsCheck({ captcha: this.code, mobile: this.mobile, event: 'paypwd' })
        console.log(res)
        if (res.data.code === 1) {
          this.submit()
        } else {
          Toast.fail(res.data.msg)
        }
      } catch (error) {
        console.log(`* smsCheck error`, error)
        Toast.fail(error.data.msg)
      }
    },
    async submit () {
      try {
        // if (!this.mobile) {
        //   Toast.fail('手机号不能为空')
        //   return
        // }
        // if (!(/^1[3456789]\d{9}$/.test(this.mobile))) {
        //   Toast.fail('请输入正确手机号')
        //   return
        // }
        // if (!this.code) {
        //   Toast.fail('验证码不能为空')
        //   return
        // }
        // if (!this.password) {
        //   Toast.fail('密码不能为空')
        //   return
        // }
        const res = await setPwd({ pwd: this.password })
        console.log(res)
        if (res.data.code === 1) {
          Toast('设置成功')
          // this.goNextPage()
        } else {
          Toast.fail(res.data.msg)
        }
      } catch (error) {
        console.log(`* login error`, error)
        Toast.fail(error.data.msg)
      }
    },
    onInputKeyCode (e) {
      this.code = e.mp.detail.trim()
    },
    onInputKeyMobile (e) {
      this.mobile = e.mp.detail.trim()
    },
    onInputPasswordkey (e) {
      this.password = e.mp.detail
    },
    showPassword (e) {
      if (this.hidepass) {
        this.hidepass = false
      } else {
        this.hidepass = true
      }
    }
  }
}
</script>
<style scope>
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
  margin: 30px 15px !important;
}
</style>
<style>
.van-cell {
  padding: 16px 15px !important;
}

.sms-code-box .van-cell::after {
  border: none;
}

.sms-code-box[class*="van-hairline"]::after {
  left: 15px !important;
  width: 92% !important;
}

.van-cell::after {
  width: 92% !important;
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