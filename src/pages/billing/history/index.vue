<template>
  <div class="container van-hairline--top">
    <div class="itmes-box">
      <div v-for="(item, index) in detailList"
           :key="index"
           class="item">
        <div class="van-hairline--bottom table-tit">
          <div class="clearfix">
            <div class="fl">订单编号：{{item.order}}</div>
            <div class="fr">{{item.ymdhms}}</div>
          </div>
        </div>
        <div class="title-box clearfix">
          <div class="fl">￥{{item.money}}</div>
          <div class="fr"
               :class="[{'fail': item.status === '2'}, {'success': item.status === '1'}, {'warning': item.status === '0'}]">{{item.statusText}}</div>
        </div>
        <div v-if="item.name"
             class="some-info-box">持卡人:{{item.name}}</div>
        <div class="some-info-box">开户行:{{item.address}}</div>
        <div class="some-info-box">银行卡号:{{item.number}}</div>
        <div v-if="item.status === '2'"
             class="some-info-box fail">提现失败原因：{{item.text}}</div>
      </div>
      <nomoreComponents tipBoxTop="42%"
                        tipSrc="nshouyi.png"
                        noTip="暂无收益信息"
                        :dataList="detailList"></nomoreComponents>
    </div>

  </div>
</template>
<script>
import moment from 'moment'
import { pullWalletRecord } from '@/api/getData'
import nomoreComponents from '@/components/nomore'

export default {
  data () {
    return {
      detailList: null
    }
  },
  onLoad () {
    this.pullWalletRecord()
  },
  components: {
    nomoreComponents
  },
  methods: {
    async pullWalletRecord () {
      try {
        const res = await pullWalletRecord()
        console.log(res)
        if (res.data.code === 1) {
          let arr = res.data.data
          arr.forEach((item, key) => {
            item.ymdhms = moment(item.time * 1000).format('YYYY-MM-DD HH:mm:ss ')
            if (item.status === '0') {
              item.statusText = '审核中'
            } else if (item.status === '1') {
              item.statusText = '已提现'
            } else if (item.status === '2') {
              item.statusText = '提现失败'
            }
          })
          this.detailList = arr
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