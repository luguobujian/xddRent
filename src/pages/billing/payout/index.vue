<template>
  <div class="container">
    <div class="info-box">
      <div class="info-tit-box">收款账户</div>
      <div class="o-info-box">支付宝账户</div>
      <div class="o-info-box">收款支付宝帐号：1877263726</div>
    </div>
    <div class="form-box">
      <div>
        <van-field type="number"
                   label="￥"
                   placeholder="请输入提现金额"
                   label-width="22px"
                   custom-style="font-family:'Oswald-Medium'" />
      </div>
      <div class="tip-box">当前余额：¥300.00 <span class="colorBtn">全部提现</span></div>
    </div>
    <div class="bottom-btn-box">
      <div class="bottom-btn-margin">
        <van-button color="#97D700"
                    size="small"
                    custom-style="font-size: 15px"
                    round
                    block
                    @click="goPayout">确认提现</van-button>
      </div>
    </div>
    <van-popup :show="showPayout"
               position="bottom"
               custom-style="height: 80%;width: 100%"
               round
               closeable
               @clickOverlay="showPayout = false"
               @close="showPayout = false">
      <div class="payout-box">
        <div class="payout-tit">选择提现账户</div>
        <div class="payout-type-box">
          <van-radio-group>
            <div class="type-item card">
              <div class="type-item-left">
                <div class="type-item-tit">银行卡</div>
                <div class="type-item-cell">
                  <div class="small-tit">持卡人</div>
                  <div>马小哈</div>
                </div>
                <div class="type-item-cell">
                  <div class="small-tit">开户行</div>
                  <div>中国工商银行北京北太平桥支行</div>
                </div>
                <div class="type-item-cell">
                  <div class="small-tit">银行卡号</div>
                  <div>62357237218451285</div>
                </div>
              </div>
              <div class="type-item-right">
                <van-radio class="type-item-radio"
                           checked-color="#97D700"
                           name="a"></van-radio>
              </div>
            </div>
            <div class="type-item alipay">
              <div class="type-item-left">
                <div class="type-item-tit">支付宝</div>
                <div class="type-item-cell">
                  <div class="small-tit">绑定手机</div>
                  <div>186372636253</div>
                </div>
                <div class="type-item-cell">
                  <div class="small-tit">帐号</div>
                  <div>273627153@qq.com</div>
                </div>
              </div>
              <div class="type-item-right">
                <van-radio class="type-item-radio"
                           checked-color="#97D700"
                           name="b"></van-radio>
              </div>
            </div>
            <div class="type-item wxpay">
              <div class="type-item-left">
                <div class="type-item-tit">微信</div>
                <div class="type-item-cell">
                  <div class="small-tit">暂无微信账户信息</div>
                  <!-- <div>186372636253</div> -->
                </div>
                <!-- <div class="type-item-cell">
                  <div class="small-tit">帐号</div>
                  <div>273627153@qq.com</div>
                </div> -->
              </div>
              <div class="type-item-right">
                <!-- <van-radio class="type-item-radio"
                           checked-color="#97D700"
                           name="b"></van-radio> -->
                <div class="add-button">去添加</div>
              </div>
            </div>
          </van-radio-group>
        </div>
      </div>

    </van-popup>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showPayout: false
    }
  },
  mounted () {

  },
  methods: {
    goPayout () {
      this.showPayout = true
    },
    go () {
      mpvue.navigateTo({
        url: '/pages/billing/settings/main'
      })
    }
  }
}
</script>
<style scope>
.container {
  font-size: 13px;
  color: #666666;
}
.info-box,
.form-box {
  padding: 0 15px;
  background: #fff;
}
.info-box {
  padding-bottom: 5px;
}
.form-box {
  margin-top: 10px;
}
.info-tit-box {
  font-size: 15px;
  color: #333333;
  font-weight: bold;
  padding: 15px 0 10px;
}
.o-info-box {
  padding-bottom: 5px;
}
.tip-box {
  padding: 10px 0;
}
.colorBtn {
  color: #97d700;
}
.bottom-btn-margin {
  margin: 36px 15px !important;
}

/* =======↓=payout======== */
.payout-tit {
  font-size: 17px;
  color: #333333;
  text-align: center;
  line-height: 24px;
  padding: 20px 0;
}
.payout-type-box {
  padding: 0 15px;
}
.type-item {
  display: flex;
  padding: 15px;
  background: #faf9f9;
  border-radius: 4px;
  margin-bottom: 15px;
}
.type-item-tit {
  font-size: 15px;
  color: #333333;
  padding-bottom: 5px;
}
.type-item-left {
  flex: 1;
}
.type-item-cell {
  display: flex;
  color: #333;
  font-size: 13px;
  line-height: 18px;
  margin-top: 5px;
  /* justify-content: space-between; */
}
.small-tit {
  width: 70px;
  color: #666;
}
.type-item-radio {
  position: relative;
}
.add-button {
  font-size: 13px;
  color: #97d700;
  margin-top: 15px;
}
</style>

<style>
.van-cell {
  font-size: 24px !important;
  padding: 22px 0 !important;
}
.van-cell__title {
  flex: none !important;
  min-width: 12px !important;
  margin-right: 10px !important;
}
.van-field__input {
  font-family: "Oswald-Medium" !important;
}
.van-button--small {
  color: #fff;
  height: 39px !important;
}
.van-popup--bottom.van-popup--round {
  border-top-left-radius: 8px !important;
  border-top-right-radius: 8px !important;
}
.van-radio {
  margin-top: 38px;
}
.alipay .van-radio {
  margin-top: 27px;
}
.wxpay .small-tit {
  width: auto;
}
</style>