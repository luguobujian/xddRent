<script>
// import { exchangeCode } from '@/api/getData'
import API from '@/api/api'

export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    // let logs
    // if (mpvuePlatform === 'my') {
    //   logs = mpvue.getStorageSync({ key: 'logs' }).data || []
    //   logs.unshift(Date.now())
    //   mpvue.setStorageSync({
    //     key: 'logs',
    //     data: logs
    //   })
    // } else {
    //   logs = mpvue.getStorageSync('logs') || []
    //   logs.unshift(Date.now())
    //   mpvue.setStorageSync('logs', logs)
    // }

  },
  onLaunch () {

    // this.privateWxLogin().then(r => this.exchangeCode(r.code))
  },
  mounted () {
    // this.exchangeCode()
    wx.loadFontFace({
      global: true,
      family: 'PingFangSC-Medium',
      source: `url("${API.baseUrl}PingFangSC/PingFangSC-Medium.ttf")`,
      success (res) { console.log('PingFangSC-Medium', res) },
      fail (res) { console.log('PingFangSC-Medium', res) }
    })
    wx.loadFontFace({
      global: true,
      family: 'PingFangSC-Regular',
      source: `url("${API.baseUrl}PingFangSC/PingFangSC-Regular.ttf")`,
      success (res) { console.log('PingFangSC-Regular', res) },
      fail (res) { console.log('PingFangSC-Regular', res) }
    })
    wx.loadFontFace({
      global: true,
      family: 'Oswald-Medium',
      source: `url("${API.baseUrl}PingFangSC/Oswald-Medium.ttf")`,
      success (res) { console.log('Oswald-Medium', res) },
      fail (res) { console.log('Oswald-Medium', res) }
    })
  },
  methods: {
    /**
    *用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 auth.code2Session，使用 code 换取 openid 和 session_key 等信息
    */
    // async privateWxLogin () {
    //   return new Promise((resolve, reject) => {
    //     mpvue.login({
    //       success (res) {
    //         console.log('privateWxLogin', res)
    //         if (res.code) {
    //           resolve(res.code)
    //         } else {
    //           reject(res)
    //           console.log('登录失败！' + res.errMsg)
    //         }
    //       }
    //     })
    //   })
    // },
    /**
    *code登录获取openid
    */
    // async exchangeCode () {
    //   try {
    //     const code = await this.privateWxLogin()
    //     const res = await exchangeCode({ code })
    //     console.log(`App:exchangeCode ${new Date().getTime()}`, res)
    //     mpvue.setStorage({
    //       key: 'token',
    //       data: res.data.data.userinfo.token
    //     })
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  }
}
</script>

<style>
@import "../static/vant/common/index.wxss";
* {
  font-family: "PingFangSC-Regular", "PingFang SC", "Helvetica Neue", "Arial",
    sans-serif;
}
page {
  height: 100%;
  font-size: 15px;
  background-color: #f9f9f9;
}
/* image.van-icon__image {
  display: block;
} */

.PingFangSC-Regular {
  font-family: "PingFangSC-Regular";
}
.PingFangSC-Medium {
  color: #333;
  font-family: "PingFangSC-Medium";
}
.Oswald-Medium {
  font-family: "Oswald-Medium";
}
.container {
  height: 100%;
  color: #333;
  font-family: "PingFangSC-Regular";
  display: flex;
  flex-direction: column;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.clearfix::before,
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

.clearfix {
  zoom: 1;
}

.van-cell:after {
  width: 92% !important;
}
.van-hairline {
  position: relative;
}
.van-hairline::after {
  position: absolute;
  box-sizing: border-box;
  -webkit-transform-origin: center;
  transform-origin: center;
  content: " ";
  pointer-events: none;
  top: auto;
  right: 0;
  bottom: 0;
  left: 0;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.mb10 {
  margin-bottom: 10px;
}
.van-cell__title,
.van-cell__value {
  font-size: 15px;
}
</style>
