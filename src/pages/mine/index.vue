<template>
  <div class="container">
    <div class="top-info clearfix"
         @click="goNextPage('userItems', 0)">
      <div class="avatar-box fl">
        <img :src="detail.avatar"
             alt="">
        <van-icon v-if="detail.gender === 1"
                  class="gender-i"
                  name="/static/icons/female.png"
                  size="16px" />
        <van-icon v-else
                  class="gender-i"
                  name="/static/icons/male.png"
                  size="16px" />

      </div>
      <div class="fl">
        <div class="name-box">{{detail.username}}</div>
        <div v-if="detail.area"
             class="city-box">{{detail.area}}</div>
        <div v-if="detail.group_id === 0"
             class="company-box">
          <div class="company-info-box clearfix">
            <img class="company-icon fl"
                 src="/static/icons/m-mark.png"
                 alt="">
            <div class="company-name-box fl">
              公司
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
      <div class="bottom-btn-box">
        <van-button color="#97D700"
                    type="primary"
                    size="small"
                    custom-style="font-size: 15px"
                    plain
                    round
                    block>退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/getData'
export default {
  data () {
    return {
      detail: null,
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
      ]
    }
  },

  components: {

  },
  onLoad () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      try {
        const res = await getUserInfo()
        console.log(res)
        if (res.data.code === 1) {
          this.detail = res.data.data
        }
      } catch (error) {

      }
    },
    goNextPage (t, i) {
      console.log(this[t][i].path)
      let url = this[t][i].path
      if (this.detail.group_id === 3) {
        url = '/pages/login/main'
      }
      mpvue.navigateTo({
        url
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
  background-color: aquamarine;
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
  padding-right: 6px;
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

.van-button--small {
  height: 39px !important;
}
</style>