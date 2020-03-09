<template>
  <div class="container">
    <div class="form-box">
      <div v-if="payType == 'wxpay'"
           class="wxpay">
        <van-field label-class="label-style"
                   type="tel"
                   label="绑定手机号"
                   placeholder="请输入手机号"
                   input-align="right" />
        <van-field label-class="label-style"
                   label="微信号"
                   placeholder="请输入帐号"
                   input-align="right" />
      </div>
      <div v-if="payType == 'card'"
           class="card">
        <van-field label-class="label-style"
                   label="持卡人"
                   placeholder="请输入持卡人"
                   input-align="right" />
        <van-field label-class="label-style"
                   label="开户行"
                   placeholder="请输入开户行"
                   input-align="right" />
        <van-field label-class="label-style"
                   label="银行卡号"
                   placeholder="请输入银行卡号"
                   input-align="right" />
      </div>
      <div v-if="payType == 'alipay'"
           class="alipay">
        <van-field label-class="label-style"
                   type="tel"
                   label="绑定手机号"
                   placeholder="请输入手机号"
                   input-align="right" />
        <van-field label-class="label-style"
                   label="支付宝帐号"
                   placeholder="请输入帐号"
                   input-align="right" />
        <van-field label-class="label-style"
                   label="支付宝姓名"
                   placeholder="请输入姓名"
                   input-align="right" />
      </div>
    </div>
    <div class="bottom-btn-box">
      <div class="bottom-btn-margin">
        <van-button color="#97D700"
                    size="small"
                    round
                    block>保存</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      payType: 'wxpay'
    }
  }
}
</script>

<style scope>
.label-style {
  font-size: 15px !important;
  color: #333333 !important;
  margin-top: 0 !important;
}
.bottom-btn-margin {
  margin: 30px 15px !important;
}
</style>
<style>
.van-cell {
  padding: 16px 15px !important;
}
</style>
<style>
.van-button--small {
  color: #fff;
  height: 39px !important;
}
</style>