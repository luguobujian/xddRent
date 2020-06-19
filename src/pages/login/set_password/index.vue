<template>
  <div class="container">
    <div class="main-box">
      <div class="main-tit">设置登录密码</div>
      <div>
        <van-field :value="password"
                   :password="hidepass"
                   placeholder="请输入6～16位数字或字母密码"
                   :right-icon="hidepass?'/static/icons/eye-act.png': '/static/icons/eye.png'"
                   @clickIcon="showPassword"
                   @input="onInputKeyPassword" />
      </div>
      <div class="bottom-btn-box">
        <div class="bottom-btn-margin">
          <van-button color="#97D700"
                      size="small"
                      round
                      block
                      @click="register">提交</van-button>
        </div>
      </div>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>
<script>
import { register } from '@/api/getData'
import Toast from '../../../../static/vant/toast/toast'
export default {
  data () {
    return {
      hidepass: true,
      mobile: null,
      code: null,
      password: null,
      name_pic: null,
      unionId: null
    }
  },
  onLoad (options) {
    console.log(options)
    this.mobile = options.mobile
    this.code = options.code
    this.unionId = options.unionId
    this.name_pic = options.name_pic
  },
  methods: {
    async register () {
      try {
        if (!this.password) {
          Toast.fail('请输入密码')
          return
        }
        if (!(/^[a-z0-9]{6,16}$/.test(this.password))) {
          Toast.fail('密码格式错误')
          return
        }
        const res = await register({ code: this.code, mobile: this.mobile, password: this.password, type: 2, user_code: '', openid: this.unionId, name_pic: this.name_pic })
        console.log(res)
        if (res.data.code === 1) {
          Toast('设置成功')
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
          Toast('注册成功')
          mpvue.switchTab({
            url: '/pages/index/main'
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    goNextPage () {
      mpvue.switchTab({
        url: '/pages/index/main'
      })
    },
    showPassword (e) {
      if (this.hidepass) {
        this.hidepass = false
      } else {
        this.hidepass = true
      }
    },
    onInputKeyPassword (e) {
      this.password = e.mp.detail
    }
  },
  onUnload () {
    if (this.$options.data) {
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>
<style lang="">
.container {
  background: #fff;
}
.main-tit {
  color: #333;
  font-size: 30px;
  line-height: 42px;
  padding: 19px 0;
}
.main-box {
  flex: 1;
  margin: 0 25px;
}

.bottom-btn-margin {
  margin: 30px 0 !important;
}
</style>
<style lang="">
.van-cell {
  padding: 16px 0 !important;
}

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