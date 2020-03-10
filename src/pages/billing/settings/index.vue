<template>
  <div class="container">
    <div>
      <van-field v-model="value"
                 placeholder="请输入用户名" />
    </div>
    <div class="sms-code-box van-hairline">
      <van-field class="inp-box"
                 placeholder="请输入验证码" />
      <span class="sms-btn">获取验证码</span>
    </div>
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
                    @click="go">提交</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scope>
.sms-code-box {
  display: flex;
  flex-direction: row;
}
.inp-box {
  flex: 1;
}
.sms-btn {
  color: #97d700;
  padding: 17px 15px;
  background: #fff;
}
.bottom-btn-margin {
  margin: 30px 15px !important;
}
</style>
<style>
.van-cell {
  padding: 16px 15px !important;
}

.sms-code-box .van-cell::after {
  border: none;
}

.sms-code-box[class*="van-hairline"]::after {
  left: 15px !important;
  width: 92% !important;
}

.van-cell::after {
  width: 92% !important;
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