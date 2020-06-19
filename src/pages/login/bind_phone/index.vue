<template>
  <div class="container">
    <div class="main-box">
      <div class="main-tit">绑定手机号</div>
      <div>
        <van-field :value="mobile"
                   maxlength="11"
                   type="number"
                   placeholder="请输入手机号"
                   @change="onInputKeyMobile" />
      </div>
      <div class="sms-code-box van-hairline">
        <van-field :value="code"
                   class="inp-box"
                   type="number"
                   placeholder="请输入验证码"
                   @change="onInputKeyCode" />
        <span class="sms-btn"
              :class="{active: !getSmsCodeIng}"
              @click="sms">{{getSmsCodeBtnText}}</span>
      </div>

      <div class="bottom-btn-box">
        <div class="bottom-btn-margin">
          <van-button :color="(mobile && code)? '#97D700': '#EBF8CD'"
                      size="small"
                      round
                      block
                      @click="smsCheck">提交</van-button>
        </div>
      </div>
    </div>
    <div class="bottom-content">
      <van-checkbox icon-size="15px"
                    checked-color="#07c160"
                    :value="checked"
                    @change="onChange">我已阅读并同意
        <div class="tip-btn"
             @click.stop="openPage(1)">“用户协议”</div>
        和
        <div class="tip-btn"
             @click.stop="openPage(2)">“隐私协议”</div>
      </van-checkbox>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>
<script>
import { decryptData, xxWxLogin, sms, smsCheck, thirdLogin } from '@/api/getData'
import Toast from '../../../../static/vant/toast/toast'
export default {
  data () {
    return {
      routers: [{
        url: '/pages/login/set_password/main'
      }, {
        url: '/pages/login/detail/main?f=1'
      }, {
        url: '/pages/login/detail/main?f=2'
      }],
      checked: false,
      getSmsCodeBtnText: '获取验证码',
      getSmsCodeIng: false,
      getSmsCodeClock: 60,

      name_pic: null,
      mobile: null,
      code: null,
      unionId: null
    }
  },
  onLoad (options) {
    let getCodeTime = mpvue.getStorageSync('register')
    this.refreshCheckState(getCodeTime)
    // this.privateWxLogin()
    this.unionId = options.unionId
    this.name_pic = options.name_pic
  },
  methods: {
    async privateWxLogin () {
      return new Promise((resolve, reject) => {
        mpvue.login({
          success (res) {
            console.log('privateWxLogin', res)
            if (res.code) {
              resolve(res.code)
              decryptData({ code: res.code })
                .then(r => {
                  console.log(`decryptData`, r)
                })
              xxWxLogin({ code: res.code })
                .then(r => {
                  console.log(`ucode`, r)
                })
            } else {
              reject(res)
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      })
    },
    async sms () {
      try {
        if (this.getSmsCodeIng) return
        if (!(/^1[3456789]\d{9}$/.test(this.mobile))) {
          Toast.fail('手机号错误')
          return
        }

        const res = await sms({ mobile: this.mobile, event: 'bindmobile' })
        console.log(res)
        if (res.data.code === 1) {
          this.refreshCheckState(Date.now())
          Toast.success('发送成功')
        }
      } catch (error) {
        console.log(`* sms error`, error)
        this.refreshCheckState(Date.now())
        Toast.fail(error.data.msg)
      }
    },
    refreshCheckState (getCodeTime) {
      let that = this
      if (getCodeTime && (Date.now() - getCodeTime) < 60000) {
        this.getSmsCodeIng = true
        this.getSmsCodeBtnText = `${Math.ceil((getCodeTime / 1 + 60000 - Date.now()) / 1000)}秒后重试`
        setTimeout(function () {
          mpvue.setStorageSync('register', String(getCodeTime))
          that.refreshCheckState(getCodeTime)
        }, 1000)
      } else {
        this.getSmsCodeIng = false
        this.getSmsCodeBtnText = '获取验证码'
      }
    },
    async smsCheck () {
      try {
        if (!this.mobile || !this.code) return
        if (!this.checked) {
          Toast('您还未同意隐私政策和用户协议')
          return
        }
        if (!(/^1[3456789]\d{9}$/.test(this.mobile))) {
          Toast.fail('手机号错误')
          return
        }
        console.log({ captcha: this.code, mobile: this.mobile, event: 'bindmobile' })
        const res = await smsCheck({ captcha: this.code, mobile: this.mobile, event: 'bindmobile' })
        console.log(res)
        if (res.data.code === 1) {
          // this.openPage(0)
          this.thirdLogin()
        } else {
          Toast.fail(res.data.msg)
        }
      } catch (error) {
        console.log(`* smsCheck error`, error)
        // Toast.fail(error.data.msg)
      }
    },
    async thirdLogin () {
      try {
        const res = await thirdLogin({
          openid: this.unionId,
          type: 2,
          phone: this.mobile,
          name_pic: this.name_pic
        })
        console.log(res)
        if (res.data.code === 1) {
          if (res.data.data.userinfo.group_id !== 0) {
            Toast.fail('请去APP端管理员工')
            setTimeout(() => {
              mpvue.navigateTo({
                url: '/pages/share/main'
              })
            }, 1500)
            return
          }
          mpvue.setStorage({
            key: 'token',
            data: res.data.data.userinfo.token
          })
          Toast('登录成功')

          mpvue.switchTab({
            url: '/pages/index/main'
          })
        } else {
          Toast.fail(res.data.msg)
        }
      } catch (error) {
        console.log(`thirdLogin`, error)
        if (error.data.code === 0) {
          mpvue.navigateTo({
            url: `/pages/login/set_password/main?mobile=${this.mobile}&unionId=${this.unionId}&name_pic=${this.name_pic}&code=${this.code}`
          })
        }
      }
    },
    openPage (i) {
      console.log(i)
      let url
      if (i === 1 || i === 2) {
        url = `${this.routers[i].url}`
      } else {
        url = `${this.routers[i].url}?mobile=${this.mobile}&code=${this.code}`
      }
      mpvue.navigateTo({
        url
      })
    },
    onInputKeyCode (e) {
      this.code = e.mp.detail.trim()
    },
    onInputKeyMobile (e) {
      this.mobile = e.mp.detail.trim()
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
  padding: 19px 0;
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
  left: 0px !important;
  width: 100% !important;
} */

.van-cell::after {
  left: 0px !important;
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

.van-button {
  height: 39px !important;
}
.van-checkbox__label {
  color: #999 !important;
}
</style>