<template>
  <div class="container van-hairline--top">
    <div class="main-box">
      <div class="mb10">
        <van-cell-group>
          <div class="sbb-cell-box">
            <van-field label="取货方式"
                       disabled />
            <div class="switch-btn-box">
              <div :class="{ active: switchIdx == 1 }"
                   @click="onSwitchBtn(1)">
                自提
              </div>
              <div :class="{ active: switchIdx == 2 }"
                   @click="onSwitchBtn(2)">
                配送
              </div>
            </div>
          </div>
          <div class="quhuo-addr"
               v-if="switchIdx == 2"
               @click="goNextPage('address')">
            <van-field readonly
                       label="收货地址"
                       right-icon="arrow"
                       :value="address.val" />
            <div class="addr van-hairline">
              <div v-if="address.id"
                   class="cell-title"
                   style="max-width:90px;min-width:90px"></div>
              <div v-if="address.id"
                   class="cell-value">
                {{ address.text }}
              </div>
            </div>
          </div>

          <!-- <van-field :value="date"
                     label="取货时间"
                     input-align="right"
                     readonly
                     right-icon="arrow"
                     @click="showDate = true" />
          <van-field v-model="number"
                     label="联系人"
                     input-align="right"
                     placeholder="请输入姓名" />
          <van-field v-model="password"
                     label="联系电话码"
                     input-align="right"
                     placeholder="请输入电话" /> -->
          <div v-if="switchIdx == 1"
               class="quhuo-addr"
               @click="goNextPage('warehouse')">
            <van-field :value="warehouse.tit"
                       readonly
                       label="取货仓库"
                       right-icon="arrow" />
            <div class="addr van-hairline ">
              <div v-if="warehouse.id"
                   class="cell-title"
                   style="max-width:90px;min-width:90px"
                   input-class="PingFangSC-Medium"></div>
              <div v-if="warehouse.id"
                   class="cell-value ">{{warehouse.val}}</div>
            </div>
          </div>

          <van-field v-if="switchIdx == 1"
                     :value="date"
                     label="取货时间"
                     input-align="right"
                     readonly
                     right-icon="arrow"
                     @click="showDate = true" />
          <van-field v-if="switchIdx == 1"
                     :value="get_people"
                     label="联系人"
                     input-align="right"
                     placeholder="请输入姓名"
                     placeholder-style="font-size:15px;color:#BBBBBB;font-family:PingFangSC-Regular;"
                     @input="onInputNameKey" />
          <van-field v-if="switchIdx == 1"
                     :value="get_phone"
                     label="联系电话码"
                     input-align="right"
                     placeholder="请输入电话"
                     placeholder-style="font-size:15px;color:#BBBBBB;font-family:PingFangSC-Regular;"
                     @input="onInputPhoneKey" />
        </van-cell-group>
      </div>
      <div class="product-s-box mb10">
        <div class="product-box van-hairline">
          <div class="product-img-box">
            <img :src="productImg"
                 alt="" />
          </div>
          <div class="product-right-box">
            <div class="product-name PingFangSC-Medium">{{productName}}</div>
            <div class="product-bottom">
              <van-stepper :value="productNum"
                           @change="onChange" />
            </div>
          </div>
        </div>
        <van-cell-group>
          <!-- <van-field readonly
                     label="租赁时长"
                     right-icon="arrow"
                     @click="showPicker = true" /> -->
          <van-field :value="text"
                     label="订单备注"
                     input-align="right"
                     placeholder="请输入备注(100字内)"
                     placeholder-style="font-size:15px;color:#BBBBBB;font-family:PingFangSC-Regular;"
                     @input="onInputTextKey" />
        </van-cell-group>
      </div>
      <div class="mb10">
        <van-collapse :value="activeNames"
                      @change="onChange1">
          <van-collapse-item custom-class="mb10"
                             title="金额"
                             :value="allMoney"
                             name="1"
                             is-link="false">
            <van-icon name="/static/icons/arrow-down.png"
                      slot="right-icon" />
            <div class="collapse-itm-box">
              <div class="collapse-itm-l">
                <div class="collapse-itm-l-l">{{productName}}</div>
                <div class="collapse-itm-l-r PingFangSC-Medium">x{{productNum}}</div>
              </div>
              <div class="collapse-itm-r PingFangSC-Medium">{{allMoney}}</div>
            </div>
          </van-collapse-item>
          <van-collapse-item v-if="transfer_fee"
                             title="运费"
                             :value="transfer_fee"
                             name="2"
                             is-link="false">
            <div class="collapse-itm-box">
              <div class="collapse-itm-l">
                <div class="collapse-itm-l-l">{{productName}}</div>
                <div class="collapse-itm-l-r PingFangSC-Medium">x{{productNum}}</div>
              </div>
              <div class="collapse-itm-r PingFangSC-Medium">{{transfer_fee}}</div>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
      <div>
        <van-field :value="couponResult"
                   readonly
                   label="优惠券"
                   input-align='right'
                   right-icon="arrow"
                   input-class="coupon-value-style"
                   @click="showCoupon = true" />
      </div>
    </div>
    <!-- <van-popup :show="showDate"
               position="bottom"
               @cancel="showDate = false">
      <van-datetime-picker type="date"
                           :value="currentDate"
                           :formatter="formatter"
                           title="取货时间"
                           @input="onInput"
                           @confirm="onDateConfirm"
                           @cancel="showDate = false" />
    </van-popup>
    <van-popup :show="showPicker"
               position="bottom"
               @cancel="showPicker = false">
      <van-picker show-toolbar
                  title="租赁时长"
                  :columns="columns"
                  @cancel="showPicker = false"
                  @confirm="onPickerConfirm" />
    </van-popup> -->

    <couponComponent :couponDatas="couponDatas"
                     :showCoupon="showCoupon"
                     @childEvent="addEventListenerChildCoupon"></couponComponent>
    <!-- <van-popup :show="showCoupon"
               custom-style="height: 60%;width: 100%"
               closeable
               @clickOverlay="showCoupon = false"
               @close="showCoupon = false">
      <div class="coupon-box">
        <div class="coupon-tit">优惠券</div>
        <div class="coupon-item-box">
          <van-radio-group :value="couponResult"
                           @change="onCouponChecbox">
            <div v-for="(item, index) in couponDatas"
                 :key="index"
                 class="coupon-item">
              <div class="coupon-item-left">
                <div>{{item.a}}</div>
                元
              </div>
              <div class="coupon-item-right">
                <div>{{item.b}}</div>
                <div class="coupon-item-sub-tit">{{item.c}}</div>
              </div>
              <div class="checkbox-box">
                <van-radio checked-color="#97D700"
                           :name="item.a"></van-radio>
              </div>
            </div>
          </van-radio-group>
        </div>
      </div>
    </van-popup> -->
    <van-popup :show="showDate"
               position="bottom"
               @cancel="showDate = false">
      <van-datetime-picker type="date"
                           :value="currentDate"
                           :formatter="formatter"
                           title="取货时间"
                           @input="onInput"
                           @confirm="onDateConfirm"
                           @cancel="showDate = false" />
    </van-popup>
    <van-popup :show="showPicker"
               position="bottom"
               @cancel="showPicker = false">
      <van-picker show-toolbar
                  title="租赁时长"
                  :columns="columns"
                  @cancel="showPicker = false"
                  @confirm="onPickerConfirm" />
    </van-popup>
    <div class="bottom-btn-box">
      <div class="bbb-l">
        <span class="bbb-l-r">合计:</span>
        <span class="bbb-l-l Oswald-Medium">{{orderPrice}}</span>
      </div>
      <div class="bbb-r">
        <van-button size="small"
                    color="#97D700"
                    custom-style="width: 120px"
                    round
                    type="default"
                    @click="submit">提交订单</van-button>
      </div>
    </div>
    <van-toast id="van-toast" />
    <van-dialog id="van-dialog"
                confirmButtonColor="#97D700" />
  </div>
</template>
<script>
import couponComponent from '@/components/coupon'
import Toast from '../../../static/vant/toast/toast'
import Dialog from '../../../static/vant/dialog/dialog'

import { getTransportMoney, getCoupons, order } from '@/api/getData'
let globalThat = null

export default {
  data () {
    return {
      routers: {
        address: '/pages/user/address/main',
        warehouse: '/pages/warehouse/main'
      },
      // ========↑ 路由========

      switchIdx: 1,
      activeNames: [],
      columns: [],
      date: '',
      showDate: false,
      showPicker: false,
      showCoupon: false,
      currentDate: new Date().getTime(),
      formatter (type, value) {
        if (type === 'year') {
          return `${value}年`
        } else if (type === 'month') {
          return `${value}月`
        } else if (type === 'day') {
          return `${value}日`
        }
        return value
      },

      setData (key, value) {
        globalThat[key] = value
      },
      // ========↑ 页面配置========
      id: null,
      is_buy: null,
      goods_format_id_arr: null,
      address: {
        id: '',
        val: '',
        text: ''
      },
      warehouse: {
        id: '',
        val: '',
        tit: ''
      },
      house_id: null,
      transport_id: null,
      transfer_fee: null,

      productName: null,
      productImg: null,
      productId: null,
      productMoney: null,
      productNum: null,

      text: null,

      allMoney: null,

      couponDatas: [],
      coupon_id: '',
      coupon: '',
      couponResult: '',

      orderPrice: null
    }
  },
  components: {
    couponComponent
  },
  onLoad (options) {
    console.log('* options 1', options)
    this.id = options.id
    this.is_buy = options.is_buy
    this.goods_format_id_arr = options.goods_format_id_arr
    this.house_id = options.house_id
    this.transport_id = options.transport_id
    this.productName = options.name
    this.productImg = options.img
    this.productId = options.goods_id
    this.productMoney = options.money
    this.productNum = options.stepperVal
    this.allMoney = `¥${parseInt(options.stepperVal) * parseInt(options.money)}.00`

    this.getCoupons()

    this.calculateFee()
  },
  onShow () {
    this.getTransportMoney()
  },
  mounted () {
    globalThat = this
    for (let i = 0; i <= 365; i++) {
      this.columns.push(i + 1 + '天')
    }
  },
  methods: {
    async getTransportMoney () {
      try {
        if (!this.address.id) return
        let data = { address_id: this.address.id, house_id: this.house_id, transport_id: this.transport_id }
        const res = await getTransportMoney(data)
        console.log(res)
        this.transfer_unit_fee = parseInt(res.data.data)
        this.transfer_fee = res.data.data ? `¥${parseInt(res.data.data) * parseInt(this.productNum)}.00` : null
        this.calculateFee()
      } catch (error) {
        console.log('* getTransportMoney error', error)
      }
    },
    async getCoupons () {
      try {
        const res = await getCoupons({ goods_id: this.id })
        console.log('* getCoupons', res)
        if (res.data.code === 1) {
          let arr = res.data.data
          arr.forEach((item, key) => {
            item.del_price = parseInt(item.del_price)
            item.del_rules = parseInt(item.del_rules)
          })
          console.log(arr)
          this.couponDatas = arr
        }
      } catch (error) {
        console.log('* getCoupons error', error)
      }
    },
    onSwitchBtn (i) {
      this.switchIdx = i
    },
    onChange (event) {
      this.productNum = event.mp.detail
      this.allMoney = `¥${parseInt(this.productNum) * parseInt(this.productMoney)}.00`
      this.calculateFee()
      if (!this.transfer_unit_fee) return
      this.transfer_fee = `¥${parseInt(this.productNum) * parseInt(this.transfer_unit_fee)}.00`
    },
    onChange1 (event) {
      this.activeNames = event.mp.detail
    },
    onInputNameKey (event) {
      this.get_people = event.mp.detail
    },
    onInputPhoneKey (event) {
      this.get_phone = event.mp.detail
    },
    onInputTextKey (event) {
      this.text = event.mp.detail
    },
    onInput (event) {
      this.currentDate = event.mp.detail
    },
    onDateConfirm (e) {
      var date = new Date(e.mp.detail)
      var Y = date.getFullYear() + '年'
      var M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '月'
      var D = date.getDate() + '日'
      this.date = Y + M + D
      this.showDate = false
    },
    onPickerConfirm (e) {
      this.showPicker = false
    },
    onCouponChecbox (e) {
      this.couponResult = e.mp.detail
    },
    addEventListenerChildCoupon (e) {
      console.log(e)
      this.showCoupon = e.showCoupon
      if (e.couponResult) {
        this.coupon_id = e.couponResult.id
        this.coupon = e.couponResult.del_price
        this.couponResult = '-¥' + e.couponResult.del_price
      }

      this.calculateFee()
    },
    goNextPage (r) {
      mpvue.navigateTo({
        url: `${this.routers[r]}?id=${this.id}&f=detail`
      })
    },
    calculateFee () {
      let transferFee = this.transfer_unit_fee ? parseInt(this.transfer_unit_fee) : 0
      let coupon = this.coupon ? parseInt(this.coupon) : 0
      let money = parseInt(this.productNum) * parseInt(this.productMoney)

      this.orderPrice = `¥${money + (transferFee * parseInt(this.productNum)) - coupon}`
    },
    async submit () {
      if (!this.address.id) {
        Toast.fail('请选择地址')
        return
      }
      console.log(this.coupon_id)
      try {
        let data = {
          goods_id: this.id,
          get_methods: this.switchIdx,
          get_time: this.date, // 取货时间**
          get_people: this.get_people, // 取货人**
          get_phone: this.get_phone, // 取货联系方式
          push_add: this.address.id,
          goods_format_id_arr: this.goods_format_id_arr,
          goods_num: this.productNum,
          use_time: this.long,
          text: this.text,
          coupons: this.coupon_id,
          is_buy: this.is_buy,
          house_id: this.warehouse.id || this.house_id,
          card_id: null
        }
        console.log(data)
        const res = await order(data)
        console.log(res)
        if (res.data.code === 1) {
          Dialog.alert({
            title: '下载提示',
            message: '订单已提交，请使用 APP 端进行支付'
          }).then(() => {
            mpvue.navigateBack()
          })
        } else {
          Toast.fail(res.data.msg)
        }
      } catch (error) {
        console.log('* submit error', error)
        Toast.fail(error.data.msg)
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
.main-box {
  margin-bottom: 65px;
}
.sbb-cell-box {
  position: relative;
}
.switch-btn-box {
  display: flex;
  width: 140px;
  background: rgba(151, 215, 0, 0.06);
  border: 0.5px solid #97d700;
  border-radius: 300px;
  overflow: hidden;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}
.switch-btn-box div {
  flex: 1;
  font-size: 15px;
  color: #97d700;
  line-height: 21px;
  padding: 5px 0;
  text-align: center;
  border-radius: 18px;
}
.switch-btn-box div.active {
  color: #fff;
  background: #97d700;
}

/* ???? */
.quhuo-addr {
  padding: 0 15px;
  background: #fff;
}
.quhuo-addr .addr {
  display: flex;
  font-size: 13px;
  color: #999999;
  line-height: 18px;
  padding: 5px 0 15px;
}

.cell-title {
  width: 90px;
  height: 18px;
}

.cell-value {
  /* flex: 1; */
  width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* ??? */
.product-s-box {
  background-color: #fff;
}
.product-box {
  display: flex;

  padding: 15px 0;
  margin: 0 15px;
}
.product-right-box {
  flex: 1;
  margin-left: 10px;
}
.product-img-box,
.product-img-box img {
  width: 60px;
  height: 60px;
  /* background-color: #97d700; */
  border-radius: 2px;
}
.product-name {
  font-size: 14px;
  color: #333333;
  line-height: 20px;
}
.product-bottom {
  margin-top: 10px;
}
.collapse-itm-box {
  display: flex;
}
.collapse-itm-l {
  /* flex: 1; */
  display: flex;
  width: 204px;
}
.collapse-itm-l-l {
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.collapse-itm-l-r {
  padding-left: 20px;
}
.collapse-itm-r {
  flex: 1;
  text-align: right;
}
.checkbox-box {
  padding: 36px 20px;
  padding-left: 0px;
}
.bottom-btn-box {
  width: 92%;
  height: 49px;
  display: flex;
  padding: 0 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
}

.bbb-l {
  flex: 1;
  line-height: 49px;
  font-size: 15px;
  color: #333333;
}
.bbb-r {
  line-height: 49px;
}
.bbb-l span {
  line-height: 49px;
}
.bbb-l-r {
  font-size: 15px;
  line-height: 21px;
  /* margin-top: 9px; */
  vertical-align: top;
}
.bbb-l-l {
  font-size: 20px;
  color: #97d700;
  /* font-weight: bold; */
}
</style>
<style lang="">
.van-cell {
  padding: 16px 15px !important;
}
._van-stepper {
  float: right;
}
.van-popup--bottom,
.van-picker {
  border-radius: 6px 6px 0 0 !important;
  overflow: hidden !important;
}
.van-picker__cancel {
  color: #999999 !important;
}
.van-picker__confirm {
  color: #97d700 !important;
}
.van-cell__value {
  font-size: 15px !important;
  color: #333333 !important;
}
.quhuo-addr .van-cell {
  padding: 15px 0 0 !important;
}
.quhuo-addr .van-cell::after {
  border: none;
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
.van-button--small {
  height: 35px !important;
  margin-left: 8px;
  padding: 0 12px !important;
}
</style>
