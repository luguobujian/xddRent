<template>
  <div class="container">
    <div class="top-info clearfix"
         @click="goNextPage('userItems', 0)">
      <div class="avatar-box fl">
        <img :src="(detail && detail.avatar) || (baseUrl + '/PingFangSC/xddmppic/user.png')"
             alt="">
        <van-icon v-if="detail&&detail.gender===1"
                  class="gender-i"
                  name="/static/icons/female.png"
                  size="16px" />
        <van-icon v-else
                  class="gender-i"
                  name="/static/icons/male.png"
                  size="16px" />

      </div>
      <div class="fl">
        <div class="name-box">{{(detail && detail.username) || '未登录'}}</div>
        <div v-if="detail && detail.area"
             class="city-box"> {{detail && detail.area}}</div>
        <div v-if="detail && detail.group_id === 0"
             class="company-box">
          <div class="company-info-box clearfix"
               v-if="prove === '1'">
            <img class="company-icon fl"
                 src="/static/icons/m-mark.png"
                 alt="">
            <div class="company-name-box fl">
              {{company}}
            </div>
          </div>
        </div>
      </div>
      <div class="right-arrow fr">
        <van-icon name="/static/icons/arrow.png"
                  size="14px" />
      </div>

    </div>
    <div class="main-items-box">
      <div>
        <van-grid :column-num="4"
                  clickable>
          <van-grid-item class="grid-item"
                         v-for="(item, index) in gridItems"
                         :key="index"
                         :icon="item.icon"
                         :text="item.text"
                         @click="goNextPage('gridItems',index)" />
        </van-grid>
      </div>
      <div class="cell-group-box">
        <van-cell :class="index !=2 ?'no-border': ''"
                  v-for="(item, index) in cellItems"
                  :key="index"
                  :title="item.text"
                  is-link
                  @click="goNextPage('cellItems',index)" />
      </div>
      <div class="bottom-btn-box"
           v-if=" detail && detail.group_id !== 3">
        <van-button color="#97D700"
                    type="primary"
                    size="small"
                    custom-style="font-size: 15px"
                    plain
                    round
                    block
                    @click="logout">退出登录</van-button>
      </div>
    </div>
    <van-overlay :show="showOverlay"
                 custom-style="background: rgba(0,0,0,.3)">
      <view class="wrapper">
        <van-loading size="30px"
                     vertical>加载中...</van-loading>
      </view>
    </van-overlay>
  </div>
</template>

<script>
import API from '@/api/api'
import { getUserInfo, statusProve } from '@/api/getData'
export default {
  data () {
    return {
      baseUrl: API.baseUrl,
      goLogin: false,
      detail: null,
      status: null,
      prove: null,
      company: null,
      userItems: [{ path: '/pages/user/main' }],
      gridItems: [{
        text: '认证企业',
        icon: '/static/icons/m-company.png',
        path: '/pages/company/main'
      }, {
        text: '收货地址管理',
        icon: '/static/icons/m-address.png',
        path: '/pages/user/address/main'
      }, {
        text: '我的余额',
        icon: '/static/icons/m-balance.png',
        path: '/pages/billing/main'
      }, {
        text: '我的邀请',
        icon: '/static/icons/m-invite.png',
        path: '/pages/invite/main'
      }],
      cellItems: [
        { text: '意见反馈', path: '/pages/feedback/main' },
        { text: '关于我们', path: '/pages/about/main' },
        { text: '常见问题', path: '/pages/faqs/main' },
        { text: '联系我们', path: '/pages/contact/main' }
      ],
      showOverlay: true
    }
  },

  components: {

  },
  onShow () {
    this.getUserInfo()
    this.statusProve()
  },
  onLoad () {
    this.getUserInfo()
    this.statusProve()
  },
  methods: {
    async getUserInfo () {
      try {
        const res = await getUserInfo()
        this.showOverlay = false
        console.log(res)
        if (res.data.code === 1) {
          this.goLogin = false
          this.detail = res.data.data
        }
      } catch (error) {
        this.showOverlay = false
        if (error === 401) {
          this.goLogin = true
        }
        console.log('* getUserInfo error ', error)
      }
    },
    async statusProve () {
      try {
        const res = await statusProve()
        console.log('statusProve', res)
        if (res.data.code === 1) {
          this.status = res.data.data.status
          this.prove = res.data.data.msg && res.data.data.msg.status
          this.company = res.data.data.msg && res.data.data.msg.name
        }
      } catch (error) {
        console.log('* statusProve error ', error)
      }
    },
    goNextPage (t, i) {
      console.log(this[t][i].path)
      let url = this[t][i].path
      if (this.goLogin) {
        url = '/pages/login/main'
      }
      if (i === 0 && t === 'gridItems' && this.status === 1) {
        url = `/pages/company/verify/main?status=${this.status}`
      }
      mpvue.navigateTo({
        url
      })
    },
    logout () {
      let that = this
      mpvue.removeStorage({
        key: 'token',
        success (res) {
          if (that.$options.data) {
            Object.assign(that.$data, that.$options.data())
          }
          mpvue.navigateTo({
            url: '/pages/login/main'
          })
        }
      })
    }
  }
}
</script>



<style scoped>
.container {
  height: auto;
  min-height: 100%;
  background-color: #97d700;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.top-info {
  padding: 79px 0 30px;
  margin: 0 15px;
}
.avatar-box {
  margin-right: 12px;
  position: relative;
}

.avatar-box img {
  width: 74px;
  height: 74px;
  background-color: skyblue;
  border: 1px solid #fff;
  border-radius: 50%;
}

.gender-i {
  position: absolute;
  right: 5px;
  bottom: 5px;
}

.name-box {
  color: #333;
  font-size: 22px;
  font-weight: bold;
  line-height: 30px;
}

.city-box {
  font-size: 12px;
  line-height: 17px;
}
.company-box {
  display: inline-block;
  height: 22px;

  margin-top: 10px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 11px;
}

.company-icon {
  width: 12px;
  height: 14px;
  padding: 4px 6px;
}

.company-info-box {
  color: #333;
  font-size: 12px;
  font-weight: bold;
  line-height: 22px;
  padding-right: 6px;
}
.right-arrow {
  margin: 32px 0;
}
.main-items-box {
  flex: 1;
  background-color: #f9f9f9;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}

.main-items-box .grid-item {
}

.cell-group-box {
  margin-top: 13px;
}

.bottom-btn-box {
  margin: 50px 25px 25px;
}
</style>

<style>
.van-grid-item__content {
  color: #333;
  font-size: 13px;
  padding: 18px 0 !important;
}

.van-grid .van-hairline--bottom::after,
.van-grid .van-hairline--left::after,
.van-grid .van-hairline--right::after,
.van-grid .van-hairline--surround::after,
.van-grid .van-hairline--top-bottom::after,
.van-grid .van-hairline--top::after,
.van-grid .van-hairline::after {
  border: none !important;
}

.grid-item .van-icon--image {
  width: 28px !important;
  height: 28px !important;
}

.van-cell {
  padding: 16px 13px !important;
}

.van-grid-item__text {
  font-family: "PingFangSC-Regular";
  font-size: 13px !important;
  color: #333333 !important;
}

.van-cell:after {
  width: 92% !important;
}

.no-border .van-cell:after {
  border-bottom: none !important;
}

.bottom-btn-box .van-button--small {
  height: 39px !important;
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>