<template>
  <div class="container">
    <div class="main-box">
      <div class="top-swiper"
           @click="viewImage">
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
              <div class="prb">{{detail.pre_price}}</div>
              <div>/天</div>
            </div>
            <div v-if="detail.switch === 1"
                 class="tag">特价</div>
            <div class="o-cost">¥{{detail.price}}/天</div>
          </div>
          <div class="dingj">定金：¥{{detail.get_price}}/个</div>
        </div>
        <div class="product-name">{{detail.name}}</div>
        <div class="sales-city-box">
          <div class="sales">销量：{{detail.sell_num}}</div>
          <div class="citys">所在地：{{detail.loacl}}</div>
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
        <div class="select-item"
             @click="showAttrs=true">
          <div class="select-item-left">
            <div class="select-item-left-tit">选择规格</div>
            <div class="coupons-box spec">{{sCShow}}</div>
          </div>
          <div>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div class="rate-box select-items-box mb10">
        <div class="select-item"
             @click="goNextPage('comment')">
          <div class="select-item-left">
            <div class="select-item-left-tit">商品评价</div>
            <div class="coupons-box rate-bb">
              <van-rate :value="valuation"
                        size="12"
                        allow-half
                        readonly="true"
                        color="#97D700;"
                        void-color="#eee"
                        void-icon="star"
                        bind:change="onChange" />{{detail.goods_valuation}}分
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
          <wxParse :content="content"
                   @preview="preview"
                   @navigate="navigate" />
          <!-- 新华社北京6月5日电 高考前夕，中共中央政治局委员、国务院副总理孙春兰来到教育部考试中心检查2018年高考准备工作，通过国家教育考试考务指挥系统了解有关地方考场、试卷保管和分发场所等情况，看望高考值班工作人员，并向全国奋战在高考一线的教师、同学们致以诚挚问候，向为高考提供服务保障的各个方面表示感谢。
          <img src="/static/images/banner_1.png"
               alt=""> -->
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
                                 @click="showAttrs = true" />
        <van-goods-action-button text="租赁"
                                 color="#97D700"
                                 size="small"
                                 @click="showAttrs = true" />
      </van-goods-action>
    </div>
    <van-popup :show="showAttrs"
               position="bottom"
               custom-style="height: 78%;width: 100%;border-radius: 8px !important"
               z-index="999"
               round
               closeable
               @clickOverlay="showAttrs = false"
               @close="showAttrs = false">
      <div class="attrs-box">
        <div class="product-info-box">
          <div class="product-info-img">
            <img :src="background[0]"
                 alt="">
          </div>
          <div>
            <div class="product-info-name">{{detail.name}}</div>
            <div class="product-info-price-box">
              <div>¥</div>
              <div class="product-info-price">{{popup_pre_price}}</div>
              <div>/天</div>
            </div>
            <div class="product-info-num">库存：{{popup_sell_num}}</div>
          </div>
        </div>
        <div class="popup-main-box">
          <div class="attrs-lists-box"
               v-for="(item, index) in specification"
               :key="index">
            <div class="attrs-lists-tit">{{item.format_name}}</div>
            <div class="attrs-lists-main">
              <div class="attrs-lists"
                   :class="{nomore: itm.have_num === 0, active: specIdxArr[index] === (index+'-'+idx)}"
                   v-for="(itm, idx) in item.son"
                   :key="idx"
                   :data-id="itm.id"
                   :data-name="itm.format_name"
                   :data-index="index"
                   :data-idx="idx"
                   :data-loca="index+'-'+idx"
                   :data-have="itm.have_num"
                   @click="chsSpecItem">
                {{itm.format_name}}
              </div>
            </div>
          </div>

          <div class="stepper-btn-box attrs-lists-box">
            <div class=" attrs-lists-tit">购买数量</div>
            <div class="stepper-btn-main">
              <van-stepper :value="stepperVal"
                           @change="onStepperChange" />
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
                                     @click="goNextPage('order_now')" />
            <van-goods-action-button text="租赁"
                                     color="#97D700"
                                     size="small"
                                     @click="goNextPage('rent_now')" />
          </van-goods-action>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import wxParse from 'mpvue-wxparse'
import { getGoodsInfo, getGoodsFormat } from '@/api/getData'
let pnum = null
export default {
  data () {
    return {
      routers: {
        comment: `/pages/product/comment/main`,
        order_now: '/pages/order_now/main',
        rent_now: '/pages/rent_now/main'
      },
      background: ['/static/images/banner_1.png'],
      indicatorDots: 1,
      vertical: false,
      autoplay: false,
      interval: 2000,
      duration: 500,

      showAttrs: false,
      popup_pre_price: 0,
      popup_sell_num: 0,
      stepperVal: 1,

      id: null,
      detail: null,
      valuation: null,
      content: null,
      specification: null,
      specificationCom: null,
      specIdxArr: [],
      specificationCombination: [],
      spcCShow: [],
      sCShow: ''
    }
  },
  components: {
    wxParse
  },
  onLoad (options) {
    console.log(options)
    this.id = options.id
    this.getGoodsInfo()
    this.getGoodsFormat()
  },
  mounted () {

  },
  methods: {
    async getGoodsInfo () {
      try {
        const res = await getGoodsInfo({ goods_id: this.id })
        console.log(res)
        this.detail = res.data.data
        this.background = res.data.data.images.split(',')
        this.valuation = Number.isInteger(res.data.data.goods_valuation) ? res.data.data.goods_valuation : parseInt(res.data.data.goods_valuation) + 0.5
        this.content = res.data.data.content
      } catch (error) {
        console.log('* getGoodsInfo error', error)
      }
    },
    async getGoodsFormat () {
      try {
        const res = await getGoodsFormat({ goods_id: this.id })
        this.specification = res.data.data.info_list
        this.specificationCom = res.data.data.info_arr
        console.log('* getGoodsFormat', res)
      } catch (error) {
        console.log('* getGoodsFormat error', error)
      }
    },
    bindChange (e) {
      this.indicatorDots = e.mp.detail.current + 1
    },
    onChange (event) {
      this.setData({
        value: event.detail
      })
    },
    chsSpecItem (e) {
      let have = e.mp.currentTarget.dataset.have
      if (!have) return
      let id = e.mp.currentTarget.dataset.id
      let name = e.mp.currentTarget.dataset.name
      let sindex = e.mp.currentTarget.dataset.index
      let specLoca = e.mp.currentTarget.dataset.loca
      this.specIdxArr.includes(specLoca) ? this.$set(this.specIdxArr, sindex, '') : this.$set(this.specIdxArr, sindex, specLoca)
      if (this.specificationCombination.includes(id)) {
        this.specificationCombination[sindex] = ''
        this.spcCShow[sindex] = ''
      } else {
        this.specificationCombination[sindex] = id
        this.spcCShow[sindex] = name
      }
      this.sCShow = this.spcCShow.join('/')
      console.log(this.sCShow)
      this.setPopupChsInfo()
    },
    setPopupChsInfo () {
      // console.log('---', this.specification.length)
      // console.log('===', this.specIdxArr.length)
      // console.log(this.specificationCombination)

      let sc = this.specificationCombination.join(',')
      this.popup_pre_price = this.specificationCom[sc] ? this.specificationCom[sc].pre_price : 0
      this.popup_sell_num = this.specificationCom[sc] ? this.specificationCom[sc].num - this.stepperVal : 0
      pnum = this.popup_sell_num
    },
    onStepperChange (e) {
      console.log(e)
      let ep = e.mp.detail
      this.stepperVal = e.mp.detail
      this.popup_sell_num = pnum ? pnum - ep + 1 : 0
    },
    goNextPage (r) {
      mpvue.navigateTo({
        url: `${this.routers[r]}?id=${this.id}`
      })
    },
    viewImage () {
      mpvue.previewImage({
        current: '/static/images/banner_1.png', // 当前显示图片的http链接
        urls: this.background // 需要预览的图片http链接列表
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
.coupons-box.spec {
  line-height: 62px;
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
  margin-bottom: 10px;
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

.btn-box {
  height: 70px;
}
/* ===========popup=========== */
.attrs-box {
  display: flex;
  height: 100%;
  padding: 0 15px;
  flex-direction: column;
}
.popup-main-box {
  overflow: auto;
  margin-bottom: 10px;
}
.product-info-box {
  display: flex;
  margin-top: 20px;
  margin-bottom: 15px;
}
.product-info-img img {
  width: 85px;
  height: 85px;
  background-color: aquamarine;
  margin-right: 10px;
}
.product-info-name {
  font-size: 13px;
  color: #333333;
  line-height: 18px;
}
.product-info-price-box div {
  display: inline-block;
  font-size: 11px;
  color: #97d700;
}
.product-info-price-box .product-info-price {
  font-size: 15px;
  line-height: 22px;
  margin: 5px 0 23px;
}
.product-info-num {
  font-size: 12px;
  color: #999999;
  line-height: 17px;
}
.attrs-lists-box {
  /* padding-top: 15px; */
}
.attrs-lists-tit {
  font-size: 14px;
  color: #333333;
  padding: 10px 0;
}
.attrs-lists-main {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
}
.attrs-lists {
  font-size: 12px;
  color: #666666;
  line-height: 16px;
  padding: 5px 20px;
  background: #f6f6f6;
  border: 1px solid #f6f6f6;
  border-radius: 14px;
  margin-bottom: 10px;
  margin-right: 11px;
}
.attrs-lists.nomore {
  color: #ccc;
  background: #fcfcfc;
}
.attrs-lists.active {
  font-size: 12px;
  color: #97d700;
  background: rgba(151, 215, 0, 0.06);
  border: 1px solid #97d700;
}
.attrs-lists:nth-child(4n) {
  margin-right: 0;
}
</style>
<style>
._van-icon {
  margin: 23px 0 !important;
}
.rate-bb {
  font-size: 15px;
  color: #97d700;
  margin-top: 22px;
}
.van-goods-action--safe {
  z-index: 999;
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
.van-stepper__minus,
.van-stepper__input,
.van-stepper__plus {
  background-color: #fff !important;
  border: 1px solid #e1e1e5 !important;
  border-radius: 2px !important;
  margin: 0 !important;
}
.van-stepper__input {
  border-left: none !important;
  border-right: none !important;
}
.van-goods-action-button--last {
  margin-top: 15px !important;
  margin-bottom: 15px !important;
  margin-right: 15px !important;
}
</style>