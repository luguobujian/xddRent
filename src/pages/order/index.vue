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
        <orderItemComponent :dataList="dataList"></orderItemComponent>
      </van-tab>
      <van-tab title="未收货">
        <orderItemComponent :dataList="dataList"></orderItemComponent>
      </van-tab>
      <van-tab title="租赁中">
        <orderItemComponent :dataList="dataList"></orderItemComponent>
      </van-tab>
      <van-tab title="已还货">
        <orderItemComponent :dataList="dataList"></orderItemComponent>
      </van-tab>
    </van-tabs>
    <van-overlay :show="showOverlay"
                 custom-style="background: rgba(0,0,0,.5)"
                 bind:click="onClickHide">
      <view class="wrapper">
        <van-loading size="30px"
                     vertical>加载中...</van-loading>
      </view>
    </van-overlay>
  </div>
</template>

<script>
import orderItemComponent from '@/components/orderItem'
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
  mounted () {

  },
  onPullDownRefresh () {
    // this.page_size += 8
    this.getOrder()
  },
  onReachBottom () {
    this.page_size += 8
    this.getOrder()
  },
  components: {
    orderItemComponent
  },
  methods: {
    async getOrder () {
      try {
        const res = await getOrder({ type: this.active, page: this.page, page_size: this.page_size })
        this.dataList = res.data.data
        this.showOverlay = false
        console.log(res)
        if (res.data.code === 1) {
          this.dataList.forEach((item, key) => {
            let statusText = null
            switch (parseInt(item.status)) {
              case 1:
                statusText = '待支付'
                break
              case 2:
                statusText = '待发货'
                break
              case 3:
                statusText = '待收货'
                break
              case 4:
                statusText = '待确认收货'
                break
              case 5:
                statusText = '租赁中'
                break
              case 6:
                statusText = '租赁中'
                break
              case 7:
                statusText = '租赁中'
                break
              case 8:
                statusText = '退钱中'
                break
              case 9:
                statusText = '已退款'
                break
              default:
                statusText = '已关闭'
                break
            }
            this.dataList[key].statusText = statusText

            let timeDown = item.createtime + (12 * 60 * 60) - (new Date().getTime() / 1000)
            timeDown = timeDown > 0 ? parseInt(timeDown * 1000) : 0
            this.dataList[key].down = timeDown
          })
        }
        console.log(this.dataList)
      } catch (error) {

      }
    },
    onChange (e) {
      this.active = e.mp.detail.name
      this.showOverlay = true
      this.getOrder()
    },
    goNextPage (e) {
      console.log(e)
      mpvue.navigateTo({
        url: `/pages/order/detail/main?id=${e.id}`
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
  background: skyblue;
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
