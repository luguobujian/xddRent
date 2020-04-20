<template>
  <div class="container van-hairline--top">
    <div class="main-box">
      <div class="mb10">
        <van-cell-group>
          <div class="sbb-cell-box">
            <van-field v-model="text"
                       label="取货方式"
                       disabled />
            <div class="switch-btn-box">
              <div :class="{ active: switchIdx == 0 }"
                   @click="onSwitchBtn(0)">
                自提
              </div>
              <div :class="{ active: switchIdx == 1 }"
                   @click="onSwitchBtn(1)">
                配送
              </div>
            </div>
          </div>
          <div class="quhuo-addr"
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
        </van-cell-group>
      </div>
      <div class="product-s-box mb10">
        <div class="product-box van-hairline">
          <div class="product-img-box">
            <img src=""
                 alt="" />
          </div>

          <div class="product-right-box">
            <div class="product-name PingFangSC-Medium">讯纳箱/Alphard</div>
            <div class="product-bottom">
              <van-stepper :value="1"
                           @change="onChange" />
            </div>
          </div>
        </div>
        <van-cell-group>
          <!-- <van-field readonly
                     label="租赁时长"
                     right-icon="arrow"
                     @click="showPicker = true" /> -->
          <van-field v-model="number"
                     label="订单备注"
                     input-align="right"
                     placeholder="请输入备注(100字内)" />
        </van-cell-group>
      </div>
      <div class="mb10">
        <van-collapse :value="activeNames"
                      @change="onChange1">
          <van-collapse-item custom-class="mb10"
                             title="定金"
                             value="¥20000.00"
                             name="1"
                             is-link="false">
            <van-icon name="/static/icons/arrow-down.png"
                      slot="right-icon" />
            <div>这里是箱子名称</div>
          </van-collapse-item>
          <van-collapse-item title="运费"
                             value="¥20000.00"
                             name="2"
                             is-link="false">
            <van-icon name="/static/icons/arrow-down.png"
                      slot="right-icon" />
            <div>这里是箱子名称</div>
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

    <!-- <div v-if="!showDate && !showPicker && !showCoupon"
         class="bottom-btn">
      <van-submit-bar :price="2000000"
                      button-text="提交订单"
                      bind:submit="onSubmit"
                      price-class="b-b-price"
                      button-class="b-b-btn" />
    </div> -->
    <div class="bottom-btn-box">
      <div class="bbb-l">
        <span class="bbb-l-r">合计:</span>
        <span class="bbb-l-l Oswald-Medium">¥20000.00</span>
      </div>
      <div class="bbb-r">
        <van-button size="small"
                    color="#97D700"
                    custom-style="width: 120px"
                    round
                    type="default">立即付款</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import couponComponent from '@/components/coupon'

let globalThat = null

export default {
  data () {
    return {
      routers: {
        address: '/pages/user/address/main'
      },
      // ========↑ 路由========

      switchIdx: 0,
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

      address: {
        id: '',
        val: '',
        text: ''
      },
      couponDatas: [{
        a: 1000,
        b: 1000,
        c: 'fjadslkfjasl'
      }, {
        a: 200,
        b: 1000,
        c: 'fjadslkfjasl'
      }, {
        a: 20000,
        b: 1000,
        c: 'fjadslkfjasl'
      }],
      couponResult: ''
    }
  },
  components: {
    couponComponent
  },
  mounted () {
    globalThat = this
    for (let i = 0; i <= 365; i++) {
      this.columns.push(i + 1 + '天')
    }
  },
  methods: {
    onSwitchBtn (i) {
      this.switchIdx = i
    },
    onChange (event) {
      console.log(event.mp.detail)
    },
    onChange1 (event) {
      this.activeNames = event.mp.detail
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
      console.log(e.mp.detail)
      this.showPicker = false
    },
    onCouponChecbox (e) {
      this.couponResult = e.mp.detail
    },
    addEventListenerChildCoupon (e) {
      this.showCoupon = e.showCoupon
      this.couponResult = '-￥' + e.couponResult
    },
    goNextPage (r) {
      mpvue.navigateTo({
        url: this.routers[r]
      })
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
  background-color: #97d700;
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
.van-submit-bar__bar {
}
.van-submit-bar__text {
  text-align: left !important;
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
