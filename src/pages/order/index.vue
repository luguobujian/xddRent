<template>
  <div class="container">
    <van-tabs sticky
              swipeable
              lazy-render="false"
              :active="active"
              swipe-threshold=5
              line-width="20"
              @change="onChange">
      <van-tab title="全部">
        <orderItemComponent :dataList="dataList"
                            tipBoxTop="144px"
                            @childEvent="goNextPage"></orderItemComponent>
        <!-- <div class="items-box">
          <div class="item"
               v-for="(item, index) in dataList"
               :key="index"
               @click="goNextPage">
            <div class="order-no-info-box van-hairline">
              <div class="order-no-box">订单编号：{{item.order_id}}</div>
              <div class="order-status-box PingFangSC-Medium">{{ (item.status === '2' && item.get_methods ===1)?'待提货' :item.statusText}}</div>
            </div>
            <div class="product-info-box van-hairline">
              <div class="product-img-box">
                <img class="product-img"
                     :src="item.goodsimages"
                     alt="">
              </div>
              <div class="product-text-box">
                <div class="product-name PingFangSC-Medium">{{item.goods_name}}</div>
                <div class="product-skus-n">
                  <span class="product-skus">{{item.goods_format}}</span>
                  <span class="product-n">x{{item.goods_num}}</span>
                </div>
              </div>
            </div>
            <div class="btns-info-box">
              <div class="info-p-box Oswald-Medium">合计:¥{{item.pay_price}}</div>
              <div class="btns-box"
                   v-if="item.status !== '9'">
                <van-button v-if="item.status === '1' || item.status === '2' || item.status === '3'"
                            plain
                            size="small"
                            color="#DDDDDD"
                            custom-style="width: 80px"
                            round
                            type="default">取消订单</van-button>
                <van-button v-if="item.status === '1'"
                            size="small"
                            color="#97d700"
                            custom-style="width: 80px"
                            round
                            type="primary">去支付</van-button>
                <van-button v-if="item.status === '11'"
                            size="small"
                            plain
                            color="#97d700"
                            custom-style="width: 80px"
                            round
                            type="primary">上传支付凭证</van-button>
                <van-button v-if="item.status === '2' && item.get_methods === 2"
                            plain
                            size="small"
                            color="#DDDDDD"
                            custom-style="width: 80px"
                            round
                            type="default">查看物流</van-button>
                <van-button v-if="item.status === '5'  || item.status === '6' || item.status === '7'"
                            plain
                            size="small"
                            color="#DDDDDD"
                            custom-style="width: 80px"
                            round
                            type="default">申请售后</van-button>
                <van-button v-if="item.status === '5'  || item.status === '6' || item.status === '7'"
                            size="small"
                            color="#97d700"
                            custom-style="width: 80px"
                            round
                            type="primary">返还</van-button>
              </div>
              <div class="btns-box"
                   v-if="item.get_price">
                <div class="return-box money">
                  <div class="return-box-tit">已返还金额:</div>
                  <div class="money-tip">¥</div>{{item.get_price}}
                </div>
              </div>
            </div>
            <div v-if="item.status === '9' && item.down > 0"
                 class="count-down ">
              <van-count-down :time="item.down"
                              format="HH 时 mm 分" />后关闭
            </div>
          </div>
        </div> -->
      </van-tab>
      <van-tab title="未支付">
        <orderItemComponent :dataList="dataList"
                            tipBoxTop="144px"
                            @childEvent="goNextPage"></orderItemComponent>
      </van-tab>
      <van-tab title="未收货">
        <orderItemComponent :dataList="dataList"
                            tipBoxTop="144px"
                            @childEvent="goNextPage"></orderItemComponent>
      </van-tab>
      <van-tab title="租赁中">
        <orderItemComponent :dataList="dataList"
                            tipBoxTop="144px"
                            @childEvent="goNextPage"></orderItemComponent>
      </van-tab>
      <van-tab title="已还货">
        <orderItemComponent :dataList="dataList"
                            tipBoxTop="144px"
                            @childEvent="goNextPage"></orderItemComponent>
      </van-tab>
    </van-tabs>
    <nomoreComponents :tipBoxTop="tipBoxTop"
                      tipSrc="ndingdan.png"
                      noTip="暂无订单"
                      :dataList="dataList"></nomoreComponents>
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
import orderItemComponent from '@/components/orderItem'
import nomoreComponents from '@/components/nomore'

import { getOrder } from '@/api/getData'
export default {
  data () {
    return {
      active: 0,
      showOverlay: true,
      page: 1,
      page_size: 8,
      dataList: null
    }
  },
  onLoad () {
    this.getOrder()
  },
  onShow () {
    this.getOrder()
  },
  mounted () {

  },
  onPullDownRefresh () {
    // this.page_size += 8
    this.showOverlay = true
    this.getOrder()
  },
  onReachBottom () {
    this.page_size += 8
    this.getOrder()
  },
  components: {
    orderItemComponent,
    nomoreComponents
  },
  methods: {
    async getOrder () {
      try {
        setTimeout(() => { wx.stopPullDownRefresh() }, 1200)
        const res = await getOrder({ type: this.active, page: this.page, page_size: this.page_size })
        this.dataList = res.data.data
        this.showOverlay = false
        console.log(res)
        if (res.data.code === 1) {
          this.dataList.forEach((val, key) => {
            let statusText = null
            let customMark = null
            if (val.is_del === 2) {
              statusText = '已取消'
              customMark = 'YQX'
            } else if (val.status === '1') {
              statusText = '待支付'
              customMark = 'DZF'
            } else if (val.is_buy === 1 && val.get_methods === 1 && (val.status === '3' || val.status === '2' || val.status === '4')) {
              statusText = '待提货' // 待取货
              customMark = 'DTH'
            } else if (val.is_buy === 1 && val.status === '2') {
              statusText = '待发货'
              customMark = 'DFH'
            } else if (val.is_buy === 1 && val.status === '3') {
              statusText = '待收货'
              customMark = 'DSH'
            } else if (val.is_buy === 1 && val.status === '0') {
              statusText = '已关闭'
              customMark = 'YGB'
            } else if (val.status === '11' || val.status === '12') {
              statusText = '待确认'
              customMark = 'DQR'
            } else if (val.is_buy === 1) {
              statusText = '已收货' // 已完成
              customMark = 'YWC'
            } else if (val.is_buy === 0 && val.get_methods === 1 && (val.status === '3' || val.status === '2' || val.status === '4')) {
              statusText = '待提货' // 待取货
              customMark = 'DTH'
            } else if (val.is_buy === 0 && val.status === '2') {
              statusText = '待发货'
              customMark = 'DFH'
            } else if (val.is_buy === 0 && val.status === '3') {
              statusText = '待收货'
              customMark = 'DSH'
            } else if (val.is_buy === 0 && (val.status === '5' || val.status === '6')) {
              statusText = '租赁中'
              customMark = 'ZLZ'
            } else if (val.is_buy === 0 && val.status === '7') {
              statusText = '租赁中'
              customMark = 'ZLZ'
            } else if (val.is_buy === 0 && val.status === '8') {
              statusText = '退定金中'
              customMark = 'TDJZ'
            } else if (val.is_buy === 0 && val.status === '9') {
              statusText = '已退款'
              customMark = 'YTK'
            } else if (val.is_buy === 0 && val.status === '10') {
              statusText = '已归还'
              customMark = 'YGH'
            } else if (val.is_buy === 0 && val.status === '0') {
              statusText = '已关闭'
              customMark = 'YGB'
            }
            // else if(){
            //   statusText = '未知'
            // }
            this.dataList[key].statusText = statusText
            this.dataList[key].customMark = customMark
            let timeDown = val.createtime + (12 * 60 * 60) - (new Date().getTime() / 1000)

            if (val.status === '1') {
              timeDown = timeDown > 0 ? parseInt(timeDown * 1000) : 0
            } else {
              timeDown = 0
            }

            this.dataList[key].down = timeDown
          })
        }
        console.log(this.dataList)
      } catch (error) {
        console.log('* getOrder error', error)
        this.showOverlay = false
      }
    },
    onChange (e) {
      console.log(e)
      this.active = e.mp.detail.name
      this.dataList = []
      this.showOverlay = true
      this.page_size = 8
      this.getOrder()
    },
    goNextPage (e) {
      console.log(e)
      mpvue.navigateTo({
        url: `/pages/order/detail/main?id=${e.id}&mark=${e.mark}&statusText=${e.statusText}`
      })
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.item {
  padding: 0 15px;
  background: #fff;
  margin-bottom: 10px;
}
.order-no-info-box {
  display: flex;
  font-size: 13px;
  color: #999999;
  padding: 11px 0;
}
.order-no-box,
.order-status-box {
  flex: 1;
}
.order-status-box {
  color: #97d700;
  text-align: right;
}
.product-info-box {
  display: flex;
  padding: 15px 0;
}

.product-text-box {
  flex: 1;
}
.product-img-box {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.product-img {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  /* background: skyblue; */
}
.product-name {
  font-size: 13px;
  line-height: 18px;
  color: #333333;
  margin-top: 4px;
}
.product-skus-n {
  display: flex;
  font-size: 12px;
  color: #999999;
  line-height: 17px;
  margin-top: 8px;
}
.product-skus,
.product-n {
  flex: 1;
}
.product-n {
  text-align: right;
}
.btns-info-box {
  padding: 8px 0;
}
.btns-info-box {
  display: flex;
}
.info-p-box {
  font-size: 14px;
  color: #333333;
  line-height: 30px;
}
.count-down {
  text-align: right;
  font-size: 13px;
  color: #333333;
  padding-bottom: 8px;
}
.btns-box {
  flex: 1;
  font-size: 13px;
  text-align: right;
  line-height: 30px;
}
.return-box {
  font-size: 15px;
  font-family: "Oswald-Medium";
}
.return-box div {
  display: inline-block;
}
.return-box-tit {
  color: #333;
  font-size: 13px;
  font-family: "PingFangSC-Regular";
}
.money-tip {
  font-size: 13px;
}
.money {
  color: #97d700;
}
</style>
<style >
.van-hairline--top-bottom::after {
  border-top: none !important;
}

.van-tabs__line {
  width: 20 !important;
  background-color: #97d700 !important;
}
.van-button--small {
  /* color: #fff; */
  height: 30px !important;
  margin-left: 10px;
}
._van-count-down {
  color: #333333 !important;
  font-size: 13px !important;
}
.van-count-down {
  display: inline-block;
  font-size: 13px !important;
}
</style>
