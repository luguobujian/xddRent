<template>
  <div class="container">
    <van-tabs sticky
              :active="active"
              swipe-threshold=5
              line-width="20"
              bind:change="onChange">
      <van-tab title="全部">
        <div class="items-box">
          <div class="item"
               @click="goNextPage">
            <div class="order-no-info-box van-hairline">
              <div class="order-no-box">订单编号：283728462421</div>
              <div class="order-status-box">待支付</div>
            </div>
            <div class="product-info-box van-hairline">
              <div class="product-img-box">
                <img class="product-img"
                     src=""
                     alt="">
              </div>
              <div class="product-text-box">
                <div class="product-name">讯纳箱/Alphard</div>
                <div class="product-skus-n">
                  <span class="product-skus">红色/大号</span>
                  <span class="product-n">x1</span>
                </div>
              </div>
            </div>
            <div class="btns-info-box">
              <div class="info-p-box">合计:¥20000.00</div>
              <div class="btns-box">
                <van-button plain
                            size="small"
                            color="#DDDDDD"
                            round
                            type="default">取消订单</van-button>
                <van-button plain
                            size="small"
                            color="#97d700"
                            round
                            type="primary">去支付</van-button>
              </div>
            </div>
            <div class="count-down ">15小时25分后关闭</div>
          </div>
          <div class="item">
            <div class="order-no-info-box van-hairline">
              <div class="order-no-box">订单编号：283728462421</div>
              <div class="order-status-box">待支付</div>
            </div>
            <div class="product-info-box van-hairline">
              <div class="product-img-box">
                <img class="product-img"
                     src=""
                     alt="">
              </div>
              <div class="product-text-box">
                <div class="product-name">讯纳箱/Alphard</div>
                <div class="product-skus-n">
                  <span class="product-skus">红色/大号</span>
                  <span class="product-n">x1</span>
                </div>
              </div>
            </div>
            <div class="product-info-box van-hairline">
              <div class="product-img-box">
                <img class="product-img"
                     src=""
                     alt="">
              </div>
              <div class="product-text-box">
                <div class="product-name">讯纳箱/Alphard</div>
                <div class="product-skus-n">
                  <span class="product-skus">红色/大号</span>
                  <span class="product-n">x1</span>
                </div>
              </div>
            </div>
            <div class="btns-info-box">
              <div class="info-p-box">合计:¥20000.00</div>
              <div class="btns-box">
                <van-button plain
                            size="small"
                            color="#DDDDDD"
                            round
                            type="default">取消订单</van-button>
                <van-button plain
                            size="small"
                            color="#97d700"
                            round
                            type="primary">上传支付凭证</van-button>
              </div>
            </div>
            <!-- <div class="count-down ">15小时25分后关闭</div> -->
          </div>
          <div class="item">
            <div class="order-no-info-box van-hairline">
              <div class="order-no-box">订单编号：283728462421</div>
              <div class="order-status-box">待支付</div>
            </div>
            <div class="product-info-box van-hairline">
              <div class="product-img-box">
                <img class="product-img"
                     src=""
                     alt="">
              </div>
              <div class="product-text-box">
                <div class="product-name">讯纳箱/Alphard</div>
                <div class="product-skus-n">
                  <span class="product-skus">红色/大号</span>
                  <span class="product-n">x1</span>
                </div>
              </div>
            </div>
            <div class="product-info-box van-hairline">
              <div class="product-img-box">
                <img class="product-img"
                     src=""
                     alt="">
              </div>
              <div class="product-text-box">
                <div class="product-name">讯纳箱/Alphard</div>
                <div class="product-skus-n">
                  <span class="product-skus">红色/大号</span>
                  <span class="product-n">x1</span>
                </div>
              </div>
            </div>
            <div class="btns-info-box">
              <div class="info-p-box">合计:¥20000.00</div>
              <div class="btns-box">
                <van-button plain
                            size="small"
                            color="#DDDDDD"
                            round
                            type="default">取消订单</van-button>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="order-no-info-box van-hairline">
              <div class="order-no-box">订单编号：283728462421</div>
              <div class="order-status-box">待支付</div>
            </div>
            <div class="product-info-box van-hairline">
              <div class="product-img-box">
                <img class="product-img"
                     src=""
                     alt="">
              </div>
              <div class="product-text-box">
                <div class="product-name">讯纳箱/Alphard</div>
                <div class="product-skus-n">
                  <span class="product-skus">红色/大号</span>
                  <span class="product-n">x1</span>
                </div>
              </div>
            </div>
            <div class="product-info-box van-hairline">
              <div class="product-img-box">
                <img class="product-img"
                     src=""
                     alt="">
              </div>
              <div class="product-text-box">
                <div class="product-name">讯纳箱/Alphard</div>
                <div class="product-skus-n">
                  <span class="product-skus">红色/大号</span>
                  <span class="product-n">x1</span>
                </div>
              </div>
            </div>
            <div class="btns-info-box">
              <div class="info-p-box">合计:¥20000.00</div>
              <div class="btns-box">
                <span>已返金额：</span><span class="money">¥1200.00</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="未支付">内容 2</van-tab>
      <van-tab title="未收货">内容 3</van-tab>
      <van-tab title="租赁中">内容 4</van-tab>
      <van-tab title="已还货">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>

export default {
  data () {
    return {
      active: 0
    }
  },
  mounted () {

  },
  methods: {
    onChange (event) {
      mpvue.showToast({
        title: `切换到标签 ${event.detail.name}`,
        icon: 'none'
      })
    },
    goNextPage () {
      mpvue.navigateTo({
        url: '/pages/order/detail/main'
      })
    }
  }
}
</script>

<style scoped>
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
.money {
  color: #97d700;
}
</style>
<style >
.van-tabs__line {
  width: 20 !important;
  background-color: #97d700 !important;
}
.van-button--small {
  /* color: #fff; */
  height: 30px !important;
  margin-left: 10px;
}
</style>
