<template>
  <div class="container van-hairline--top">
    <div class="billing-detail-box"
         v-for="(item, index) in detailList"
         :key="index">
      <div class="title-box clearfix">
        <div class="fl">{{item.code_type === 1? '提现': '提成收益'}}</div>
        <div class="fr">{{item.code_type === 1? '-¥': '+¥'}}{{item.money}}</div>
      </div>
      <div class="user-info-box">
        <div class="small-avatar-box">
          <img class="avatar"
               :src="item.userInfo.avatar || '/static/icons/nophoto.png'"
               alt="">
        </div>
        <span class="name-box">{{item.userInfo.username}}</span>
        <span class="tel-box">{{item.userInfo.mobile}}</span>
      </div>
      <div class="some-info-box">订单号：{{item.order}}</div>
      <div class="some-info-box">订单金额：¥{{item.ymdhms}}</div>
      <div class="some-info-box">订单日期：{{item.ymdhms}}</div>
    </div>
    <!-- <div class="itmes-box">
      <div v-for="(item, index) in detailList"
           :key="index"
           class="item">
        <div class="title-box clearfix">
          <div class="fl">{{item.code_type === 1? '提现': '提成收益'}}</div>
          <div class="fr">{{item.code_type === 1? '-¥': '+¥'}}{{item.money}}</div>
        </div>
        <div class="some-info-box">订单号：{{item.order}}</div>
        <div class="some-info-box">订单日期：{{item.ymdhms}}</div>
      </div>
    </div> -->
    <nomoreComponents :tipBoxTop="tipBoxTop"
                      :tipSrc="tipSrc"
                      :dataList="detailList"></nomoreComponents>
  </div>
</template>
<script>
import moment from 'moment'

import { walletRecord } from '@/api/getData'
export default {
  data () {
    return {
      detailList: null
    }
  },
  onLoad () {
    this.walletRecord()
  },
  methods: {
    async walletRecord () {
      try {
        const res = await walletRecord()
        console.log(res)
        if (res.data.code === 1) {
          let arr = res.data.data
          arr.forEach((item, key) => {
            item.ymdhms = moment(item.time * 1000).format('YYYY-MM-DD HH:mm:ss ')
          })
          this.detailList = arr
        }
      } catch (error) {

      }
    }
  }
}
</script>
<style scope>
.container {
  font-size: 13px;
  color: #666666;
}
.billing-detail-box {
  background-color: #fff;
  padding: 0 15px 15px;
  margin-bottom: 10px;
}
.title-box {
  font-size: 15px;
  color: #333333;
  font-weight: bold;
  padding-top: 16px;
  padding-bottom: 5px;
}
.user-info-box {
  margin-top: 8px;
}
.small-avatar-box {
  display: inline-block;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  vertical-align: -40%;
}
.small-avatar-box .avatar {
  width: 25px;
  height: 25px;
  /* background-color: seagreen; */
  border-radius: 50%;
}
.name-box {
  font-size: 13px;
  color: #333333;
  font-weight: bold;
  margin-right: 10px;
}
.some-info-box {
  line-height: 18px;
  margin-top: 5px;
}
.itmes-box {
  flex: 1;
}
.item {
  background-color: #fff;
  padding: 0 15px 15px;
  margin-bottom: 10px;
}
</style>