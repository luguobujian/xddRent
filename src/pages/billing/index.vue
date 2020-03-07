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
                      @click="submit">提现</van-button>
        </div>
      </div>
      <div>

      </div>
    </div>
    <div class="bottom-box">管理提现账户</div>
  </div>
</template>
<script>
export default {

}
</script>
<style scope>
.main-box {
  flex: 1;
  text-align: center;
}
.top-box {
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
.bottom-btn-margin {
  padding: 30px 15px 15px !important;
}
</style>
<style >
.van-button--small {
  color: #fff;
  height: 39px !important;
}
</style>