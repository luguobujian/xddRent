<template>
  <div class="container van-hairline-top">
    <div class="itmes-box">
      <div class="item">
        <div class="title-box clearfix">
          <div class="fl">银行卡</div>
          <div class="fr"
               @click="goNextPage">
            <img class="icon-btn"
                 src="/static/icons/edit-icon.png"
                 alt=""></div>
        </div>
        <div class="some-info-box">
          <div class="some-info-tit">持卡人</div>
          <div class="some-info-text">马小哈</div>
        </div>
        <div class="some-info-box">
          <div class="some-info-tit">开户行</div>
          <div class="some-info-text">中国工商银行北京北太平桥支行</div>
        </div>
        <div class="some-info-box">
          <div class="some-info-tit">银行卡号</div>
          <div class="some-info-text">62357237218451285</div>
        </div>
      </div>
      <div class="item">
        <div class="title-box clearfix">
          <div class="fl">支付宝</div>
          <div class="fr"
               @click="goNextPage">
            <img class="icon-btn"
                 src="/static/icons/edit-icon.png"
                 alt=""></div>
        </div>
        <div class="some-info-box">
          <div class="some-info-tit">绑定手机</div>
          <div class="some-info-text">186372636253</div>
        </div>
        <div class="some-info-box">
          <div class="some-info-tit">帐号</div>
          <div class="some-info-text">273627153@qq.com</div>
        </div>
      </div>
      <div class="item">
        <div class="title-box clearfix">
          <div class="fl">微信</div>
          <div class="fr"
               @click="goNextPage">
            <img class="icon-btn"
                 src="/static/icons/edit-icon.png"
                 alt=""></div>
        </div>
        <div class="some-info-box">
          <div class="some-info-tit">绑定手机</div>
          <div class="some-info-text">186372636253</div>
        </div>
        <div class="some-info-box">
          <div class="some-info-tit">微信号</div>
          <div class="some-info-text">273627153@qq.com</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      detailList: [{
        title: '银行卡',
        orderId: '283721946129',
        date: '2020.01.21'
      }, {
        title: '支付宝',
        orderId: '283721946129',
        date: '2020.01.21'
      }, {
        title: '微信',
        orderId: '283721946129',
        date: '2020.01.21'
      }]
    }
  },
  mounted () {

  },
  methods: {
    goNextPage () {
      mpvue.navigateTo({
        url: '/pages/billing/pay/main'
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
.billing-detail-box {
  background-color: #fff;
  padding: 0 15px 15px;
  margin-bottom: 10px;
}
.table-tit {
  padding: 11px 0;
}
.title-box {
  font-size: 15px;
  color: #333333;
  font-weight: bold;
  padding-top: 15px;
  padding-bottom: 5px;
}
.icon-btn {
  display: inline-block;
  width: 20px;
  height: 20px;
}
.some-info-box {
  display: flex;
  line-height: 18px;
  margin-top: 5px;
}
.some-info-tit {
  width: 75px;
  font-size: 13px;
  color: #666666;
}
.some-info-text {
  flex: 1;
  font-family: "PingFangSC-Medium";
  font-size: 13px;
  color: #333333;
}
.itmes-box {
  flex: 1;
}
.item {
  background-color: #fff;
  padding: 0 15px 15px;
  margin-bottom: 10px;
}
</style>