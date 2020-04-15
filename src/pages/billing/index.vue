<template>
  <div class="container">
    <div class="main-box">
      <div class="top-box">
        <div class="top-tit-box">钱包余额(元)</div>
        <div class="num-box">6300.00</div>
        <div class="bottom-btn-margin">
          <van-button color="#97D700"
                      size="small"
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
export default {
  data () {
    return {
      payoutBtn: [{ text: '提现', path: '/pages/billing/payout/main' }],
      cellItems: [
        { text: '查看明细', path: '/pages/billing/detail/main' },
        { text: '提现记录', path: '/pages/billing/history/main' }
      ],
      bottomBtn: [{ text: '管理提现账户', path: '/pages/billing/affiliate/main' }]
    }
  },
  mounted () {
    console.log(getCurrentPages())
  },
  methods: {
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
  padding-top: 40px;
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
.cell-group-box {
  margin-top: 30px;
}
.bottom-btn-margin {
  text-align: center;
  padding: 30px 15px 15px !important;
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
</style>