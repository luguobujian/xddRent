<template>
  <div class="container van-hairline--top">
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
              <div class="prb Oswald-Medium">{{detail.switch===1? detail.pre_price: detail.price}}</div>
              <div>/天</div>
            </div>
            <div v-if="detail.switch === 1"
                 class="tag">特价</div>
            <div v-if="detail.switch === 1"
                 class="o-cost ">¥{{detail.price}}/天</div>
          </div>
          <div class="dingj">定金：¥{{detail.get_price}}/个</div>
        </div>
        <div class="product-name PingFangSC-Medium">{{detail.name}}</div>
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
              <div class="coupons-item-box"
                   v-for="(item, index) in couponsArr"
                   :key="index">
                <div v-if="index < 2"
                     class="coupons-item">
                  <div>满{{item.d_rules}}减{{item.d_price}}</div>
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
                        void-icon="star" />{{detail.goods_valuation}}分
            </div>
          </div>
          <div>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div class="text-info">
        <div class="text-tit PingFangSC-Medium">商品详情
          <van-icon class="a-icon"
                    name="/static/icons/title_bg.png"
                    size="21px"
                    color="#1989fa" />
        </div>
        <div class="text-content">
          <wxParse :content="content"
                   @preview="preview"
                   @navigate="navigate" />
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
                                 @click="openPop('order_now',1)" />
        <van-goods-action-button text="租赁"
                                 color="#97D700"
                                 size="small"
                                 @click="openPop('rent_now',0)" />
      </van-goods-action>
    </div>
    <van-popup :show="showAttrs"
               position="bottom"
               custom-style="height: 78%;width: 100%;border-radius: 8px  8px 0 0!important"
               z-index="999"
               round
               closeable
               @clickOverlay="showAttrs = false"
               @close="closeShowAttrs">
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
                           :max="maxNum"
                           @change="onStepperChange" />
            </div>
          </div>
        </div>
        <div class="btn-box">
          <div class="bottom-btn-margin">
            <van-button color="#97D700"
                        size="small"
                        round
                        block
                        @click="goOrderPage">确定</van-button>

          </div>
          <!-- <van-goods-action>
            <van-goods-action-button text="立即购买"
                                     color="#fff"
                                     text-class="goods-button-left"
                                     type="warning"
                                     plain="true"
                                     size="small"
                                     @click="goOrderPage('order_now',1)" />
            <van-goods-action-button text="租赁"
                                     color="#97D700"
                                     size="small"
                                     @click="goOrderPage('rent_now', 0)" />
          </van-goods-action> -->
        </div>
      </div>
    </van-popup>
    <van-toast id="van-toast" />

  </div>
</template>
<script>
import wxParse from 'mpvue-wxparse'
// import Toast from '../../../../static/vant/toast/toast.js'
import { getGoodsInfo, getCoupons, getGoodsFormat } from '@/api/getData'
let pnum = null
export default {
  data () {
    return {
      goLogin: false,
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

      couponsArr: null,

      showAttrs: false,
      popup_pre_price: 0,
      popup_sell_num: 0,
      maxNum: 1,
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
      sCShow: '',

      is_buy: 0
    }
  },
  components: {
    wxParse
  },
  onLoad (options) {
    console.log(options)
    this.id = options.id
    this.getGoodsInfo()
    this.getCoupons()
    this.getGoodsFormat()
  },
  mounted () {

  },
  methods: {
    async getGoodsInfo () {
      try {
        const res = await getGoodsInfo({ goods_id: this.id })
        console.log('getGoodsInfo', res)
        this.detail = res.data.data
        this.background = res.data.data.images.split(',')
        this.valuation = Number.isInteger(res.data.data.goods_valuation) ? res.data.data.goods_valuation : parseInt(res.data.data.goods_valuation) + 0.5
        this.content = res.data.data.content
      } catch (error) {
        console.log('* getGoodsInfo error', error)
      }
    },
    async getCoupons () {
      try {
        const res = await getCoupons({ goods_id: this.id })
        console.log('* getCoupons', res)
        if (res.data.code === 1) {
          this.goLogin = false
          var arr = res.data.data
          arr.forEach((item, key) => {
            item.d_rules = parseInt(item.del_rules)
            item.d_price = parseInt(item.del_price)
          })
          console.log('ARR', arr)
          this.couponsArr = arr
        }
      } catch (error) {
        console.log('* getCoupons error', error)
        if (error === 401) {
          this.goLogin = true
        }
      }
    },
    async getGoodsFormat () {
      try {
        const res = await getGoodsFormat({ goods_id: this.id })
        console.log('* getGoodsFormat', res)

        if (res.data.code === 1) {
          this.specification = res.data.data.info_list
          this.specificationCom = res.data.data.info_arr
          let tempArr = res.data.data.info_list

          for (let i = 0; i < tempArr.length; i++) {
            for (let j = 0; j < tempArr[i].son.length; j++) {
              if (tempArr[i].son[j].have_num !== 0) {
                this.specificationCombination[i] = tempArr[i].son[j].id
                this.spcCShow[i] = tempArr[i].son[j].format_name
                this.$set(this.specIdxArr, i, `${i}-${j}`)
                break
              }
            }
            this.setPopupChsInfo()
          }
        }
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
    closeShowAttrs () {
      this.sCShow = this.spcCShow.join('/')
      this.showAttrs = false
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
      // console.log(this.sCShow)
      this.setPopupChsInfo()
    },
    setPopupChsInfo () {
      // console.log('---', this.specification.length)
      // console.log('===', this.specIdxArr.length)
      // console.log(this.specificationCombination)

      // this.sCShow = this.spcCShow.join('/')

      let sc = this.specificationCombination.join(',')
      this.popup_pre_price = this.specificationCom[sc] ? this.specificationCom[sc].pre_price : 0
      this.popup_sell_num = this.specificationCom[sc] ? this.specificationCom[sc].num - this.stepperVal : 0
      this.maxNum = (this.specificationCom[sc] ? this.specificationCom[sc].num - this.stepperVal : 0) + 1
      pnum = this.popup_sell_num
    },
    onStepperChange (e) {
      console.log(e.mp.detail)
      let ep = e.mp.detail
      this.stepperVal = e.mp.detail
      this.popup_sell_num = pnum ? pnum - ep + 1 : 0
    },
    goNextPage (r) {
      mpvue.navigateTo({
        url: `${this.routers[r]}?id=${this.id}`
      })
    },
    openPop (a, is) {
      console.log(is)
      this.is_buy = is

      if (this.goLogin) {
        mpvue.showToast({
          title: '未登录:请先登录',
          icon: 'none',
          duration: 2000,
          success () {
            mpvue.navigateTo({
              url: '/pages/login/main'
            })
          }
        })
        return
      }

      if (!this.showAttrs) {
        this.showAttrs = true
      }
    },
    goOrderPage () {
      // if (this.specificationCombination.length !== this.specification.length) {
      // Toast.fail('请选择产品规格')

      // }
      // this.is_buy = is
      let idArrStr = this.specificationCombination.join(',')
      let money = null
      let url = ''
      if (this.is_buy === 1) {
        if (this.detail.switch === 1) {
          money = this.specificationCom[idArrStr].pre_buyprice
        } else {
          money = this.specificationCom[idArrStr].buyprice
        }
        url = '/pages/order_now/main'
        console.log('1', this.specificationCom[idArrStr])
      } else {
        // if (this.detail.switch === 1) {
        //   money = this.specificationCom[idArrStr].pre_price
        // } else {
        //   money = this.specificationCom[idArrStr].price
        // }
        money = this.specificationCom[idArrStr].get_price
        url = '/pages/rent_now/main'
        console.log('0', this.specificationCom[idArrStr])
      }
      let image = this.detail.images.split(',')[0]
      mpvue.navigateTo({
        url: `${url}?id=${this.id}&is_buy=${this.is_buy}&goods_format_id_arr=${idArrStr}&name=${this.detail.name}&img=${image}&money=${money}&stepperVal=${this.stepperVal}&house_id=${this.detail.house_id}&transport_id=${this.detail.transport_id}`
      })

      this.showAttrs = false
    },
    viewImage () {
      mpvue.previewImage({
        current: '/static/images/banner_1.png', // 当前显示图片的http链接
        urls: this.background // 需要预览的图片http链接列表
      })
    },
    parseParams (data) {
      try {
        var tempArr = []
        for (var i in data) {
          var key = encodeURIComponent(i)
          var value = encodeURIComponent(data[i])
          tempArr.push(key + '=' + value)
        }
        var urlParamsStr = tempArr.join('&')
        return urlParamsStr
      } catch (err) {
        return ''
      }
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
  /* margin-top: 11px; */
  margin-left: 8px;
  vertical-align: 18%;
}
.o-cost {
  display: inline-block;
  font-size: 11px;
  color: #999999;
  line-height: 16px;
  margin-top: 12px;
  margin-left: 8px;
  text-decoration: line-through;
  vertical-align: 9%;
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
  width: 250px;
  line-height: 62px;
  text-align: right;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* word-break: normal;
  word-wrap: break-word; */
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
  line-height: 60px;
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
  position: relative;
}
.a-icon {
  position: absolute;
  top: -15px;
  left: 56px;
}
.text-content {
  font-size: 15px;
  color: #333333;
  line-height: 28px;
  overflow: hidden;
}
.text-content img {
  /* height: 176px; */
  border-radius: 4px;
  padding: 8px 0;
}

.btn-box {
  height: 73px;
  padding-bottom: env(safe-area-inset-bottom);
}
/* ===========popup=========== */
.attrs-box {
  display: flex;
  height: 100%;
  padding: 0 15px;
  flex-direction: column;
}
.popup-main-box {
  flex: 1;
  overflow: auto;
}
.product-info-box {
  display: flex;
  padding-top: 20px;
  padding-bottom: 15px;
}
.product-info-img img {
  width: 85px;
  height: 85px;
  /* background-color: aquamarine; */
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
.bottom-btn-margin {
  padding: 15px 0 !important;
}
</style>
<style>
.wxParse {
  word-wrap: break-word;
  word-break: normal;
}
._van-icon {
  margin: 23px 0 !important;
}
.rate-bb {
  font-size: 15px;
  color: #97d700;
  margin-top: 18px;
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
  /* border-radius: 2px !important; */
  margin: 0 !important;
}
.van-stepper__minus {
  border-top-left-radius: 2px !important;
  border-bottom-left-radius: 2px !important;
}
.van-stepper__plus {
  border-top-right-radius: 2px !important;
  border-bottom-right-radius: 2px !important;
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
.van-button--small {
  color: #fff;
  height: 40px !important;
}
</style>