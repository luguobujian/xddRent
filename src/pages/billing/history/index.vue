<template>
  <div class="container van-hairline-top">
    <div class="itmes-box">
      <div v-for="(item, index) in detailList"
           :key="index"
           class="item">
        <div class="van-hairline--bottom table-tit">
          <div class="clearfix">
            <div class="fl">订单编号：{{item.order}}</div>
            <div class="fr">{{item.time}}</div>
          </div>
        </div>
        <div class="title-box clearfix">
          <div class="fl">{{item.money}}</div>
          <div class="fr fail">{{item.title}}</div>
        </div>
        <div class="some-info-box">订单号：{{item.order}}</div>
        <div class="some-info-box">订单日期：{{item.date}}</div>
        <div class="some-info-box">订单日期：{{item.date}}</div>
        <div class="some-info-box fail">提现失败原因：账户错误</div>
      </div>
    </div>
  </div>
</template>
<script>
import { pullWalletRecord } from '@/api/getData'
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
  },
  onLoad () {
    this.pullWalletRecord()
  },
  methods: {
    async pullWalletRecord () {
      try {
        const res = await pullWalletRecord()
        console.log(res)
        if (res.data.code === 1) {
          // this.detailList = res.data.data
        }
      } catch (error) {

      }
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