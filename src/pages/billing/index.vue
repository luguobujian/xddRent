<template>
  <div class="container van-hairline--top">
    <div class="main-box">
      <div class="top-box">
        <div class="top-tit-box">钱包余额(元)</div>
        <div class="num-box Oswald-Medium">{{money}}</div>
        <div class="sub-num-box PingFangSC-Regular">免押金额度：{{mymoney}}</div>
        <div class="bottom-btn-margin">
          <van-button color="#97D700"
                      size="small"
                      custom-style="font-size: 15px"
                      round
                      block
                      @click="goNextPage('payoutBtn',0)">提现</van-button>
        </div>
      </div>
      <div class="cell-group-box">
        <van-cell :class="index !=2 ?'no-border': ''"
                  v-for="(item, index) in cellItems"
                  :key="index"
                  :title="item.text"
                  is-link
                  @click="goNextPage('cellItems',index)" />
      </div>
    </div>
    <div class="bottom-box"
         @click="goNextPage('bottomBtn',0)">{{bottomBtn[0].text}}</div>
  </div>
</template>
<script>
import { myMoney } from '@/api/getData'
export default {
  data () {
    return {
      payoutBtn: [{ text: '提现', path: '/pages/billing/payout/main' }],
      cellItems: [
        { text: '查看明细', path: '/pages/billing/detail/main' },
        { text: '提现记录', path: '/pages/billing/history/main' }
      ],
      bottomBtn: [{ text: '管理提现账户', path: '/pages/billing/affiliate/main' }],
      money: '0.00',
      mymoney: '0.00'
    }
  },
  onLoad () {
    this.myMoney()
  },
  mounted () {
    console.log(getCurrentPages())
  },
  methods: {
    async myMoney () {
      try {
        const res = await myMoney()
        console.log(res)
        this.money = res.data.data.money
        this.mymoney = res.data.data.mymoney
      } catch (error) {
        console.log('* myMoney error', error)
      }
    },
    goNextPage (t, i) {
      console.log(this[t][i].path)
      mpvue.navigateTo({
        url: this[t][i].path
      })
    }
  }
}
</script>
<style scope>
.main-box {
  flex: 1;
  /* text-align: center; */
}
.top-box {
  text-align: center;
  background: #fff;
}
.top-tit-box {
  font-size: 15px;
  color: #999999;
  line-height: 21px;
  padding-top: 20px;
}

.bottom-box {
  color: #97d700;
  text-align: center;
  padding: 15px 0;
}
.num-box {
  font-size: 34px;
  color: #333333;
  line-height: 51px;
  margin-top: 5px;
}
.sub-num-box {
  font-size: 15px;
  color: #999999;
}
.cell-group-box {
  margin-top: 30px;
}
.bottom-btn-margin {
  font-size: 15px;
  text-align: center;
  padding: 20px 15px 15px !important;
}
</style>
<style >
.van-cell {
  padding: 16px 15px !important;
}
.van-button--small {
  color: #fff;
  height: 39px !important;
}
.van-cell__title,
.van-cell__value {
  font-size: 15px;
}
</style>