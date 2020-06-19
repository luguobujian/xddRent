<template>
  <div class="container">
    <div class="main-box">
      <div class="logo-box">
        <img class="logo-img"
             :src="baseUrl + '/PingFangSC/xddmppic/108.png'"
             alt="">
        <div class="logo-tip">箱当当</div>
      </div>
      <div class="button-box">
        <van-button class="button"
                    color="#97d700"
                    type="info"
                    round
                    block
                    open-type="getUserInfo"
                    @getuserinfo="getuserinfo">微信登录</van-button>
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
        <div class="tip-btn"
             @click.stop="openPage(2)">“用户协议”</div>
        和
        <div class="tip-btn"
             @click.stop="openPage(3)">“隐私协议”</div>
      </van-checkbox>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>
<script>
import API from '@/api/api'
import { decryptData, qqWxIosLogin } from '@/api/getData'

import Toast from '../../../static/vant/toast/toast'
export default {
  data () {
    return {
      baseUrl: API.baseUrl,
      checked: false,
      routers: [{
        url: '/pages/login/bind_phone/main'
      }, {
        url: '/pages/login/signin/main'
      }, {
        url: '/pages/login/detail/main?f=1'
      }, {
        url: '/pages/login/detail/main?f=2'
      }],
      unionId: null,
      name_pic: null
    }
  },
  methods: {
    getuserinfo (e) {
      let that = this
      that.name_pic = `${e.mp.detail.userInfo.nickName}^${e.mp.detail.userInfo.avatarUrl}`
      if (!this.checked) {
        Toast('您还未同意隐私政策和用户协议')
        return
      }

      mpvue.login({
        success (res) {
          console.log(e)
          console.log('privateWxLogin', res)
          if (res.code) {
            decryptData({
              code: res.code,
              encryptedData: e.mp.detail.encryptedData,
              iv: e.mp.detail.iv
            })
              .then(r => {
                that.unionId = r.data.unionId
                qqWxIosLogin({ type: 2, openid: r.data.unionId })
                  .then((r) => {
                    console.log(`qqWxIosLogin`, r)
                    if (r.data.code === 1) {
                      if (r.data.data.userinfo.group_id !== 0) {
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
                        data: r.data.data.userinfo.token
                      })
                      Toast('登录成功')

                      mpvue.switchTab({
                        url: '/pages/index/main'
                      })
                    } else {
                      Toast.fail(r.data.msg)
                    }
                  }).catch(r => {
                    console.log(`decryptData111`, r)
                    if (r.data.code === 0) {
                      mpvue.navigateTo({
                        url: `/pages/login/bind_phone/main?unionId=${that.unionId}&name_pic=${that.name_pic}`
                      })
                    }
                  })
              })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })

      // decryptData({
      //   encryptedData: e.mp.detail.encryptedData,
      //   iv: e.mp.detail.iv
      // })
      //   .then(r => {
      //     Toast('出错了')
      //     console.log(`decryptData`, r)
      //   })
    },
    onChange (e) {
      console.log(e)
      this.checked = e.mp.detail
    },
    openPage (i) {
      mpvue.navigateTo({
        url: this.routers[i].url
      })
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