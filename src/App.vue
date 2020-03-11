<script>
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

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({ key: 'logs' }).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
page {
  height: 100%;
  background-color: #f9f9f9;
}

.container {
  height: 100%;
  color: #333;
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
  width: 90% !important;
}
[class*="van-hairline"] {
  position: relative;
}
[class*="van-hairline"]::after {
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
</style>
