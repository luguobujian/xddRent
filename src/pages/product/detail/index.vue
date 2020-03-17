<template>
  <div class="container">
    <div class="main-box">
      <div class="top-swiper">
        <swiper :autoplay="autoplay"
                :interval="interval"
                :duration="duration"
                @change="bindChange">
          <block v-for="(item, index) in background"
                 :key="index">
            <swiper-item>
              <view class="swiper-item">
                <img :src="item"
                     alt=""></view>
            </swiper-item>
          </block>
        </swiper>
        <div class="indicator-dots-box">
          <div>{{indicatorDots}}</div>/ {{background.length}}
        </div>
      </div>
      <div class="product-info   mb10">
        <div class="price-info">
          <div class="pri-info-box">
            <div class="pri-info">
              <div>¥</div>
              <div class="prb">1400</div>
              <div>/天</div>
            </div>
            <div class="tag">特价</div>
            <div class="o-cost">¥1700/天</div>
          </div>
          <div class="dingj">定金：¥2000/个</div>
        </div>
        <div class="product-name">讯纳箱/Alphard</div>
        <div class="sales-city-box">
          <div class="sales">销量：2397</div>
          <div class="citys">所在地：北京、天津、上海</div>
        </div>
      </div>
      <div class="select-items-box mb10">
        <div class="select-item van-hairline">
          <div class="select-item-left">
            <div class="select-item-left-tit">可用优惠券</div>
            <div class="coupons-box">
              <div class="coupons-item-box">
                <div class="coupons-item">
                  <div>满2000减300</div>
                </div>
              </div>
              <div class="coupons-item-box">
                <div class="coupons-item">
                  <div>满2000减300</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="select-item">
          <div class="select-item-left">
            <div class="select-item-left-tit">选择规格</div>
            <div class="coupons-box"></div>
          </div>
          <div>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div class="rate-box select-items-box mb10">
        <div class="select-item"
             @click="goNextPage">
          <div class="select-item-left">
            <div class="select-item-left-tit">选择规格</div>
            <div class="coupons-box rate-bb">
              <van-rate :value="value"
                        size="12"
                        allow-half
                        readonly="true"
                        color="#97D700;"
                        void-color="#eee"
                        void-icon="star"
                        bind:change="onChange" />4.5分
            </div>

          </div>
          <div>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div class="text-info">
        <div class="text-tit">商品详情</div>
        <div class="text-content">
          新华社北京6月5日电 高考前夕，中共中央政治局委员、国务院副总理孙春兰来到教育部考试中心检查2018年高考准备工作，通过国家教育考试考务指挥系统了解有关地方考场、试卷保管和分发场所等情况，看望高考值班工作人员，并向全国奋战在高考一线的教师、同学们致以诚挚问候，向为高考提供服务保障的各个方面表示感谢。
          <img src="/static/images/banner_1.png"
               alt="">
        </div>
      </div>
    </div>
    <div class="btn-box">
      <van-goods-action>
        <van-goods-action-button text="立即购买"
                                 color="#fff"
                                 text-class="goods-button-left"
                                 type="warning"
                                 plain="true"
                                 size="small"
                                 bind:click="onClickButton" />
        <van-goods-action-button text="租赁"
                                 color="#97D700"
                                 size="small"
                                 bind:click="onClickButton" />
      </van-goods-action>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      background: ['/static/images/banner_1.png', '/static/images/banner_1.png', '/static/images/banner_1.png'],
      indicatorDots: 1,
      vertical: false,
      autoplay: false,
      interval: 2000,
      duration: 500
    }
  },
  methods: {
    bindChange (e) {
      this.indicatorDots = e.mp.detail.current + 1
    },
    onChange (event) {
      this.setData({
        value: event.detail
      })
    },
    goNextPage () {
      wx.navigateTo({
        url: '/pages/product/comment/main'
      })
    }
  }
}
</script>
<style scoped>
.container {
  height: auto;
  position: relative;
}
.main-box {
  flex: 1;
}
swiper {
  height: 375px;
}
.swiper-item,
image {
  width: 100%;
  height: 100%;
}
.top-swiper {
  position: relative;
}
.indicator-dots-box {
  display: flex;
  width: 44px;
  height: 24px;
  color: #fff;
  font-size: 11px;
  line-height: 25.5px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.product-info {
  padding: 15px;
  background: #fff;
}
.indicator-dots-box div {
  font-size: 15px;
  padding-left: 10px;
  padding-right: 3px;
}
.tag {
  display: inline-block;
  /* width: 23px; */
  height: 16px;
  font-size: 10px;
  color: #97d700;
  line-height: 14px;
  text-align: center;
  padding: 1px 4px;
  background: rgba(151, 215, 0, 0.2);
  border-radius: 6px 0 6px 0;
  margin-top: 11px;
  margin-left: 8px;
}
.o-cost {
  display: inline-block;
  font-size: 11px;
  color: #999999;
  line-height: 16px;
  margin-top: 12px;
  margin-left: 8px;
  text-decoration: line-through;
}
.price-info {
  display: flex;
}
.pri-info-box {
  flex: 1;
}
.pri-info {
  display: inline-block;
  color: #97d700;
  font-size: 15px;
  /* display: flex; */
  line-height: 40px;
}
.pri-info div {
  display: inline-block;
}
.pri-info div.prb {
  font-size: 24px;
  line-height: 36px;
}
.dingj {
  float: right;
  font-size: 13px;
  color: #999999;
  margin-top: 11px;
}
.product-name {
  font-size: 16px;
  color: #333333;
  line-height: 22px;
}
.sales-city-box {
  display: flex;
  font-size: 12px;
  line-height: 17px;
  color: #999999;
  margin-top: 15px;
}
.sales {
  flex: 1;
}
.select-items-box {
  padding: 0 15px;
  background: #fff;
}
.select-item {
  display: flex;
}
.select-item-left {
  display: flex;
  flex: 1;
}
.select-item-left-tit {
  flex: 1;
  font-size: 15px;
  color: #333333;
}
.coupon-box {
}
.coupons-item {
  /* display: inline-block; */
  font-size: 11px;
  color: #97d700;
  line-height: 16px;
  padding: 2px 6px;

  border: 1px solid #97d700;
  border-radius: 4px;
  position: relative;
  /* vertical-align: -10%; */
}
.coupons-item::after,
.coupons-item::before {
  content: "";
  width: 6px;
  height: 6px;
  background: #fff;
  border: 1px solid #97d700;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
}
.coupons-item::after {
  right: -4px;
}
.coupons-item::before {
  left: -4px;
}
.coupons-item-box {
  display: inline-block;
  /* height: 24px; */
  padding: 0;
  margin: 20px 4px;
  overflow: hidden;
  vertical-align: -20%;
}
.select-item-left-tit {
  line-height: 62px;
}
.text-info {
  padding: 15px;
  background-color: #fff;
  margin-bottom: 65px;
}
.text-tit {
  font-size: 18px;
  color: #333333;
  padding: 7px 0;
}
.text-content {
  font-size: 15px;
  color: #333333;
  line-height: 28px;
}
.text-content img {
  height: 176px;
  border-radius: 4px;
  padding: 8px 0;
}
</style>
<style lang="">
._van-icon {
  margin: 23px 0 !important;
}
.rate-bb {
  font-size: 15px;
  color: #97d700;
  margin-top: 22px;
}

.van-goods-action-button--first {
  margin-top: 7px;
  margin-bottom: 7px;
  margin-left: 15px !important;
}
.van-goods-action-button--plain {
}
.van-button--plain.van-button--warning {
  color: #97d700 !important;
  border: 1px solid #97d700 !important;
}
.van-goods-action-button--last {
  margin-top: 7px;
  margin-bottom: 7px;
  margin-right: 15px !important;
}
</style>