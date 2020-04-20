<template>
  <div class="container van-hairline-top">
    <div class="top-main-box">
      <div>
        <div class="logo-box">
          <img class="logo"
               src=""
               alt="">
        </div>
      </div>
      <div class="cell-group-box">
        <van-cell-group>
          <van-field label="官方热线"
                     input-align="right"
                     :value="tel" />
          <van-field label="官方邮箱"
                     input-align="right"
                     :value="email" />
          <van-field label="访问官网"
                     input-align="right"
                     :value="web" />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tel: '400-283-9282',
      email: 'pm@apicloud.com',
      web: 'www.apicloud.com'
    }
  }
}
</script>
<style scope>
.container {
  font-size: 15px;
  background-color: #fff;
}
.top-main-box {
  flex: 1;
}
.logo-box {
  padding: 40px 0 10px;
}
.logo {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 5px;
  background-color: #97d700;
  margin: 0 auto;
}
.cell-group-box {
  margin-top: 30px;
}
</style>
<style>
.van-cell {
  padding: 16px 15px !important;
}
.van-cell:after {
  width: 92% !important;
}
.van-cell__title,
.van-cell__value {
  font-size: 15px;
}
</style>