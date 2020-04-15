<template>
  <div class="container">
    <div class="itmes-box">

      <div v-for="(item, index) in detailList"
           :key="index"
           class="item">
        <div class="title-box clearfix">
          <div class="fl">{{item.title}}</div>
          <div class="fr"
               @click="goNextPage">
            <img class="icon-btn"
                 src="/static/icons/edit-icon.png"
                 alt=""></div>
        </div>
        <div class="some-info-box">订单号：{{item.orderId}}</div>
        <div class="some-info-box">订单日期：{{item.date}}</div>
        <div class="some-info-box">订单日期：{{item.date}}</div>
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
  line-height: 18px;
  margin-top: 5px;
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