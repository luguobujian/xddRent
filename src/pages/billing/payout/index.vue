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
                   label-width="22px" />
      </div>
      <div class="tip-box">当前余额：¥300.00 <span class="colorBtn">全部提现</span></div>
    </div>
    <div class="bottom-btn-box">
      <div class="bottom-btn-margin">
        <van-button color="#97D700"
                    size="small"
                    round
                    block
                    @click="go">确认提现</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {
    go () {
      wx.navigateTo({
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
.van-button--small {
  color: #fff;
  height: 39px !important;
}
</style>