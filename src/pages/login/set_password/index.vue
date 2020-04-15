<template>
  <div class="container">
    <div class="main-box">
      <div class="main-tit">设置登录密码</div>
      <div>
        <van-field v-model="value"
                   placeholder="请输入6～16位数字或字母密码"
                   right-icon="/static/icons/eye.png" />
      </div>
      <div class="bottom-btn-box">
        <div class="bottom-btn-margin">
          <van-button color="#97D700"
                      size="small"
                      round
                      block
                      @click="goNextPage">提交</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    goNextPage () {
      mpvue.switchTab({
        url: '/pages/index/main'
      })
    }
  }
}
</script>
<style lang="">
.container {
  background: #fff;
}
.main-tit {
  color: #333;
  font-size: 30px;
  line-height: 42px;
  padding: 19px 0;
}
.main-box {
  flex: 1;
  margin: 0 25px;
}

.bottom-btn-margin {
  margin: 30px 0 !important;
}
</style>
<style lang="">
.van-cell {
  padding: 16px 0 !important;
}

.van-cell::after {
  left: 0 !important;
  width: 100% !important;
}

.van-icon--image {
  width: 21px !important;
  height: 21px !important;
}

.van-button--small {
  color: #fff;
  height: 39px !important;
}
</style>