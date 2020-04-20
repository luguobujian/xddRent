<template>
  <div class="container">
    <div class="main-box">
      <div class="p-t-box">
        <div>
          <img class="top-s-box"
               src="/static/images/top-bg.png"
               alt="">
        </div>
        <div class="txt-tip-box">
          <div class="m-s-box">
            <van-icon name="warning-o"
                      size="19px" />未通过
          </div>
          <div class="cause-box">未通过原因：联系方式不正确</div>
        </div>
      </div>
      <div class="txt-main-box">
        <div class="left-icon-box">
          <van-icon name="/static/icons/company-icon.png"
                    size="13px" />
        </div>
        <div class="right-info-box">
          <van-cell-group>
            <van-field class="name-box"
                       :value="name" />
            <van-field label="电话"
                       :value="tel" />
            <van-field label="地址"
                       type="textarea"
                       autosize=true
                       :value="addr" />
            <van-field label="邮箱"
                       :value="email" />
          </van-cell-group>
        </div>
      </div>
      <div class="main-img-box">
        <div class="t-tit PingFangSC-Medium">
          营业执照
        </div>
        <div class="img-box">
          <img src="../../../../static/images/zz.png"
               alt="">
        </div>
      </div>
    </div>
    <div class="bottom-btn-margin">
      <van-button color="#97D700"
                  size="small"
                  custom-style="font-size:13px"
                  round
                  block>再次提交</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '名字',
      tel: '1333333333',
      addr: '这里是地址这里是地址这里是地址这里是地址这里是地址',
      email: '1862736273@qq.com'
    }
  }
}
</script>
<style scoped>
.main-box {
  flex: 1;
  margin-bottom: 60px;
}
.p-t-box {
  position: relative;
}
.top-s-box {
  width: 100%;
  height: 93px;
}
.txt-tip-box {
  position: absolute;
  top: 25px;
  left: 20px;
}
.m-s-box {
  font-size: 18px;
  color: #ffffff;
  font-weight: bold;
  line-height: 25px;
}
.cause-box {
  font-size: 13px;
  color: #ffffff;
  line-height: 18px;
  margin-top: 5px;
  margin-right: 25px;
  margin-left: 25px;
}
.txt-main-box {
  display: flex;
  background-color: #fff;
}
.left-icon-box {
  padding: 21px 0 0 15px;
}
.right-info-box {
  flex: 1;
  margin-top: 10px;
}

.bottom-btn-box {
  height: 49px;
  background-color: #fff;
}
.t-tit {
  font-size: 13px;
  color: #333333;
}
.main-img-box {
  padding: 16px 15px;
  margin-top: 10px;
  background-color: #fff;
}
.img-box {
  position: relative;
  overflow: hidden;
  margin-top: 10px;
  padding-bottom: 100%; /*重要属性*/
}
.img-box img {
  width: 100%;
  height: 100%;
  position: absolute;

  background-color: skyblue;
  border-radius: 8px;
}
.bottom-btn-margin {
  width: 92%;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  padding: 7px 15px !important;
}
</style>>
<style>
.m-s-box ._van-icon {
  vertical-align: -16%;
  margin-right: 6px;
}
.name-box .van-cell {
  color: #333 !important;
  font-size: 16px !important;
  font-weight: bold;
}
.van-cell__title {
  -webkit-flex: none !important;
  flex: none !important;
  min-width: 42px !important;
  font-size: 13px !important;
  color: #999999 !important;
}
.van-field__body--textarea.van-field__body--ios {
  margin-top: 0px !important;
}

.van-button--small {
  color: #fff;
  height: 35px !important;
}
</style>
