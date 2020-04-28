<template>
  <div class="container van-hairline-top">
    <div class="itmes-box">
      <div class="item"
           v-for="(item, index) in detailList"
           :key="index">
        <div class="title-box clearfix">
          <div v-if="item.type === '1'"
               class="fl">支付宝</div>
          <div v-if="item.type === '2'"
               class="fl">微信</div>
          <div v-if="item.type === '3'"
               class="fl">银行卡</div>
          <div class="fr"
               :data-type="item.type"
               @click="goNextPage(item)">
            <img class="icon-btn"
                 src="/static/icons/edit-icon.png"
                 alt=""></div>
        </div>
        <div class="some-info-box"
             v-if="item.type !== '2'">
          <div class="some-info-tit">{{item.type === '3'?'持卡人': '姓名'}}</div>
          <div class="some-info-text">{{item.name}}</div>
        </div>
        <div class="some-info-box">
          <div class="some-info-tit">{{item.type === '3'?'开户行': '绑定手机号'}}</div>
          <div class="some-info-text">{{item.address}}</div>
        </div>
        <div class="some-info-box">
          <div class="some-info-tit"
               v-if="item.type === '1'">支付宝账号</div>
          <div class="some-info-tit"
               v-if="item.type === '2'">微信账号</div>
          <div class="some-info-tit"
               v-if="item.type === '3'">银行卡号</div>
          <div class="some-info-text">{{item.number}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { accountList } from '@/api/getData'
export default {
  data () {
    return {
      detailList: []
    }
  },
  onLoad () {
    this.accountList()
  },
  mounted () {

  },
  methods: {
    async accountList () {
      try {
        const res = await accountList()
        console.log(res)
        this.detailList = res.data.data
      } catch (error) {

      }
    },
    goNextPage (e) {
      console.log(e)
      // let type = e.mp.currentTarget.dataset.type
      mpvue.navigateTo({
        url: `/pages/billing/pay/main?${this.parseParams(e)}`
      })
    },
    parseParams (data) {
      try {
        var tempArr = []
        for (var i in data) {
          var key = encodeURIComponent(i)
          var value = encodeURIComponent(data[i])
          tempArr.push(key + '=' + value)
        }
        var urlParamsStr = tempArr.join('&')
        return urlParamsStr
      } catch (err) {
        return ''
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