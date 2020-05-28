<template>
  <div class="container">
    <div class="main-box">
      <div class="main-tit">注册</div>
      <div class="sub-tit">已有账号？<div @click="goNextLogo()">点击登录</div>
      </div>
      <div>
        <van-field :value="mobile"
                   type="number"
                   maxlength="11"
                   placeholder="请输入手机号"
                   @change="onInputKeyMobile" />
      </div>
      <div class="sms-code-box van-hairline">
        <van-field class="inp-box"
                   :value="code"
                   type="number"
                   placeholder="请输入验证码"
                   @change="onInputKeyCode" />
        <span class="sms-btn"
              :class="{active: !getSmsCodeIng}"
              @click="sms">{{getSmsCodeBtnText}}</span>
      </div>
      <div>
        <van-field :value="user_code"
                   placeholder="请输入邀请码(选填)"
                   @change="onInputUCodekey" />
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
                      @click="submit">提交</van-button>
        </div>
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
    <van-toast id="van-toast" />
  </div>
</template>
<script>
import { sms, register } from '@/api/getData'
import Toast from '../../../../static/vant/toast/toast'
export default {
  data () {
    return {
      hidepass: true,
      getSmsCodeBtnText: '获取验证码',
      getSmsCodeIng: false,
      getSmsCodeClock: 60,

      checked: true,

      mobile: null,
      code: null,
      password: null,
      user_code: null
    }
  },
  onLoad () {
    let getCodeTime = mpvue.getStorageSync('getCheckCodeTimeRegister')
    this.refreshCheckState(getCodeTime)
  },
  methods: { // 倒计时状态刷新
    refreshCheckState (getCodeTime) {
      let that = this
      if (getCodeTime && (Date.now() - getCodeTime) < 60000) {
        this.getSmsCodeIng = true
        this.getSmsCodeBtnText = `${Math.ceil((getCodeTime / 1 + 60000 - Date.now()) / 1000)}秒后重试`
        setTimeout(function () {
          mpvue.setStorageSync('getCheckCodeTimeRegister', String(getCodeTime))
          that.refreshCheckState(getCodeTime)
        }, 1000)
      } else {
        this.getSmsCodeIng = false
        this.getSmsCodeBtnText = '获取验证码'
      }
    },
    async sms () {
      if (this.getSmsCodeIng) return
      try {
        if (!this.mobile) {
          Toast.fail('请输入手机号')
          return
        }
        if (!(/^1[3456789]\d{9}$/.test(this.mobile))) {
          Toast.fail('手机号错误')
          return
        }
        // if (this.getSmsCodeIng) return
        const res = await sms({ mobile: this.mobile, event: 'register' })
        console.log(res)
        if (res.data.code === 1) {
          this.refreshCheckState(Date.now())
          Toast.success('发送成功')
        }
      } catch (error) {
        console.log(`* sms error`, error)
        Toast.fail(error.data.msg)
      }
    },
    async submit () {
      try {
        if (!this.mobile) {
          Toast.fail('手机号不能为空')
          return
        }
        if (!(/^1[3456789]\d{9}$/.test(this.mobile))) {
          Toast.fail('手机号错误')
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
        if (!this.checked) {
          Toast('您还未同意隐私政策和用户协议')
          return
        }
        const res = await register({ mobile: this.mobile, code: this.code, password: this.password, user_code: this.user_code })
        console.log(res)
        if (res.data.code === 1) {
          Toast.success(res.data.msg)
          mpvue.navigateBack()
        } else {
          Toast.fail(res.data.msg)
        }
      } catch (error) {
        console.log(`* submit error`, error)
        Toast.fail(error.data.msg)
      }
    },
    goNextLogo () {
      mpvue.navigateBack()
    },
    onInputKeyCode (e) {
      this.code = e.mp.detail.trim()
    },
    onInputKeyMobile (e) {
      this.mobile = e.mp.detail.trim()
    },
    onInputUCodekey (e) {
      this.user_code = e.mp.detail
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
    },
    onChange (e) {
      this.checked = e.mp.detail
    }
  },
  onUnload () {
    if (this.$options.data) {
      Object.assign(this.$data, this.$options.data())
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
  color: #999;
  line-height: 21px;
  padding-bottom: 20px;
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
  margin: 30px 0 !important;
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