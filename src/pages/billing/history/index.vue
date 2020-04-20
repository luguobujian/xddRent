<template>
  <div class="container van-hairline-top">
    <div class="itmes-box">
      <div v-for="(item, index) in detailList"
           :key="index"
           class="item">
        <div class="van-hairline--bottom table-tit">
          <div class="clearfix">
            <div class="fl">订单编号：283728462421</div>
            <div class="fr">2020.02.21</div>
          </div>
        </div>
        <div class="title-box clearfix">
          <div class="fl">{{item.sum}}</div>
          <div class="fr fail">{{item.title}}</div>
        </div>
        <div class="some-info-box">订单号：{{item.orderId}}</div>
        <div class="some-info-box">订单日期：{{item.date}}</div>
        <div class="some-info-box">订单日期：{{item.date}}</div>
        <div class="some-info-box fail">提现失败原因：账户错误</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      detailList: [{
        title: '占位符',
        sum: '¥200.00',
        orderId: '283721946129',
        date: '2020.01.21'
      }, {
        title: '占位符',
        sum: '¥200.00',
        orderId: '283721946129',
        date: '2020.01.21'
      }, {
        title: '占位符',
        sum: '¥200.00',
        orderId: '283721946129',
        date: '2020.01.21'
      }, {
        title: '占位符',
        sum: '¥200.00',
        orderId: '283721946129',
        date: '2020.01.21'
      }, {
        title: '占位符',
        sum: '¥200.00',
        orderId: '283721946129',
        date: '2020.01.21'
      }]
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
.fail-info-box {
  font-size: 13px;
}
.success {
  color: #97d700;
}
.warning {
  color: #ff9768;
}
.fail {
  color: #ff5a5a;
}
</style>